/**
 * ============================================================
 * Client-Side Router
 * ============================================================
 *
 * Responsibilities:
 * - Map URLs to page files in /pages/
 * - Fetch and inject page HTML into #app
 * - Support hashless routing via History API
 * - Fail loudly and visibly on missing pages
 * - Remain framework-agnostic
 *
 * ============================================================
 */

//MARK: Router Configuration

const ROUTER_CONFIG = {
    pagesPath: '/pages',
    defaultRoute: 'home',
    notFoundRoute: '404',
    routes: [
      {
        path: "/privacy",
        page: "/pages/legal/privacy.html",
        title: "Privacy Policy"
      },
      {
        path: "/terms",
        page: "/pages/legal/terms.html",
        title: "Terms and Conditions"
      },
      {
        path: "/refunds",
        page: "/pages/legal/refunds.html",
        title: "Refund Policy"
      },
      {
        path: "/dmca",
        page: "/pages/legal/dmca.html",
        title: "DMCA Policy"
      },
      {
        path: "/conduct",
        page: "/pages/legal/conduct.html",
        title: "Code of Conduct"
      },
      {
        path: "/accessibility",
        page: "/pages/legal/accessibility.html",
        title: "Accessibility"
      },
      {
        path: "/contact",
        page: "/pages/legal/contact.html",
        title: "Contact"
      },
      {
        path: "/apply",
        page: "/pages/apply.html",
        title: "Apply"
      },
      {
        path: "/dashboard",
        page: "/pages/dashboard.html",
        title: "Dashboard"
      }
    ]
  };

  const PROTECTED_ROUTES = ["/dashboard"];

  const currentPath = normalizeRoute(window.location.pathname);
  if (PROTECTED_ROUTES.includes(currentPath)) {
    window.dispatchEvent(new Event("route:protected"));
  }
  
  //MARK: DOM References
  
  const APP_ROOT = document.getElementById('app');
  
  //MARK: Utilities
  
  function normalizeRoute(pathname) {
    if (!pathname || pathname === '/') return ROUTER_CONFIG.defaultRoute;
    return pathname.replace(/^\//, '');
  }
  
  async function fetchPage(route) {
    const url = `${ROUTER_CONFIG.pagesPath}/${route}.html`;
  
    try {
      const response = await fetch(url, { cache: 'no-store' });
  
      if (!response.ok) throw new Error(`Page not found: ${url}`);
  
      return await response.text();
    } catch (error) {
      console.error(error);
      return renderNotFound(route);
    }
  }
  
  function renderNotFound(route) {
    return `
      <section class="route-error">
        <h1>404</h1>
        <p>Route <strong>${route}</strong> does not exist.</p>
      </section>
    `;
  }
  
  //MARK: Core Router Logic
  
  async function loadRoute(route) {
    if (!APP_ROOT) return;
  
    // Check if the route is protected
    if (PROTECTED_ROUTES.includes(route) && !isAuthenticated()) {
      APP_ROOT.innerHTML = renderNotAuthorized();
      return;
    }
  
    APP_ROOT.setAttribute('aria-busy', 'true');
  
    const html = await fetchPage(route);
    APP_ROOT.innerHTML = html;
  
    APP_ROOT.removeAttribute('aria-busy');
  
    // Re-run binder after injection
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('content:loaded'));
    }
  }
  
  function isAuthenticated() {
    // Placeholder for authentication logic
    // Replace with actual authentication check
    return window.localStorage.getItem('authToken') !== null;
  }
  
  function renderNotAuthorized() {
    return `
      <section class="route-error">
        <h1>401</h1>
        <p>You are not authorized to access this page. Please log in.</p>
      </section>
    `;
  }
  
  function navigateTo(path) {
    const route = normalizeRoute(path);
    history.pushState({}, '', `/${route === ROUTER_CONFIG.defaultRoute ? '' : route}`);
    loadRoute(route);
  }
  
  //MARK: Event Bindings
  
  window.addEventListener('popstate', () => {
    const route = normalizeRoute(window.location.pathname);
    loadRoute(route);
  });
  
  // Intercept internal navigation links
  
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
  
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
  
    event.preventDefault();
    navigateTo(href);
  });
  
  //MARK: Initial Boot
  
  document.addEventListener('DOMContentLoaded', () => {
    const route = normalizeRoute(window.location.pathname);
    loadRoute(route);
  });