document.addEventListener("DOMContentLoaded", () => {
    const levels = [
      { buttonId: "game1", containerClass: "buttons-container1" },
      { buttonId: "game2", containerClass: "buttons-container2" },
      { buttonId: "game3", containerClass: "buttons-container3" },
    ];

    const popups = [
        { PopupId: "popup1", containerClass: "buttons-container1" },
        { PopupId: "popup2", containerClass: "buttons-container2" },
        { PopupId: "popup3", containerClass: "buttons-container3" },
      ];
  
    let currentIndex = 0;
  
    const popup = document.getElementById("popup1");
    const closePopup = document.getElementById("closePopup");
  
    const showPopup = () => {
      popup.style.display = "block";
    };
  
    const hidePopup = () => {
      popup.style.display = "none";
      enableNextButton();
    };
  
    const enableNextButton = () => {
      if (currentIndex < levels.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextContainer = document.querySelector(`.${levels[nextIndex].containerClass}`);
        const nextButton = document.getElementById(levels[nextIndex].buttonId);
  
        if (nextContainer && nextButton) {
          nextContainer.style.display = "block";
          nextButton.disabled = false;
        }
  
        currentIndex++;
      }
    };
  
    closePopup.addEventListener("click", hidePopup);
  
    levels.forEach((level, index) => {
      const button = document.getElementById(level.buttonId);
      if (button) {
        button.addEventListener("click", () => {
          if (index === currentIndex) {
            showPopup();
          }
        });
      }
    });
  });
  