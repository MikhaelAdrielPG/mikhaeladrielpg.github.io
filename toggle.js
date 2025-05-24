function toggleShow(id, button) {
  const container = document.getElementById(id);
  const items = container.querySelectorAll(".toggle-item");
  let allVisible = true;

  items.forEach((item) => {
    if (item.classList.contains("d-none")) {
      allVisible = false;
    }
  });

  items.forEach((item) => {
    if (allVisible) {
      item.classList.add("d-none");
    } else {
      item.classList.remove("d-none");
    }
  });

  button.textContent = allVisible ? "Show More" : "Show Less";
}
