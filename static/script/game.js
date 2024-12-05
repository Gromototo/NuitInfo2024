export let score = {
    jauge1: 50,
    jauge2: 50,
    jauge3: 50,
};

let progressBar1;
let progressText1;
let progressBar2;
let progressText2;
let progressBar3;
let progressText3;

export function updateScore(x) {
    score.jauge1 += x.jauge1;
    score.jauge2 += x.jauge2;
    score.jauge3 += x.jauge3;
    updateProgressBar(); // Appeler updateProgressBar après la mise à jour du score
}

function updateProgressBar() {
    if (progressBar1 && progressText1) {
        progressBar1.setAttribute('height', `${score.jauge1}%`);
        progressBar1.setAttribute('y', `${100 - score.jauge1}%`);
        progressText1.textContent = `${score.jauge1}%`;
    }
    if (progressBar2 && progressText2) {
        progressBar2.setAttribute('height', `${score.jauge2}%`);
        progressBar2.setAttribute('y', `${100 - score.jauge2}%`);
        progressText2.textContent = `${score.jauge2}%`;
    }
    if (progressBar3 && progressText3) {
        progressBar3.setAttribute('height', `${score.jauge3}%`);
        progressBar3.setAttribute('y', `${100 - score.jauge3}%`);
        progressText3.textContent = `${score.jauge3}%`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    progressBar1 = document.querySelector('.progress-fill-1');
    progressText1 = document.querySelector('.progress-text-1');
    const increaseButton1 = document.getElementById('increaseButton1');

    progressBar2 = document.querySelector('.progress-fill-2');
    progressText2 = document.querySelector('.progress-text-2');
    const increaseButton2 = document.getElementById('increaseButton2');

    progressBar3 = document.querySelector('.progress-fill-3');
    progressText3 = document.querySelector('.progress-text-3');
    const increaseButton3 = document.getElementById('increaseButton3');

    let playerProgress = 0;

    function increaseProgress() {
        if (playerProgress < 100) {
            playerProgress += 10; // Augmenter la progression de 10%
            updateScore({ jauge1: 0, jauge2: 0, jauge3: 0 }); // Mettre à jour le score ici
        }
    }

    increaseButton1.addEventListener('click', increaseProgress);
    increaseButton2.addEventListener('click', increaseProgress);
    increaseButton3.addEventListener('click', increaseProgress);
    updateProgressBar();
});
