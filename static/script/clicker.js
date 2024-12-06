// Variables d'état
let dechets = 0;
let bénévoles = 0;
let bateaux = 0;
let prixBenevole = 10;
let prixBateau = 300;
const objectif = 2000;
let victoire = false;

// Fonction pour afficher un message de victoire
function afficherVictoire() {
    const victoireMessage = document.getElementById("victoire-message");
    victoireMessage.style.display = "block"; // Affiche la boîte de message
}


// Fonction de clic
function clicker() {
    dechets += 1;
    document.getElementById("dechets").textContent = dechets;

    // Vérifie si l'objectif est atteint
    if (dechets >= objectif && !victoire) {
        victoire = true; // Empêche d'afficher le message plusieurs fois
        afficherVictoire();
    }

    // Active les boutons si les conditions sont remplies
    if (dechets >= prixBenevole) {
        document.getElementById("benevole-button").disabled = false;
    }
    if (dechets >= prixBateau) {
        document.getElementById("bateau-button").disabled = false;
    }
}

// Sélection des éléments du DOM
const dechetsElement = document.getElementById("dechets");
const benevolesElement = document.getElementById("benevoles");
const bateauxElement = document.getElementById("bateaux");
const prixBenevoleElement = document.getElementById("prix-benevole");
const prixBateauElement = document.getElementById("prix-bateau");
const benevoleButton = document.getElementById("benevole-button");
const bateauButton = document.getElementById("bateau-button");
const clickButton = document.getElementById("click-button");

// Mise à jour de l'interface utilisateur
function updateUI() {
  dechetsElement.textContent = dechets;
  benevolesElement.textContent = bénévoles;
  bateauxElement.textContent = bateaux;
  prixBenevoleElement.textContent = prixBenevole;
  prixBateauElement.textContent = prixBateau;

  benevoleButton.disabled = dechets < prixBenevole;
  bateauButton.disabled = dechets < prixBateau;
}

// Fonction pour gérer les clics
clickButton.addEventListener("click", () => {
  if (dechets < objectif) {
    dechets += 1;
    updateUI();
  }
});

// Fonction pour acheter un bénévole
benevoleButton.addEventListener("click", () => {
  if (dechets >= prixBenevole) {
    dechets -= prixBenevole;
    bénévoles += 1;
    prixBenevole = Math.round(prixBenevole *1.4); // Double le prix du prochain bénévole
    updateUI();
  }
});

// Fonction pour acheter un bateau
bateauButton.addEventListener("click", () => {
  if (dechets >= prixBateau) {
    dechets -= prixBateau;
    bateaux += 1;
    prixBateau = Math.round(prixBateau * 1.2); // Augmente le prix du prochain bateau
    updateUI();
  }
});

// Générer des déchets automatiquement (bénévoles et bateaux)
setInterval(() => {
  if (bénévoles > 1) {
    dechets += Math.round(bénévoles*bénévoles/2); // Ajoute 1 déchet par bénévole par seconde
  }
  if (bénévoles == 1) {
    dechets += 1; // Ajoute 1 déchet par bénévole par seconde
  }
  if (bateaux > 0) {
    dechets += Math.round(5 * bateaux * bateaux); // Ajoute 20 déchets par bateau toutes les 5 secondes
  }
  updateUI();
  if (dechets >=objectif && !victoire){
    victoire=true;
    afficherVictoire();
  }
}, 1000); // Intervalle de 1 seconde

// Initialiser l'interface
updateUI();
