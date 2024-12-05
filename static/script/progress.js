import {score} from "./game";
document.addEventListener("DOMContentLoaded", function() {
  const progressBar = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const increaseButton = document.getElementById('increaseButton');

  // Simulate player progress (you can replace this with actual player data)
  let playerProgress = 0;

  function updateProgressBar() {
    progressBar.setAttribute('height', `${score.jauge1}%`);
    progressBar.setAttribute('y', `${100 - score.jauge1}%`);
    progressText.textContent = `${score.jauge1}%`;
  }

  // Function to increase player progress
  function increaseProgress() {
    if (playerProgress < 100) {
      playerProgress += 10; // Increase progress by 10%
      updateProgressBar();
    }
  }

  // Event listener for the "+" button
  increaseButton.addEventListener('click', increaseProgress);

  // Initial setup
  updateProgressBar();
});
