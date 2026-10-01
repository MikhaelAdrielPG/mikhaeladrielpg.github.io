/**
 * ==========================================================================
 * APPLICATION ENTRY POINT (main.js)
 * mikhaeladrielpg.github.io
 * Orchestrates modular components, accessibility handlers, and navigation behavior.
 * ==========================================================================
 */

import { initTheme } from './theme.js';
import { initContentToggles } from './toggle.js';
import { CONFIG } from './config.js';

/**
 * Closes the mobile navigation menu when a link is clicked.
 */
function initMobileNavAutoClose() {
  const navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);
  const navbarCollapse = document.querySelector(CONFIG.SELECTORS.NAVBAR_COLLAPSE);

  if (!navbarCollapse) return;

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Prefer Bootstrap's Collapse API over direct class removal to ensure
        // collapse transition animations and internal Bootstrap state are
        // properly cleaned up. Falls back to manual class removal if Bootstrap
        // JS has not been loaded yet (e.g., CDN failure or deferred timing).
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

/**
 * Main application initialization.
 */
function initApp() {
  initTheme();
  initContentToggles();
  initMobileNavAutoClose();
}

// Execute when DOM content is fully loaded.
// The readyState check handles the edge case where this module script
// runs after DOMContentLoaded has already fired (e.g., if loaded dynamically).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
