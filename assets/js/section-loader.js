/**
 * ============================================================
 * Section Loader Utility
 * ============================================================
 *
 * Responsibilities:
 * - Discover [data-include] placeholders inside injected pages or sections
 * - Fetch section HTML from /sections/
 * - Inject section content in place
 * - Support nested / recursive section includes
 * - Fail loudly and visibly on missing sections
 * - Coordinate with binder via lifecycle events
 *
 * ============================================================
 */

//MARK: Configuration

const SECTION_LOADER_CONFIG = {
  attribute: 'data-include',
  maxPasses: 10 // safety guard against infinite recursion
};

//MARK: Utilities

async function fetchSection(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Section not found: ${path}`);
    }

    return await response.text();
  } catch (error) {
    console.error(error);
    return renderSectionError(path);
  }
}

function renderSectionError(path) {
  return `
    <section class="section-error">
      <strong>Section Load Error</strong>
      <div>${path}</div>
    </section>
  `;
}

//MARK: Core Loader Logic

async function loadSections(root = document, pass = 0) {
  if (pass > SECTION_LOADER_CONFIG.maxPasses) {
    console.warn('Section loader aborted: possible recursive include loop');
    return;
  }

  const placeholders = root.querySelectorAll(`[${SECTION_LOADER_CONFIG.attribute}]`);

  if (!placeholders.length) {
    // All sections resolved
    window.dispatchEvent(new Event('sections:loaded'));
    window.dispatchEvent(new Event('content:hydrated'));
    return;
  }

  const jobs = Array.from(placeholders).map(async (placeholder) => {
    const path = placeholder.getAttribute(SECTION_LOADER_CONFIG.attribute);

    if (!path) return;

    const html = await fetchSection(path);
    placeholder.innerHTML = html;
    placeholder.removeAttribute(SECTION_LOADER_CONFIG.attribute);
  });

  await Promise.all(jobs);

  // Re-run loader to catch nested includes
  await loadSections(root, pass + 1);
}

//MARK: Event Bindings

window.addEventListener('content:loaded', () => {
  loadSections(document);
});


//MARK: Initial Boot Fallback

document.addEventListener('DOMContentLoaded', () => {
  loadSections(document);
});

