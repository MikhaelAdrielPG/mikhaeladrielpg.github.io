/**
 * ==========================================================================
 * CONTENT TOGGLE MANAGER (Single Responsibility: Show More / Show Less)
 * mikhaeladrielpg.github.io
 * Manages item visibility via declarative data attributes and accessibility states.
 * ==========================================================================
 */

import { CONFIG } from './config.js';

/**
 * Toggles visibility for target items within a container.
 * @param {HTMLElement} button - The button triggering the toggle.
 */
export function handleContentToggle(button) {
  const targetSelector = button.getAttribute('data-toggle-target');
  if (!targetSelector) return;

  const container = document.querySelector(targetSelector);
  if (!container) return;

  const showText = button.getAttribute('data-show-text') || CONFIG.LABELS.SHOW_MORE;
  const hideText = button.getAttribute('data-hide-text') || CONFIG.LABELS.SHOW_LESS;

  const items = container.querySelectorAll(CONFIG.SELECTORS.TOGGLE_ITEMS);
  if (!items.length) return;

  // Determine current visibility state
  const allVisible = Array.from(items).every((item) => !item.classList.contains('d-none'));
  const willBeVisible = !allVisible;

  // Toggle Bootstrap d-none class
  items.forEach((item) => {
    item.classList.toggle('d-none', !willBeVisible);
  });

  // Update button content and accessibility state
  const chevronIcon = willBeVisible ? 'bi-chevron-up' : 'bi-chevron-down';
  const label = willBeVisible ? hideText : showText;

  button.innerHTML = `<span>${label}</span> <i class="bi ${chevronIcon}" aria-hidden="true"></i>`;
  button.setAttribute('aria-expanded', String(willBeVisible));
}

/**
 * Initializes all content toggle buttons on the page.
 */
export function initContentToggles() {
  const toggleButtons = document.querySelectorAll(CONFIG.SELECTORS.TOGGLE_BUTTONS);

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => handleContentToggle(button));
  });
}
