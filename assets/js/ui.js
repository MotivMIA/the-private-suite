// ██████████████████████████████████████████████████
// ui.js
// Stage 2 Apply Form + Consent + Scroll Fader
// CLEAN + MERGED + LIFECYCLE-SAFE
// ██████████████████████████████████████████████████

import { startAuth } from './auth/index.js';
import { requireConsent } from './auth/consent.js';

// All UI enhancements run after template hydration
window.addEventListener('content:hydrated', () => {
  // -------------------------
  // Apply / Auth form logic
  // -------------------------
  const applyForm = document.querySelector('.section-apply');
  if (applyForm) {
    const methodPanel = applyForm.querySelector('.auth-methods');
    const emailForm = applyForm.querySelector('#auth-form'); // matches provided markup
    if (methodPanel && emailForm) {
      const emailInput = emailForm.querySelector('input[type="email"]');
      const passwordInput = emailForm.querySelector('input[type="password"]');
      const submitBtn = emailForm.querySelector('button[type="submit"]');

      // defensive checks
      const pwLabel = passwordInput ? passwordInput.closest('label') : null;
      if (pwLabel) pwLabel.hidden = true; // start hidden

      // Auth method selection (OAuth + Email)
      methodPanel.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-provider], [data-auth]');
        if (!btn) return;

        // Email flow
        if (btn.dataset.auth === 'email') {
          methodPanel.hidden = true;
          emailForm.hidden = false;
          emailInput?.focus();
          return;
        }

        // OAuth flow
        if (btn.dataset.provider) {
          const consent = await requireConsent();
          if (consent) startAuth(btn.dataset.provider);
          else alert('You must accept the consent to proceed.');
        }
      });

      // Progressive reveal: clicking submit first reveals password if hidden
      if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
          if (pwLabel && pwLabel.hidden) {
            e.preventDefault();
            pwLabel.hidden = false;
            passwordInput?.focus();
            return;
          }
          // otherwise let submit handler run
        });
      }

      // Final submit with consent enforcement
      emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!emailInput?.value || !passwordInput?.value) {
          alert('Please fill out both fields.');
          return;
        }

        const consent = await requireConsent();
        if (!consent) {
          alert('You must accept the consent to proceed.');
          return;
        }

        // start email auth (adapter handles the rest)
        startAuth('email');
      });
    }
  }

  // -------------------------
  // Home form scroll / fader logic
  // -------------------------
  const homeFormContainer = document.querySelector('body[data-route="home"] .form-right');
  if (homeFormContainer) {
    // ensure fader element exists (template-friendly)
    const fader = homeFormContainer.querySelector('.form-scroll-fader');
    const updateScrollableState = () => {
      const isScrollable = homeFormContainer.scrollHeight > homeFormContainer.clientHeight;
      homeFormContainer.classList.toggle('is-scrollable', isScrollable);
      if (fader) fader.style.opacity = isScrollable ? '1' : '0';
    };

    // initial state + listen for size changes
    updateScrollableState();
    window.addEventListener('resize', updateScrollableState);

    // update on content changes within the container
    const mo = new MutationObserver(updateScrollableState);
    mo.observe(homeFormContainer, { childList: true, subtree: true, characterData: true });

    // Cleanup if route changes away (defensive)
    window.addEventListener('route:change', () => {
      updateScrollableState();
    });
  }
});

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");

  if (stored) {
    root.setAttribute("data-theme", stored);
  }

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();