/**
 * ==========================================================================
 * BACKWARD COMPATIBILITY BRIDGE (root toggle.js)
 * Note: Core logic has been refactored into modular ES modules in js/:
 *   - js/config.js
 *   - js/theme.js
 *   - js/toggle.js
 *   - js/main.js
 * ==========================================================================
 */

/**
 * Legacy global toggleShow function for backward compatibility.
 * @param {string} id - Container element ID.
 * @param {HTMLElement} button - Toggle button element.
 * @param {string} [showText="Show More"]
 * @param {string} [hideText="Show Less"]
 */
function toggleShow(id, button, showText = "Show More", hideText = "Show Less") {
  const container = document.getElementById(id);
  if (!container) return;

  const items = container.querySelectorAll(".toggle-item");
  const allVisible = [...items].every(
    (item) => !item.classList.contains("d-none")
  );

  items.forEach((item) => item.classList.toggle("d-none", allVisible));
  const willBeVisible = !allVisible;

  button.innerHTML = `<span>${willBeVisible ? hideText : showText}</span> <i class="bi bi-chevron-${willBeVisible ? 'up' : 'down'}" aria-hidden="true"></i>`;
  button.setAttribute("aria-expanded", String(willBeVisible));
}

// Attach to window object for legacy callers
window.toggleShow = toggleShow;
