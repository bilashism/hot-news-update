const initModals = () => {
  //#region - start of - modal
  //#region - start of - modal selectors
  const modalOpeners = document.querySelectorAll("[data-modal-ref]");
  const modalClosers = document.querySelectorAll("[data-modal-closer]");
  //#endregion - end of - modal selectors

  // shows the modal when the user clicks open-btn
  modalOpeners.forEach(btn => {
    btn.addEventListener("click", () => {
      document
        .querySelector(`[data-modal-id="${btn.dataset.modalRef}"]`)
        .classList.add("modal-shown");
      // document.documentElement.dispatchEvent(new Event("modal-shown"));
    });
  });

  // hides the modal when the user clicks close-btn
  modalClosers.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("[data-modal-id]").classList.remove("modal-shown");
    });
  });

  // hides the modal when the user clicks outside of the modal
  document.querySelectorAll("[data-modal-id]").forEach(modalBg => {
    modalBg.addEventListener("click", ev => {
      const elem = ev.target;
      if (
        elem.getAttribute("data-modal-id") != null &&
        elem.classList.contains("modal-shown")
      ) {
        elem.classList.remove("modal-shown");
      }
    });
  });

  // hides the modal when the user press 'Esc' key
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        document.querySelectorAll("[data-modal-id]").forEach(modal => {
          if (modal.classList.contains("modal-shown")) {
            modal.classList.remove("modal-shown");
          }
        });
      }
    }
  });
  //#endregion - end of - modal
};
