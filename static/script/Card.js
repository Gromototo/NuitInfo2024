import {updateScore, score} from "./game.js";


export default class Card {
    constructor(question, index, cardStack) {
        this.question = question;
        this.index = index;
        this.cardStack = cardStack;
    }

    createCard() {
        console.log(this.question)
        const card = document.createElement('div');
        card.className = 'card';
        card.style.zIndex = 1000 - this.index;
        card.innerHTML = `
        <div class="card-container">
            <div class="card-data-container card-design">
                <div class="side front">
                    <div>
                        <h2 class="card-data-question">${this.question.recto.question}</h2>
                    </div>
                    <div class="card-data-interlocutor">
                        <div class="card-data-interlocutor-profil">
                            <img src="${this.question.recto.images[0]}" id="interlocuteurimage"</img>
                            <p id="interlocuteur">${this.question.recto.interlocuteur}</p>
                        </div>
                        <div class="card-data-interlocutor-description">
                            <p >${this.question.recto.description}</p>
                        </div>
                    </div>
                    <div class="btn-container">
                        <button class="btn flip-btn agree">&nbsp&nbspD'accord&nbsp</button>
                        <button class="btn flip-btn disagree">Pas d'accord</button>
                    </div> 
                </div>        
                <div class="side back">
                    <p>${this.question.verso.texte}</p>
                    <p>${this.question.verso.source}</p>
                    <button class="btn suprr-card">Suivant</button>
                </div>
            </div>
        </div>`;

        if(this.question.verso.jeu){
            const verso1 =  card.querySelector('.back');
            verso1.insertAdjacentHTML(
                "beforeend",
                `<button class="btn"><a id ="linkjeu" href="${this.question.verso.jeu}" target="new">Un super mini jeu</a></button>`,
            );
        }
        if(this.question.verso.fin){
            const verso1 =  card.querySelector('.back');
            verso1.insertAdjacentHTML(
                "beforeend",
                `<button class="btn"><a id ="linkjeu" href="${this.question.verso.fin}" target="new">Voulez vous rejouer ?</a></button>`,
            );
        }

        this.cardStack.appendChild(card);
        const flipButtonsAgree = card.querySelectorAll('.agree');
        flipButtonsAgree.forEach(btn => btn.addEventListener('click', () => this.flipCardAgree(card)));

        const flipButtonsDisagree = card.querySelectorAll('.disagree');
        flipButtonsDisagree.forEach(btn => btn.addEventListener('click', () => this.flipCardDisagree(card)));

        const Suprr = card.querySelectorAll('.suprr-card');
        Suprr.forEach(btn => btn.addEventListener('click', () => this.suprCard(card)));
    }

    flipCardAgree(cardElement) {
        const card = cardElement.querySelector('.card-data-container');
        updateScore(this.question.agree);
        card.style.transform = 'rotateY(180deg)';
    }
    flipCardDisagree(cardElement) {
        const card = cardElement.querySelector('.card-data-container');
        updateScore(this.question.disagree);
        card.style.transform = 'rotateY(180deg)';
        card.style.padding = '0';
    }

    suprCard(cardElement) {
        console.log(score)
        cardElement.remove()
    }
}
