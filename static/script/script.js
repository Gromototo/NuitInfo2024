const circle = document.getElementById('circle');
const player = document.getElementById('player');
const darkOverlay = document.getElementById('dark-overlay');
const fishes = document.querySelectorAll('img[src="../images/fish.png"]'); // Sélectionne tous les poissons
const scoreDisplay = document.getElementById('score');

// Variables globales
let x = 0; // Position horizontale initiale
let y = 0; // Position verticale initiale
let score = 0;
let gameOver = false;

// Initialisation correcte du cercle et du joueur
function initializePositions() {
  const circle = document.getElementById('circle');
  const darkOverlay = document.getElementById('dark-overlay');

  // Centrer le joueur et le cercle au démarrage
  circle.style.transform = `translate(${x}px, ${y}px)`;
  darkOverlay.style.transform = `translate(${x}px, ${y}px)`;
}

// Déplacement du joueur
function movePlayer(event) {
  switch (event.key) {
    case 'ArrowUp':
      y -= 10;
      break;
    case 'ArrowDown':
      y += 10;
      break;
    case 'ArrowLeft':
      x -= 10;
      break;
    case 'ArrowRight':
      x += 10;
      break;
  }

  // Met à jour les positions
  const circle = document.getElementById('circle');
  const darkOverlay = document.getElementById('dark-overlay');
  const player = document.getElementById('player');

  circle.style.transform = `translate(${x}px, ${y}px)`;
  darkOverlay.style.transform = `translate(${x}px, ${y}px)`;
  player.style.transform = `translate(-50%, -50%) rotate(${getRotation(event.key)})`;

  checkCollision();
}

// Rotation en fonction de la direction
function getRotation(direction) {
  switch (direction) {
    case 'ArrowUp': return '0deg';
    case 'ArrowDown': return '180deg';
    case 'ArrowLeft': return '270deg';
    case 'ArrowRight': return '90deg';
    default: return '0deg';
  }
}

// Initialisation des positions après le chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  initializePositions(); // Initialise correctement le cercle et le joueur
  document.addEventListener('keydown', movePlayer); // Écoute les déplacements
});



// Affiche une image et "Game Over" en cas de collision avec un monstre
function showGameOver() {
    if (gameOver) return; // Ne fait rien si le jeu est terminé
  
    gameOver = true; // Indique que le jeu est terminé
  
    const gameOverImage = document.createElement('img');
    gameOverImage.src = 'https://images.prismic.io/fishfriender/502b6c4a-28f5-42ff-b02e-4c71d43b83e5_Untitled+%284%29.png?auto=compress,format'; // Image à afficher
    gameOverImage.alt = 'Game Over';
    gameOverImage.style.position = 'absolute';
    gameOverImage.style.width = '1000px';
    gameOverImage.style.top = '50%';
    gameOverImage.style.left = '50%';
    gameOverImage.style.transform = 'translate(-50%, -50%)';
    gameOverImage.style.zIndex = '100';
    document.body.appendChild(gameOverImage);
  
    const gameOverText = document.createElement('div');
    gameOverText.textContent = 'Game Over!';
    gameOverText.style.position = 'absolute';
    gameOverText.style.color = 'red';
    gameOverText.style.fontSize = '48px';
    gameOverText.style.fontWeight = 'bold';
    gameOverText.style.top = '75%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.zIndex = '100';
    document.body.appendChild(gameOverText);
  
    // Lecture du son
    const collisionSound = new Audio('../images/scream.mp3'); // Chemin vers le fichier audio
    collisionSound.play(); // Joue le son
  
    // Arrête le jeu
    clearInterval(monsterMovementInterval);
    document.removeEventListener('keydown', movePlayer);
  }
  
  
  
// Affiche un texte de victoire si tous les poissons sont collectés
function showVictory() {
    if (gameOver) return; // Ne fait rien si le jeu est terminé
  
    gameOver = true; 
    const victoryText = document.createElement('div');
    victoryText.innerHTML = `
        <h1>Félicitations !</h1>
        <p>Vous avez sauvé tous les poissons de la marée noire et échappé aux monstres !</p>
    `;
    victoryText.style.position = 'absolute';
    victoryText.style.color = 'green';
    victoryText.style.fontSize = '36px';
    victoryText.style.fontWeight = 'bold';
    victoryText.style.textAlign = 'center';
    victoryText.style.top = '50%';
    victoryText.style.left = '50%';
    victoryText.style.transform = 'translate(-50%, -50%)';
    victoryText.style.zIndex = '100';
    victoryText.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fond semi-transparent
    victoryText.style.padding = '20px';
    victoryText.style.borderRadius = '10px';
    document.body.appendChild(victoryText);

    // Arrête le jeu
    clearInterval(monsterMovementInterval);
    document.removeEventListener('keydown', movePlayer);

}

  
  // Vérifie les collisions
  function checkCollision() {
    if (gameOver) return; // Ne fait rien si le jeu est terminé
  
    const playerRect = player.getBoundingClientRect();
    const monsterRects = [monster1, monster2].map((m) => m.getBoundingClientRect());
  
    // Collision avec les monstres
    for (let monsterRect of monsterRects) {
      if (
        playerRect.x < monsterRect.x + monsterRect.width &&
        playerRect.x + playerRect.width > monsterRect.x &&
        playerRect.y < monsterRect.y + monsterRect.height &&
        playerRect.y + playerRect.height > monsterRect.y
      ) {
        showGameOver();
        return;
      }
    }
  
    // Collision avec les poissons
    fishes.forEach((fish) => {
      const fishRect = fish.getBoundingClientRect();
      if (
        playerRect.x < fishRect.x + fishRect.width &&
        playerRect.x + playerRect.width > fishRect.x &&
        playerRect.y < fishRect.y + fishRect.height &&
        playerRect.y + playerRect.height > fishRect.y &&
        fish.style.display !== 'none'
      ) {
        // Supprime le poisson et incrémente le score
        fish.style.display = 'none';
        score += 1;
        scoreDisplay.textContent = `Score: ${score}/7`;
  
        // Vérifie si tous les poissons sont collectés
        if (score === fishes.length) {
          showVictory();
        }
      }
    });
  }


const monster1 = document.getElementById('monster');
const monster2 = document.getElementById('monster2');

// Positions initiales des monstres
let monster1X = 80; // Position horizontale initiale en %
let monster1Direction = -1; // -1 signifie que le monstre va à gauche
let monster2X = 30;
let monster2Direction = 1; // 1 signifie que le monstre va à droite

// Largeur de la fenêtre pour les limites
const gameWidth = window.innerWidth;

// Déplace les monstres de droite à gauche
function moveMonsters() {
  // Déplace le monstre 1
  monster1X += monster1Direction * 1; // Change la position (vitesse : 1px par frame)
  if (monster1X < 0 || monster1X > 95) { // Rebonds aux bords
    monster1Direction *= -1;
  }
  monster1.style.left = `${monster1X}%`;

  // Déplace le monstre 2
  monster2X += monster2Direction * 1;
  if (monster2X < 0 || monster2X > 95) { // Rebonds aux bords
    monster2Direction *= -1;
  }
  monster2.style.left = `${monster2X}%`;

  // Vérifie les collisions avec le joueur
  checkCollision();
}

// Déplace les monstres à une fréquence fixe
setInterval(moveMonsters, 100); // Appelle la fonction toutes les 10ms


// Rotation en fonction de la direction
function getRotation(direction) {
  switch (direction) {
    case 'ArrowUp': return '0deg';
    case 'ArrowDown': return '180deg';
    case 'ArrowLeft': return '270deg';
    case 'ArrowRight': return '90deg';
    default: return '0deg';
  }
}


document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const gameArea = document.getElementById('game-area');
  
    // Attend la fin de l'animation avant de démarrer le jeu
    const animationDuration = 15000; // Durée de l'animation (10 secondes)
    setTimeout(() => {
      introScreen.style.display = 'none'; // Cache l'écran d'introduction
      gameArea.style.display = 'block'; // Affiche le jeu
    }, animationDuration);
  });
  
  