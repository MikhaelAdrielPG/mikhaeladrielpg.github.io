/**
 * ==========================================================================
 * APPLICATION ENTRY POINT & CONTROLLERS (js/main.js)
 * mikhaeladrielpg.github.io
 * Clean, universal vanilla JavaScript (zero external dependencies).
 * Works seamlessly across file://, http://, and https:// protocols without CORS restrictions.
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * Application Configuration & Selectors
   */
  const CONFIG = {
    STORAGE_KEYS: {
      THEME: 'darkMode'
    },
    THEMES: {
      DARK: 'dark',
      LIGHT: 'light',
      CLASS_DARK: 'dark-mode'
    },
    SELECTORS: {
      DARK_MODE_TOGGLE: '#darkModeToggle',
      TOGGLE_BUTTONS: '[data-toggle-target]',
      TOGGLE_ITEMS: '.toggle-item',
      NAV_LINKS: '.custom-navbar .nav-link',
      NAVBAR_COLLAPSE: '#navbarNav',
      NAVBAR_TOGGLER: '.navbar-toggler'
    },
    LABELS: {
      SHOW_MORE: 'Show More',
      SHOW_LESS: 'Show Less',
      SWITCH_TO_DARK: 'Switch to dark mode',
      SWITCH_TO_LIGHT: 'Switch to light mode'
    }
  };

  /* ==========================================================================
     THEME CONTROLLER (Dark / Light Mode)
     ========================================================================== */

  /**
   * Checks whether dark mode is currently active.
   * @returns {boolean}
   */
  function isDarkModeActive() {
    const savedPreference = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (savedPreference !== null) {
      return savedPreference === 'enabled';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Updates DOM attributes, classes, and toggle button state to match the target theme.
   * @param {boolean} isDark - True if dark mode is to be applied.
   */
  function applyTheme(isDark) {
    const root = document.documentElement;
    const toggleBtn = document.querySelector(CONFIG.SELECTORS.DARK_MODE_TOGGLE);

    if (isDark) {
      root.classList.add(CONFIG.THEMES.CLASS_DARK);
      root.setAttribute('data-bs-theme', CONFIG.THEMES.DARK);
    } else {
      root.classList.remove(CONFIG.THEMES.CLASS_DARK);
      root.setAttribute('data-bs-theme', CONFIG.THEMES.LIGHT);
    }

    if (toggleBtn) {
      const iconClass = isDark ? 'bi-sun' : 'bi-moon';
      const labelText = isDark ? CONFIG.LABELS.SWITCH_TO_LIGHT : CONFIG.LABELS.SWITCH_TO_DARK;

      toggleBtn.innerHTML = `<i class="bi ${iconClass}" aria-hidden="true"></i>`;
      toggleBtn.setAttribute('title', labelText);
      toggleBtn.setAttribute('aria-label', labelText);
      toggleBtn.setAttribute('aria-pressed', String(isDark));
    }
  }

  /**
   * Toggles the theme between dark and light, saving preference to localStorage.
   */
  function toggleTheme() {
    const willBeDark = !isDarkModeActive();
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, willBeDark ? 'enabled' : 'disabled');
    applyTheme(willBeDark);
  }

  /**
   * Initializes theme preference and binds click/system change listeners.
   */
  function initTheme() {
    applyTheme(isDarkModeActive());

    const toggleBtn = document.querySelector(CONFIG.SELECTORS.DARK_MODE_TOGGLE);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (event) => {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
        if (saved === null) {
          applyTheme(event.matches);
        }
      });
    }
  }

  /* ==========================================================================
     CONTENT TOGGLE CONTROLLER (Show More / Show Less)
     ========================================================================== */

  /**
   * Toggles visibility for target items within a container.
   * @param {HTMLElement} button - The button triggering the toggle.
   */
  function handleContentToggle(button) {
    const targetSelector = button.getAttribute('data-toggle-target');
    if (!targetSelector) return;

    const container = document.querySelector(targetSelector);
    if (!container) return;

    const showText = button.getAttribute('data-show-text') || CONFIG.LABELS.SHOW_MORE;
    const hideText = button.getAttribute('data-hide-text') || CONFIG.LABELS.SHOW_LESS;

    const items = container.querySelectorAll(CONFIG.SELECTORS.TOGGLE_ITEMS);
    if (!items.length) return;

    // Determine current visibility state
    // If ALL items are currently visible -> next action is "collapse" (hide them).
    // If ANY item is hidden -> next action is "expand" (show all).
    const allVisible = Array.from(items).every((item) => !item.classList.contains('d-none'));
    const willBeVisible = !allVisible;

    // Toggle Bootstrap d-none class
    items.forEach((item) => {
      item.classList.toggle('d-none', !willBeVisible);
    });

    // Update button text, icon, and accessibility state
    const chevronIcon = willBeVisible ? 'bi-chevron-up' : 'bi-chevron-down';
    const label = willBeVisible ? hideText : showText;

    button.innerHTML = `<span>${label}</span> <i class="bi ${chevronIcon}" aria-hidden="true"></i>`;
    button.setAttribute('aria-expanded', String(willBeVisible));
  }

  /**
   * Initializes all declarative content toggle buttons on the page.
   */
  function initContentToggles() {
    const toggleButtons = document.querySelectorAll(CONFIG.SELECTORS.TOGGLE_BUTTONS);
    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => handleContentToggle(button));
    });
  }

  /**
   * Global toggleShow fallback for backward compatibility
   */
  window.toggleShow = function (id, button, showText = 'Show More', hideText = 'Show Less') {
    const container = document.getElementById(id);
    if (!container) return;

    const items = container.querySelectorAll('.toggle-item');
    if (!items.length) return;

    const allVisible = Array.from(items).every((item) => !item.classList.contains('d-none'));
    const willBeVisible = !allVisible;

    items.forEach((item) => item.classList.toggle('d-none', !willBeVisible));

    button.innerHTML = `<span>${willBeVisible ? hideText : showText}</span> <i class="bi bi-chevron-${willBeVisible ? 'up' : 'down'}" aria-hidden="true"></i>`;
    button.setAttribute('aria-expanded', String(willBeVisible));
  };

  /* ==========================================================================
     MOBILE NAVIGATION AUTO-CLOSE
     ========================================================================== */

  /**
   * Closes mobile navigation collapse menu when a nav link is clicked.
   */
  function initMobileNavAutoClose() {
    const navLinks = document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS);
    const navbarCollapse = document.querySelector(CONFIG.SELECTORS.NAVBAR_COLLAPSE);

    if (!navbarCollapse) return;

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          if (window.bootstrap && window.bootstrap.Collapse) {
            const bsCollapse =
              window.bootstrap.Collapse.getInstance(navbarCollapse) ||
              new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        }
      });
    });
  }

  /* ==========================================================================
     APP INITIALIZATION
     ========================================================================== */

  function initApp() {
    initTheme();
    initContentToggles();
    initMobileNavAutoClose();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
