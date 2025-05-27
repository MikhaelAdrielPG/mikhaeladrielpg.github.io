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
