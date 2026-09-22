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
        // Use Bootstrap Collapse API if available, or fallback to class removal
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

// Execute when DOM content is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
