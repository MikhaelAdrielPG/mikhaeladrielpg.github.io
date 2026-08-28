/**
 * Toggle visibility of hidden items in lists (Certifications, Projects)
 */
function toggleShow(
  id,
  button,
  showText = "Show More",
  hideText = "Show Less"
) {
  const container = document.getElementById(id);
  if (!container) return;

  const items = container.querySelectorAll(".toggle-item");
  const allVisible = [...items].every(
    (item) => !item.classList.contains("d-none")
  );

  items.forEach((item) => item.classList.toggle("d-none", allVisible));
  const willBeVisible = !allVisible;

  button.innerHTML = `<span>${willBeVisible ? hideText : showText}</span> <i class="bi bi-chevron-${willBeVisible ? 'up' : 'down'}"></i>`;
  button.setAttribute("aria-expanded", willBeVisible);
}

/**
 * Dark mode toggle functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");
  if (!toggleBtn) return;

  // Check saved preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.documentElement.classList.add("dark-mode");
    toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    toggleBtn.setAttribute("title", "Switch to light mode");
    toggleBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
    toggleBtn.setAttribute("title", "Switch to dark mode");
    toggleBtn.setAttribute("aria-label", "Switch to dark mode");
  }

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
      toggleBtn.setAttribute("title", "Switch to light mode");
      toggleBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
      toggleBtn.setAttribute("title", "Switch to dark mode");
      toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    }
  });
});
