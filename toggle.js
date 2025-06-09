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
  button.textContent = allVisible ? showText : hideText;
  button.setAttribute("aria-expanded", !allVisible);
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.documentElement.classList.add("dark-mode");
    toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
  }

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
    }
  });
});
