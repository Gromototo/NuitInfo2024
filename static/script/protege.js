const gameContainer = document.getElementById("game-container");
const healthBar = document.getElementById("health-bar");
const healthText = document.getElementById("health-text");
const timerDisplay = document.getElementById("timer"); // Référence du minuteur
const dangers = [
    "../images/wave.png",       // Chemin vers l'image pour les vagues chaudes
    "../images/pollution.png",  // Chemin vers l'image pour la pollution
    "../images/trash.png"       // Chemin vers l'image pour les déchets marins
];

let health = 100; // Santé initiale des coraux
let difficulty = 1; // Niveau de difficulté initial
let gameInterval;
let difficultyInterval;
let victoryTimeout;
let timeRemaining = 60; // Temps restant en secondes

// Réduit la santé des coraux
function reduceHealth() {
    health -= 10;
    if (health <= 0) {
        gameOver();  // Appeler gameOver si la santé atteint 0
    }
    updateHealthBar();
}

// Met à jour l'affichage de la jauge de santé
function updateHealthBar() {
    healthBar.style.width = health + "%";
    healthText.textContent = health + "%";
}

// Supprime un danger après clic
function removeDanger(danger) {
    gameContainer.removeChild(danger);
}

// Affiche le message de Game Over à l'écran
function gameOver() {
    clearInterval(gameInterval);
    clearInterval(difficultyInterval);
    clearTimeout(victoryTimeout);

    // Afficher le message de défaite dans le jeu
    const gameOverMessage = document.getElementById("game-over");
    gameOverMessage.style.display = "block"; // Rendre visible le message de défaite

    // Optionnel: Ajout d'un bouton pour recommencer le jeu
    gameOverMessage.innerHTML = `
        <p>Game Over! Les coraux n'ont pas survécu. Essayez encore !</p>
        <button onclick="location.reload()">Rejouer</button>
    `;
}

// Affiche le message de victoire
function displayVictoryMessage() {
    clearInterval(gameInterval);
    clearInterval(difficultyInterval);
    alert("Félicitations ! Vous avez protégé les coraux pendant 1 minute. Merci pour votre engagement !");
    window.location.reload(); // Recharge la page pour redémarrer
}

// Crée un danger qui tombe
function createDanger() {
    const danger = document.createElement("div");
    danger.classList.add("danger");
    danger.style.left = Math.random() * (window.innerWidth - 50) + "px";
    danger.style.backgroundImage = `url(${dangers[Math.floor(Math.random() * dangers.length)]})`;
    gameContainer.appendChild(danger);

    let dangerPosition = -50;
    const speed = Math.random() * 3 * difficulty + 2; // Vitesse aléatoire augmentée avec la difficulté

    const fallInterval = setInterval(() => {
        dangerPosition += speed;
        danger.style.top = dangerPosition + "px";

        if (dangerPosition > window.innerHeight - 150) {
            clearInterval(fallInterval);
            gameContainer.removeChild(danger);
            reduceHealth();
        }
    }, 50);

    danger.addEventListener("click", () => {
        clearInterval(fallInterval);
        removeDanger(danger);
    });
}

// Augmente la difficulté progressivement
function increaseDifficulty() {
    difficulty += 0.15; // Augmente plus rapidement la difficulté
}

// Mise à jour du minuteur
function updateTimer() {
    timeRemaining -= 1;
    timerDisplay.textContent = `Temps restant : ${timeRemaining}s`;

    if (timeRemaining <= 0) {
        displayVictoryMessage(); // Le joueur gagne après 1 minute
    }
}

// Lance le jeu
function startGame() {
    gameInterval = setInterval(createDanger, 1000); // Crée un nouveau danger toutes les secondes
    difficultyInterval = setInterval(increaseDifficulty, 3000); // Augmente la difficulté toutes les 3 secondes
    victoryTimeout = setTimeout(displayVictoryMessage, 60000); // Déclare la victoire après 1 minute
    setInterval(updateTimer, 1000); // Met à jour le minuteur toutes les secondes
}

// Démarre le jeu au chargement
startGame();
