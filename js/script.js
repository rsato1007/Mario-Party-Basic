let welcomeScreen = document.createElement("div")
let startEl = document.querySelector("#start");
let startGameEl = document.getElementById("game-start"); 
let gameMessage = document.getElementById(`game-message`);
let pointsEl;
// let currentSpaceEl;
let starSpaceEl;
let starSpacePosition;
let starSpacePreviousPosition;

/* This object contains all dice variables and methods */
let dice = {
    blockEl: document.querySelectorAll('.player-dice-turn'),
    number: null,
    increaseNum: false,
    // function that rolls the dice
    roll: function() {
        this.number = Math.floor(Math.random() * (7 - 1) + 1);
        if (this.increaseNum === true) {
            this.number += 3;
        };
    },
};

/* This object tracks player movement and provides alternate route options */
let playerMovement = {
    currentSpaceEl: null,
    // Tracks where the player is on the board
    moveModel: function(playerNum, swap) {
        // Moves character models if they are to be swapped
        if (swap === true) {
            // Maybe turn into function!
            player1.char();
            this.append(player1.position, player1.charModel);
            player2.char();
            this.append(player2.position, player2.charModel);
        }
        // Reviews every step the player and updates as it goes along
        else {
            for (i = 0; i < dice.number; i++) {
                // test using setTimeout to make player movement more dynamic.
                // player movement
                if (playerNum.position === 0 || (playerNum.position % 7 === 1) && (playerNum.position === 1)) {
                    playerNum.position += 1;
                }
                // if players have two or more route options
                else if (playerNum.position === 4) {
                    // computer randomly chooses a path
                    if (playerNum.number === 2) {
                        let pathChoice = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                        if (pathChoice === 1) {
                            playerNum.position = 5;
                        }
                        else {
                            playerNum.position = 11;
                        }
                    }
                    // calls function that player window for route option
                    else {
                        this.optionWindow(playerNum);
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
                // checking if space is star space
                if (playerNum.position === starSpacePosition) {
                    playerOnStarSpace(playerNum);
                }
                playerNum.char();
                this.append(playerNum.position, playerNum.charModel);
            }
        }
    },
    // gives window option when player has two or more routes to choose from
    optionWindow: function(playerNum) {
        let option = window.prompt('right or down?');
        if (option === "right" || option === "Right" || option === "r" || option === "R") {
            playerNum.position = 5;
        }
        else if (option === "down" || option === "Down" || option === "d" || option === "D") {
            playerNum.position = 11;
        }
        else {
            alert("invalid response");
            branchWindowOption(playerNum);
        }
        return;
    },
    // Adds character model to board
    append: function(position, model) {
        this.currentSpaceEl = document.getElementById(`square${position}`);
        this.currentSpaceEl.append(model);
    },
};

// Creating splash screen:
let welcomeEl = document.querySelector("#welcome");
let backgroundEl = document.querySelector(".hidden-background");

// Incorporating responsive design:
const maxWidth1000 = window.matchMedia("(max-width: 1000px)");

// Player objects
const player1 = {
    number: 1,
    points: 0,
    stars: 0,
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
    stars: 0,
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

// function that updates points
function updatePoints(playerNum) {
    if (playerMovement.currentSpaceEl.classList.contains('blue-space')) {
        gameMessage.textContent = `Player ${playerNum.number} got 3 points!`;
        time = 1000;
        for (let i = 1; i < 4; i++) {
            setTimeout(function() {
                playerNum.points += 1; 
                pointsEl = document.querySelector(`#player-${playerNum.number}`);
                pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                ${playerNum.stars} stars`
            }, time);
            time += 500;
        }
    }
    else if (playerMovement.currentSpaceEl.classList.contains('red-space')) {
        gameMessage.textContent = `Player ${playerNum.number} lost 3 points!`;
        time = 1000;
        for (let i = 1; i < 4; i++) {
            setTimeout(function() {
                playerNum.points -= 1; 
                if (playerNum.points < 0) {
                    playerNum.points = 0;
                }
                pointsEl = document.querySelector(`#player-${playerNum.number}`);
                pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                ${playerNum.stars} stars`
            }, time);
            time += 500;
        }
    }
    else if (playerMovement.currentSpaceEl.classList.contains('green-space')) {
        const eventChoiceNum = Math.floor(Math.random() * (60 - 1 + 1) + 1);
        // 10 Coins
        if(eventChoiceNum >= 1 && eventChoiceNum <= 20) {
            gameMessage.textContent = `Player ${playerNum.number} gets 10 points!`;
            time = 100;
            for (let i = 1; i < 11; i++) {
                setTimeout(function() {
                    playerNum.points += 1; 
                    pointsEl = document.querySelector(`#player-${playerNum.number}`);
                    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                    ${playerNum.stars} stars`
                }, time);
                time += 100;
            }
        }
        // Minus 10 Coins
        else if(eventChoiceNum > 20 && eventChoiceNum <= 40) {
            gameMessage.textContent = `Player ${playerNum.number} loses 10 points!`;
            time = 100;
            for (let i = 1; i < 11; i++) {
                setTimeout(function() {
                    playerNum.points -= 1; 
                    if (playerNum.points < 0) {
                        playerNum.points = 0;
                    }
                    pointsEl = document.querySelector(`#player-${playerNum.number}`);
                    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                    ${playerNum.stars} stars`
                }, time);
                time += 100;
            }
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
                playerMovement.moveModel(playerNum, true);
            }, 1500)
        }
    }
    pointsEl = document.querySelector(`#player-${playerNum.number}`);
    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
    ${playerNum.stars} stars`
}

// Game start function
/*INCLUDES setTimeout function*/
function gameStart(playerNum) {
    gameMessage.textContent = `Player ${playerNum.number} is rolling the dice`;
    dice.roll();
    // Delay displaying message
    setTimeout(function() {
        gameMessage.textContent = `Player ${playerNum.number} rolled a ${dice.number}`;
        setTimeout(function() {
            playerMovement.moveModel(playerNum, false);
            setTimeout(function() {
                updatePoints(playerNum);
            }, 2500);
        }, 3000);
    }, 3000);
}

// This is the order in which the players play the game
function playerOrder() {
    // game start runs for 10 seconds!
    const time = 15000
    gameStart(player1);
    setTimeout(function() {
        gameStart(player2);
    }, time);
    // Gives player ability to roll dice again
    setTimeout(function() {
        dice.blockEl.forEach(object => {
            object.classList.add('player-dice-turn');
        });
        startGameEl.classList.add('start');
        gameState();
    }, time * 1.7);
}

function resetGame() {
    player1.points = 0;
    player2.points = 0;
    player1.stars = 0;
    player2.stars = 0;
    player1.position = 0;
    player2.position = 0;
    player1.charModel.remove();
    player2.charModel.remove();
    // Update screen
    pointsEl = document.querySelector(`#player-1`);
    pointsEl.textContent = `Player 1: ${player1.points} points`;
    pointsEl = document.querySelector(`#player-2`);
    pointsEl.textContent = `Player 2: ${player2.points} points`;
    // update star space
    starSpaceGenerate();
}

function gameState() {
    if (player1.stars >= 2) {
        gameMessage.textContent ="You Win!";
        resetGame();
    }
    else if (player2.stars >= 2) {
        gameMessage.textContent ="You Lose!";
        resetGame();
    } else {
        setTimeout(function() {
            gameMessage.textContent = `It's your turn to roll the dice`;
        }, 2000);
    }
}
// Function for star spaces
function playerOnStarSpace(playerNum) {
    timeoutTime = 50;
    // Looks for whether this is the computer or player
    if (playerNum.number === 1) {
        // Has enough points
        if (playerNum.points >= 20) {
            let option = window.prompt("Would you like to buy a star? Y or N?");
            if (option === null) {
                option = window.prompt("Hitting cancel is treated as no, are you sure?");
                if (option === "y" || option === "Y") {
                    for (let i = 1; i < 21; i++) {
                        setTimeout(function() {
                            playerNum.points -= 1; 
                            pointsEl = document.querySelector(`#player-${playerNum.number}`);
                            pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                            ${playerNum.stars} stars`
                        }, timeoutTime);
                        timeoutTime += 50;
                    }
                    gameMessage.textContent = `Player ${playerNum.number} got a star!`;
                    playerNum.stars += 1;
                    pointsEl = document.querySelector(`#player-${playerNum.number}`);
                    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                    ${playerNum.stars} stars`
                    starSpaceGenerate();
                }
                else if(option === "n" || option === "N") {
                    gameMessage.textContent = `Player ${playerNum.number}..... declined a star...`;
                }
            }
            else if (option === "y" || option === "Y") {
                for (let i = 1; i < 21; i++) {
                    setTimeout(function() {
                        playerNum.points -= 1; 
                        pointsEl = document.querySelector(`#player-${playerNum.number}`);
                        pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                        ${playerNum.stars} stars`;
                    }, timeoutTime);
                    timeoutTime += 50;
                }
                gameMessage.textContent = `Player ${playerNum.number} got a star!`;
                playerNum.stars += 1;
                pointsEl = document.querySelector(`#player-${playerNum.number}`);
                pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                ${playerNum.stars} stars`;
                starSpaceGenerate();
            }
            else if(option === "n" || option === "N") {
                gameMessage.textContent = `Player ${playerNum.number}..... declined a star...`;
            }
            else {
            }
        }
        // Not enough points
        else if (playerNum.points < 20) {
            gameMessage.textContent = `Not enough points for a star!`;
        }
    }
    else if (playerNum.number === 2) {
        if (playerNum.points >= 20) {
            for (let i = 1; i < 21; i++) {
                setTimeout(function() {
                    playerNum.points -= 1; 
                    pointsEl = document.querySelector(`#player-${playerNum.number}`);
                    pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
                    ${playerNum.stars} stars`
                }, timeoutTime);
                timeoutTime += 50;
            }
            gameMessage.textContent = `Player ${playerNum.number} got a star!`;
            playerNum.stars += 1;
            pointsEl = document.querySelector(`#player-${playerNum.number}`);
            pointsEl.textContent = `Player ${playerNum.number}: ${playerNum.points} points,
            ${playerNum.stars} stars`
            starSpaceGenerate();
        }
        else if (playerNum.points < 20) {
            gameMessage.textContent = `Not enough points for a star!`;
        }
    }
}

// Generates star space for new game and when a star is bought
function starSpaceGenerate() {
    const starSpaceChoices = [8, 14, 18, 22, 25, 35, 36, 42, 43, 45, 46, 47, 49];
    let chooseSpace = Math.floor(Math.random() * starSpaceChoices.length);
    // This ensures the we don't end up on the same star space as before.
    if (chooseSpace === starSpacePreviousPosition) {
        chooseSpace = Math.floor(Math.random() * starSpaceChoices.length);
    }
    // Removing old star space if it exists.
    if (starSpaceEl !== undefined) {
        starSpaceEl.classList.remove('star-space');
        starSpaceEl.classList.add('blue-space');
    }
    // Adding star space
    starSpaceEl = document.getElementById(`square${starSpaceChoices[chooseSpace]}`);
    starSpaceEl.classList.remove('blue-space');
    starSpaceEl.classList.add('star-space');
    starSpacePosition = starSpaceChoices[chooseSpace];
    starSpacePreviousPosition = starSpaceChoices[chooseSpace];
}

// Developer mode for testing
function testerMode(diceNumMode = false, points = 0, stars = 0) {
    player1.points = points;
    player1.stars = stars;
    dice.increaseNum = diceNumMode;
}

// Event listeners
document.querySelector("body").addEventListener("click", function(e) {
    e.preventDefault();

    // Selecting dice
    if (e.target.classList.contains('player-dice-turn')) {
        // preventing player from abusing dice functionality
        playerOrder();
        dice.blockEl.forEach(object => {
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

starSpaceGenerate();