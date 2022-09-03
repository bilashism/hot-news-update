const afterContentLoad = () => {
  const collapseTogglers = document.querySelectorAll("[data-collapse-toggle]");
  collapseTogglers.forEach(button => {
    button.addEventListener("click", () => {
      document
        .querySelector(`#${button.dataset.collapseToggle}`)
        .classList.toggle("hidden");
    });
  });
};
document.addEventListener("DOMContentLoaded", afterContentLoad);
