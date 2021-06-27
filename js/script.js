let welcomeScreen = document.createElement("div")
let startEl = document.querySelector("#start");
let startGameEl = document.getElementById("game-start"); 
let gameMessage = document.getElementById(`game-message`);
let diceBlockEl = document.querySelectorAll('.player-dice-turn');
let currentSpaceEl;
let diceNum;
let movesNum;

// Creating splash screen:
let welcomeEl = document.querySelector("#welcome");
let backgroundEl = document.querySelector(".hidden-background");

// Incorporating responsive design:
const maxWidth1000 = window.matchMedia("(max-width: 1000px");

// Player objects
const player1 = {
    number: 1,
    points: 0,
    position: 0,
    charModel: document.createElement('span'),
    char() {
        if (maxWidth1000.matches) {
            this.charModel.style.height = "28px";
            this.charModel.style.width = "14px";
            this.charModel.style.display = "inline-block";
            this.charModel.style.backgroundColor = "#FFA500";
            this.charModel.textContent = '';
            this.charModel.classList.add = "pEl";
        }
        else {
            this.charModel.style.height = "40px";
            this.charModel.style.width = "20px";
            this.charModel.style.display = "inline-block";
            this.charModel.style.backgroundColor = "#FFA500";
            this.charModel.textContent = '';
            this.charModel.classList.add = "pEl";
        }
    },
}

const player2 = {
    number: 2,
    points: 0,
    position: 0,
    charModel: document.createElement('span'),
    // creates character on board
    char() {
        if (maxWidth1000.matches) {
            this.charModel.style.height = "28px";
            this.charModel.style.width = "14px";
            this.charModel.style.display = "inline-block";
            this.charModel.style.backgroundColor = "#FFDF00";
            this.charModel.textContent = '';
            this.charModel.classList.add = "pEl";
        }
        else {
            this.charModel.style.height = "40px";
            this.charModel.style.width = "20px";
            this.charModel.style.display = "inline-block";
            this.charModel.style.backgroundColor = "#FFDF00";
            this.charModel.textContent = '';
            this.charModel.classList.add = "pEl";
        }
    },
    playerTurn() {

    },
}

// Dice Roll function
function rollDice() {
    diceNum = Math.floor(Math.random() * (7 - 1) + 1);
}

// Function that moves player around on board
function movePlayer(playerNum, swap) {
    if (swap === true) {
        player1.char();
        currentSpaceEl = document.getElementById(`square${player1.position}`);
        currentSpaceEl.append(player1.charModel);
        player2.char();
        currentSpaceEl = document.getElementById(`square${player2.position}`);
        currentSpaceEl.append(player2.charModel);
    }
    else {
        for (i = 0; i < diceNum; i++) {
            if (playerNum.position === 0 || (playerNum.position % 7 === 1) && (playerNum.position === 1)) {
                playerNum.position += 1;
            }
            else if (playerNum.position === 4) {
                if (playerNum.number === 2) {
                    let pathChoice = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                    if (pathChoice === 1) {
                        playerNum.position = 5;
                    }
                    else {
                        playerNum.position = 11;
                    }
                }
                else {
                    let option = window.prompt('right or down?');
                    if (option === "right" || option === "Right" || option === "r" || option === "R") {
                        playerNum.position = 5;
                    }
                    else {
                        playerNum.position = 11;
                    }
                }
            }
            else if (playerNum.position === 44 || playerNum.position === 45 || playerNum.position === 46 || playerNum.position === 47 || playerNum.position === 48 || playerNum.position === 49) {
                playerNum.position -= 1;
            }
            else if (playerNum.position === 43 || playerNum.position % 7 === 1) {
                playerNum.position -= 7;
            }
            else if (playerNum.position % 7 === 0 || playerNum.position % 7 === 4) {
                playerNum.position += 7;
            } 
            else {
                playerNum.position += 1;
            }
            playerNum.char();
            currentSpaceEl = document.getElementById(`square${playerNum.position}`);
            currentSpaceEl.append(playerNum.charModel);
        }
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
    else if (currentSpaceEl.classList.contains('green-space')) {
        const eventChoiceNum = Math.floor(Math.random() * (60 - 1 + 1) + 1);
        // 10 Coins
        if(eventChoiceNum >= 1 && eventChoiceNum <= 20) {
            playerNum.points += 10;
            gameMessage.textContent = `Player ${playerNum.number} gets 10 points!`;
        }
        // Minus 10 Coins
        else if(eventChoiceNum > 20 && eventChoiceNum <= 40) {
            playerNum.points -= 10;
            if (playerNum.points < 0) {
                playerNum.points = 0;
            }
            gameMessage.textContent = `Player ${playerNum.number} loses 10 points!`;
        }
        // Swap places
        else if(eventChoiceNum > 40) {
            const p1Position = player1.position;
            const p2Position = player2.position;
            player1.position = p2Position;
            player2.position = p1Position;
            diceNum = 1;
            gameMessage.textContent = `The players are swapping places!`;
            setTimeout(function() {
                movePlayer(playerNum, true);
            }, 1500)
        }
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
            movePlayer(playerNum, false);
            updatePoints(playerNum);
        }, 3000);
    }, 3000);
}

// This is the order in which the players play the game
function playerOrder() {
    // game start runs for 5 seconds!
    gameStart(player1);
    setTimeout(function() {
        gameStart(player2);
    }, 10000);
    // Gives player ability to roll dice again
    setTimeout(function() {
        diceBlockEl.forEach(object => {
            object.classList.add('player-dice-turn');
        });
        startGameEl.classList.add('start');
        gameState();
    }, 16000);
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
    if (player1.points >= 20) {
        gameMessage.textContent ="You Win!";
        resetGame();
    }
    else if (player2.points >= 20) {
        gameMessage.textContent ="You Lose!";
        resetGame();
    } else {
        setTimeout(function() {
            gameMessage.textContent = `It's your turn to roll the dice`;
        }, 2000)
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

    // When user selects start a game/reset game
    if (e.target.classList.contains('start')) {
        gameMessage.textContent = `Starting new game! Click the dice to start`;
        startGameEl.textContent = `Reset Game`;
        resetGame();
    }

    // Closing welcome screen
    if (e.target.classList.contains('welcome-button')) {
        welcomeEl.classList.remove("welcome-page");
        welcomeEl.textContent = '';
        backgroundEl.classList.remove("hidden-background");
    }
});