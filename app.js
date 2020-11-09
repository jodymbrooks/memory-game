document.addEventListener('DOMContentLoaded', () => {

    const cardBack = 'images/bw-blank.png'; // 'images/blank.png';

    // card options
    const cardArray = [
        { name: 'fries', img: 'images/fries.png' },
        { name: 'fries', img: 'images/fries.png' },
        { name: 'cheeseburger', img: 'images/cheeseburger.png' },
        { name: 'cheeseburger', img: 'images/cheeseburger.png' },
        { name: 'hotdog', img: 'images/hotdog.png' },
        { name: 'hotdog', img: 'images/hotdog.png' },
        { name: 'ice-cream', img: 'images/ice-cream.png' },
        { name: 'ice-cream', img: 'images/ice-cream.png' },
        { name: 'milkshake', img: 'images/milkshake.png' },
        { name: 'milkshake', img: 'images/milkshake.png' },
        { name: 'pizza', img: 'images/pizza.png' },
        { name: 'pizza', img: 'images/pizza.png' },
        { name: 'cupcake', img: 'images/cupcake.jpg' },
        { name: 'cupcake', img: 'images/cupcake.jpg' },
        { name: 'donut', img: 'images/donut.jpg' },
        { name: 'donut', img: 'images/donut.jpg' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const notification = document.getElementById('notification');
    const overlay = document.getElementById('overlay');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let attempts = 0;

    // create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const item = cardArray[i];
            var card = document.createElement('img');
            card.setAttribute('src', cardBack);
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);

        }
    }

    function disableInput(disable) {
        if (disable) {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    }

    function notify(message, callback) {
        if (message) {
            notification.style.display = 'block';
            setTimeout(() => {
                notify();
                if (callback)
                    callback.call();
            }, 2000);
            disableInput(true);
        } else {
            message = '';
            notification.style.display = 'none';
            disableInput(false);
        }

        notification.innerHTML = message;
    }

    // check for matches
    function checkForMatch() {
        attempts++;
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen);
            notify('You found a match', () => {
                cards[optionOneId].setAttribute('src', 'images/white.png');
                cards[optionTwoId].setAttribute('src', 'images/white.png');
            });
        } else {
            notify('Sorry, try again', () => {
                cards[optionOneId].setAttribute('src', cardBack);
                cards[optionTwoId].setAttribute('src', cardBack);
            });
        }

        cardsChosen = [];
        cardsChosenId = [];
        showResults();
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You got them all in ' + attempts + ' guesses!';
        }
    }

    function showResults() {
        resultDisplay.textContent = 'Score: ' + cardsWon.length + ' matches in ' + attempts + ' attempts';
    }


    // flip your card
    function flipCard() {
        if (this.getAttribute('src') !== cardBack) return;

        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 200);
        }
    }

    createBoard();
    showResults();
});
