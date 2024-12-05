document.addEventListener('DOMContentLoaded', function() {
    // Répertorie toutes les cartes
    const cardArray = [
        {
            id:1,
            img:'../static/images/glacier.png'
        },
        {
            id:1,
            img:'../static/images/montée_des_eaux.png'
        },
        {
            id:2,
            img:'../static/images/industrie.png'
        },
        {
            id:2,
            img:'../static/images/pollution.png'
        },
        {
            id:3,
            img:'../static/images/Effet_de_serre.png'
        },
        {
            id:3,
            img:'../static/images/rechauffement.png'
        },
        {
            id:4,
            img:'../static/images/agriculture.png'
        },
        {
            id:4,
            img:'../static/images/deforestation.png'
        },
        {
            id:5,
            img:'../static/images/minage.png'
        },
        {
            id:5,
            img:'../static/images/secheresse.png'
        },
        {
            id:6,
            img:'../static/images/permafrost.png'
        },
        {
            id:6,
            img:'../static/images/dinosaure.png'
        }
    ];

    // On mélange l'ordre des cartes
    cardArray.sort(function () {
        return 0.5 - Math.random();
    });

    //Récupération de la grille du jeu et du résultat
    const grid = document.querySelector('.game_grid');
    //Récupération du nombre de paire trouvées
    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = '0';
    // Le compteur de temps
    const timeValue = document.getElementById("timer");
    timeValue.textContent = '00:00';
    let seconds = 0, minutes = 0;
    //Le compteur d'essais
    const moves = document.getElementById("moves");
    moves.textContent = '0';
    let movesCount = 0;
    const movesCounter = () => {
        movesCount += 1;
        moves.innerHTML = `${movesCount}`;
    };
    //  Démarre le timer
    const timeGenerator = () => {
        seconds += 1;
        //minutes logic
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        //formater les variables avant de les publier
        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        timeValue.innerHTML = ` ${minutesValue}:${secondsValue}`;
    };
    //variables pour récupérer les données de la cartes choisies
    let cardsChosen = [];
    let cardsChosenID = [];
    //variables pour stocker les cartes gagnés au cours de la partie
    let cardsWon = [];
    let interval;


    //Création du plateau de jeu
    function createBoard(){
        for (let pas=0; pas< cardArray.length; pas++) {
            let card = document.createElement('img');
            card.setAttribute('src', '../static/images/rien.png');
            card.setAttribute('data-id', pas);
            console.log(card);
            card.addEventListener("click", flipCard);
            let flipeffect = document.createElement('div');
            let flipcardinner = document.createElement('div');
            flipeffect.classList.add('flip-card');
            flipeffect.appendChild(flipcardinner);
            flipcardinner.classList.add('flip-card-inner');
            flipcardinner.appendChild(card);
            grid.appendChild(flipeffect);
        }
    }

    //vérifier les paires
    function CheckFormatch(){
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenID[0];
        const optionTwoId = cardsChosenID[1];
        if(cards[optionTwoId].classList.contains('found') || cards[optionOneId].classList.contains('found') ){
            console.log('carte déjà trouvé');
        }
        else{
            if (cardsChosen[0] === cardsChosen[1]){
                cards[optionOneId].setAttribute('disabled', 'true');
                cards[optionOneId].classList.add('found');
                cards[optionTwoId].setAttribute('disabled', 'true');
                cards[optionTwoId].classList.add('found');
                cardsWon.push(cardsChosen);
                console.log(cardsChosen[0]);
                if(cardsChosen[0] == 1){
                    Swal.fire({
                        text: "Pour bien comprendre, il faut distinguer la banquise de la calotte glaciaire. La banquise, c’est de la glace formée par le gel de l’eau de mer en hiver, ce sont les icebergs qui flottent sur les océans et la banquise arctique au pôle nord. La banquise est déjà dans l’eau, quand elle fond cela ne change rien au niveau des mers. Mais les glaciers, sont composés d’eau qui s’est solidifiée en dehors des océans. Donc quand ils fondent, cela fait directement monter les eaux. ",
                    });
                }
                if(cardsChosen[0] == 2){
                    Swal.fire({
                        text: "Le secteur de l’industrie manufacturière (hors activité liée au traitement des déchets et y compris activités de construction) est à l’origine de 78 Mt CO2 eq. émis en 2019. Ce secteur est le quatrième contributeur d’émissions de gaz à effet de serre (GES) sur le territoire national français.",
                    });
                }
                if(cardsChosen[0] == 3){
                    Swal.fire({
                        text: "Depuis la révolution industrielle, l’humanité ajoute ses propres émissions de gaz à effet de serre à celles de la nature. Ce « bonus » a tout changé. Dans son rapport publié en août 2021, le Giec n’a jamais été aussi catégorique : « Sans équivoque, l’influence humaine a réchauffé l’atmosphère, les océans et les terres. » Cet effet de serre additionnel est la seule cause du réchauffement climatique. ",
                    });
                }
                if(cardsChosen[0] == 4){
                    Swal.fire({
                        text: "La forêt a principalement reculé dans les tropiques, particulièrement en Amérique du Sud et en Afrique. Abritant près des deux tiers de la forêt amazonienne, le Brésil est le pays au monde qui a perdu le plus d’hectares de forêts (984 000), devant l’Indonésie, la Birmanie, le Nigeria et la Tanzanie. 80 % de la déforestation est due à l’agriculture.",
                    });
                }
                if(cardsChosen[0] == 5){
                    Swal.fire({
                        text: "L'extraction de lithium n'est pas sans conséquences pour l'environnement. Au Chili, l'entreprise SQM, une des deux entreprises autorisées à exploiter le désert d'Atacama, dit ainsi puiser en 2022 près de 400.000 litres d'eau par heure pour les besoins de son usine.",
                    });
                }
                if(cardsChosen[0] == 6){
                    Swal.fire({
                        text: "Surprise ! La fonte du Permafrost (sol perpétuellement gelé des régions arctiques), engendre la découverte d'espèces éteintes depuis des années. Des dinosaures commencent à etre libérés dans le cercle arctique. Esperons qu'ils ne savent pas nager !",
                    });
                }
            }
            else{
                cards[optionOneId].setAttribute('src', '../static/images/rien.png');
                cards[optionTwoId].setAttribute('src', '../static/images/rien.png');
            }
        }
        cardsChosen = [];
        cardsChosenID = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2 && movesCount == 6){
            resultDisplay.textContent = 'Bravo!';
            clearInterval(interval);
            Swal.fire({
                title: 'Congratulations you won ! AND YOU FOUND THE EASTER EGG !!',
                html: '<p>Solving time: <span class="timewon"></span>s</p> <p>Total moves: <span class="moveswon"></span></p>',
                didOpen: () => {
                    const timewon = Swal.getHtmlContainer().querySelector('.timewon');
                    timewon.textContent = seconds;
                    const moveswon = Swal.getHtmlContainer().querySelector('.moveswon');
                    moveswon.textContent = movesCount;
                },
                text: 'Do you want to restart the game?',
                showCancelButton: true,
                confirmButtonText: 'Restart',
                imageUrl: "https://media.giphy.com/media/kwnRfbCKVf4VHfv3hm/giphy.gif",
                imageWidth: 400,
                imageAlt: "Custom image"
            })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let timerInterval;
                    Swal.fire({
                        title: 'Restarting',
                        html: 'The game will restart in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    });
                    setTimeout(refreshPage, 2000);
                }
            })

        }
        else if (cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = 'Bravo!';
            clearInterval(interval);
            Swal.fire({
                title: 'Congratulations you won ! Now you can try and find the Easter Egg!',
                html: '<p>Solving time: <span class="timewon"></span>s</p> <p>Total moves: <span class="moveswon"></span></p>',
                didOpen: () => {
                    const timewon = Swal.getHtmlContainer().querySelector('.timewon');
                    timewon.textContent = seconds;
                    const moveswon = Swal.getHtmlContainer().querySelector('.moveswon');
                    moveswon.textContent = movesCount;
                },
                text: 'Do you want to restart the game?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Restart',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("../images/ok.gif")
                    left top
                    no-repeat
                `
            })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let timerInterval;
                    Swal.fire({
                        title: 'Restarting',
                        html: 'The game will restart in <b></b> milliseconds.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    });
                    setTimeout(refreshPage, 2000);
                }
            })

        }
    }
    //retourner les cartes
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].id);
        cardsChosenID.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2){
            movesCounter();
            setTimeout(CheckFormatch, 300);
        }
    }

    createBoard();
    //Un bouton pour commencer la partie (lancer le timer
    let start = document.querySelector('.game_start');
    start.addEventListener("click", () => {
        //movescount = 0;
        seconds = 0;
        minutes = 0;
        interval = setInterval(timeGenerator, 1000);
        moves.innerHTML = `${movesCount}`;
    });
    //Un bouton pour abandonner la partie
    let reset = document.querySelector('.game_reset');
    reset.addEventListener("click", refreshPage);
    function refreshPage(){
        window.location.reload();
    }
});
