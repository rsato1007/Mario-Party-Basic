let startEl = document.querySelector("#start");
let startGameEl = document.getElementById("game-start"); 
let gameMessage = document.getElementById(`game-message`);
let diceBlockEl = document.querySelectorAll('.player-dice-turn');
let currentSpaceEl;
let diceNum;
let movesNum;

// Player objects
const player1 = {
    number: 1,
    points: 0,
    position: 0,
    charModel: document.createElement('span'),
    char() {
        this.charModel.style.height = "40px";
        this.charModel.style.width = "20px";
        this.charModel.style.display = "inline-block";
        this.charModel.style.backgroundColor = "#FFA500";
        this.charModel.textContent = '';
        this.charModel.classList.add = "pEl";
    },
}

const player2 = {
    number: 2,
    points: 0,
    position: 0,
    charModel: document.createElement('span'),
    // creates character on board
    char() {
        this.charModel.style.height = "40px";
        this.charModel.style.width = "20px";
        this.charModel.style.display = "inline-block";
        this.charModel.style.backgroundColor = "#FFDF00";
        this.charModel.textContent = '';
        this.charModel.classList.add = "pEl";
    },
    playerTurn() {

    },
}

// Dice Roll function
function rollDice() {
    diceNum = Math.floor(Math.random() * (7 - 1) + 1);
    console.log(`You rolled a ${diceNum}`);
}

// Function that moves player around on board
function movePlayer(playerNum) {
    for (i = 0; i < diceNum; i++) {
        if (playerNum.position === 0) {
            playerNum.position += 1;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        // else if (playerNum.position === 4) {
        //     playerNum.char();
        //     currentSpaceEl = document.getElementById(`square${playerNum.position}`);
        //     currentSpaceEl.append(playerNum.charModel);
        //     let option = window.prompt('right or down?');
        //     if (option === "right") {
        //         playerNum.position = 5;
        //     }
        //     else {
        //         playerNum.position = 11;
        //     }
        // }
        else if (playerNum.position === 49) {
            playerNum.position -= 1;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        else if (playerNum.position === 43) {
            playerNum.position -= 7;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        else if (playerNum.position === 44 || playerNum.position === 45 || playerNum.position === 46 || playerNum.position === 47 || playerNum.position === 48) {
            playerNum.position -= 1;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        else if (playerNum.position % 7 === 0) {
            playerNum.position += 7;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        } 
        else if ((playerNum.position % 7 === 1) && (playerNum.position === 1)) {
            playerNum.position += 1;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        else if (playerNum.position % 7 === 1) {
            playerNum.position -= 7;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        } 
        else {
            playerNum.position += 1;
            console.log(`You moved 1 space and are at position: ${playerNum.position}`);
        }
        playerNum.char();
        currentSpaceEl = document.getElementById(`square${playerNum.position}`);
        currentSpaceEl.append(playerNum.charModel);
    }
}

// function that updates points
function updatePoints(playerNum) {
    if (currentSpaceEl.classList.contains('blue-space')) {
        playerNum.points += 3;
        gameMessage.textContent = `Player ${playerNum.number} got 3 points!`;
    }
    else if (currentSpaceEl.classList.contains('red-space')) {
        playerNum.points -= 3;
        if (playerNum.points < 0) {
            playerNum.points = 0;
        }
        gameMessage.textContent = `Player ${playerNum.number} lost 3 points!`;
    }
    let pointsEl = document.querySelector(`#player-${playerNum.number}`);
    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points`;
}

// Game start function
function gameStart(playerNum) {
    gameMessage.textContent = `Player ${playerNum.number} is rolling the dice`;
    rollDice();
    // Delay displaying message
    setTimeout(function() {
        gameMessage.textContent = `Player ${playerNum.number} rolled a ${diceNum}`;
        setTimeout(function() {
            movePlayer(playerNum);
            updatePoints(playerNum);
        }, 2000);
    }, 3000);
}

// This is the order in which the players play the game
function playerOrder() {
    // game start runs for 5 seconds!
    gameStart(player1);
    setTimeout(function() {
        gameStart(player2);
    }, 8000);
    // Gives player ability to roll dice again
    setTimeout(function() {
        diceBlockEl.forEach(object => {
            object.classList.add('player-dice-turn');
        });
        startGameEl.classList.add('start');
        gameState();
    }, 14000);
}

function resetGame() {
    player1.points = 0;
    player2.points = 0;
    player1.position = 0;
    player2.position = 0;
    player1.charModel.remove();
    player2.charModel.remove();
}

function gameState() {
    if (player1.points >= 10) {
        gameMessage.textContent ="You Win!";
        resetGame();
    }
    else if (player2.points >= 10) {
        gameMessage.textContent ="You Lose!";
        resetGame();
    } else {
        gameMessage.textContent = `It's your turn to roll the dice`;
    }
}
// Event listeners
document.querySelector("body").addEventListener("click", function(e) {
    e.preventDefault();

    // Selecting dice
    if (e.target.classList.contains('player-dice-turn')) {
        // preventing player from abusing dice functionality
        playerOrder();
        diceBlockEl.forEach(object => {
            object.classList.remove('player-dice-turn');
        });
        startGameEl.classList.remove('start');
    }
    if (e.target.classList.contains('start')) {
        gameMessage.textContent = `Starting new game! Click the dice to start`;
        resetGame();
    }
});