import Card from './Card.js';
function loadQuestionsAndCreateCards() {
    fetch('../static/data/cartes.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const questions = data.cartes;
            const cardStack = document.getElementById('card-stack');

            cardStack.innerHTML = '';

            questions.forEach((question, index) => {
                const card = new Card(question, index, cardStack);
                 card.createCard();
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des questions:', error);
        });
}

window.addEventListener('DOMContentLoaded', loadQuestionsAndCreateCards);