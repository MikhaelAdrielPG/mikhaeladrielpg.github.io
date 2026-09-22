/**
 * ==========================================================================
 * THEME MANAGER (Single Responsibility: Dark / Light Mode)
 * mikhaeladrielpg.github.io
 * Controls theme preferences, persistence, system sync, and UI indicators.
 * ==========================================================================
 */

import { CONFIG } from './config.js';

/**
 * Checks whether dark mode is currently active.
 * @returns {boolean}
 */
export function isDarkModeActive() {
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
export function applyTheme(isDark) {
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
export function toggleTheme() {
  const willBeDark = !isDarkModeActive();
  localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, willBeDark ? 'enabled' : 'disabled');
  applyTheme(willBeDark);
}

/**
 * Initializes the theme controller and binds event listeners.
 */
export function initTheme() {
  // Apply initial theme state
  applyTheme(isDarkModeActive());

  // Bind click event to toggle button
  const toggleBtn = document.querySelector(CONFIG.SELECTORS.DARK_MODE_TOGGLE);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  // Listen to OS system color-scheme changes if user hasn't overridden
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
