// variables

let suits = ['hearts', 'clubs', 'diamonds', 'spades'];

let labels = ["ace","king","queen","jack","10","9","8","7","6","5","4","3","2"];

let values = ["1","10","10","10","10","9","8","7","6","5","4","3","2"];

// player card container
const player1Container = document.querySelector('#player1-card-container')
const player2Container = document.querySelector('#player2-card-container')

// define the span for score
const player1TotalScore = document.querySelector('#player1TotalScore')
const player2TotalScore = document.querySelector('#player2TotalScore')

let currentPlayer = 1
function switchPlayer() {
    if(currentPlayer == 1) {
        currentPlayer = 2
    } else {
        currentPlayer = 1
    }
}

// start button/reset btn
let startBtn = document.querySelector('.start');
let hitBtn = document.querySelector('.hit');
let stayBtn = document.querySelector('.stay');

// class constructor
class Card {
    constructor(suit, label, value) {
        this.suit = suit;
        this.value = value;
        this.label = label;
    }
}

// creating a deck of cards and shuffling it
let deckOfCards 

function createNewDeck() {
    deckOfCards = []
    for(let i=0; i < labels.length; i++) {
        for (let s=0; s < suits.length; s++) {
            deckOfCards.push(new Card(suits[s], labels[i], values[i]))
        }
    }
    return deckOfCards;
}

console.log(deckOfCards)

function shuffle() {
    for (let x=0; x < deckOfCards.length; x++) {
        let y = Math.floor(Math.random() * (x + 1));
        let temp = deckOfCards[x]
        deckOfCards[x] = deckOfCards[y]
        deckOfCards[y] = temp
    }
}

// creating a random card and testing it
let a = new Card("hearts", "2", "1")
console.log(a)


// label each image with the value

const getImage = (cardObj) => {
    const {suit,value,label} = cardObj
    return `card_images/${label}_of_${suit}.png`
}
getImage(a)


// starting the game

// appending the card's value to the respective player's score
function addCardToPlayer(playerNum) {
    let container
    let score
    if (playerNum == 1) {
       container = player1Container
       score = player1TotalScore
    } else {
       container = player2Container
       score = player2TotalScore
    }

    // add a card to the container
    const newCard = deckOfCards.pop()
    const newImageElement = document.createElement('img')
    newImageElement.src = getImage(newCard)
    container.appendChild(newImageElement)

    // update score
    const currentScore = score.innerText
    score.innerText = parseInt(currentScore) + parseInt(newCard.value)

}

// when startBtn is clicked, place a card on SPOT 1 on P1 and P2

function initializeButtons() {
    // disable these buttons to start
    hitBtn.disabled = true
    stayBtn.disabled = true
 
    startBtn.addEventListener('click', () => {
        initializeGame()
        addCardToPlayer(1)
        addCardToPlayer(2)
        hitBtn.disabled = false
        stayBtn.disabled = false
        startBtn.disabled = true
        player1Container.style.border = '5px solid darksalmon'
    })

    hitBtn.addEventListener('click', () => {
        addCardToPlayer(currentPlayer)
        checkScore() 
    })

    stayBtn.addEventListener('click', () => {
        player1Container.style.border = 'none'
        player2Container.style.border = '5px solid darksalmon'
        
        if (currentPlayer == 1) {
            currentPlayer = 2
        } else {
           endGame()

           if(player1TotalScore.innerText > player2TotalScore.innerText) {
                winningMessage.innerText = "Player 1 Wins!"
           } else if (player1TotalScore.innerText === player2TotalScore.innerText) {
                winningMessage.innerText = "Its a Tie!"
           } else {
                winningMessage.innerText = "Player 2 Wins!"
           }
        } 
    })
}
initializeButtons()

// check if score exceeds 21
const winningMessage = document.querySelector('.winning-message')
function checkScore() {
    if (player1TotalScore.innerText > 21) {
        winningMessage.innerText = "Player 2 Wins!"
        endGame()
    } else if (player2TotalScore.innerText > 21) {
        winningMessage.innerText = "Player 1 Wins!"
        endGame()
    }
}

// ending the game
function endGame() {
    currentPlayer = 1
    hitBtn.disabled = true
    stayBtn.disabled = true
    startBtn.disabled = false
 }

 // refreshing the game
 function initializeGame() {
     createNewDeck()
     shuffle()
     console.log(deckOfCards.length)
     winningMessage.innerText = ""
     player1Container.innerHTML = ""
     player2Container.innerHTML = ""
     player1TotalScore.innerText = "0"
     player2TotalScore.innerText = "0"
     player1Container.style.border = 'none'
     player2Container.style.border = 'none'
 }


















