// The code below appends to an element

// let node = document.createElement('span');
// node.style.height = "50px";
// node.style.width = "25px";
// node.style.display = "inline-block";
// node.style.backgroundColor = "#FFA500";
// node.textContent = '';
let startEl = document.querySelector("#start");

// let node2 = document.createElement('span');
// node2.style.height = "50px";
// node2.style.width = "25px";
// node2.style.display = "inline-block";
// node2.style.backgroundColor = "#FFA500";
// node2.textContent = '';
// // let startEl = document.querySelector("#start");
// startEl.append(node2);

// Pseudo code
let diceNum;
let movesNum;

// Player objects
const player1 = {
    points: 0,
    position: 0,
}

const player2 = {
    path: 0,
    points: 0,
    position: 0,
    charModel: document.createElement('span'),
    currentSpaceEl: "",
    // creates character on board
    char() {
        this.charModel.style.height = "40px";
        this.charModel.style.width = "20px";
        this.charModel.style.display = "inline-block";
        this.charModel.style.backgroundColor = "#FFA500";
        this.charModel.textContent = '';
    },
    playerTurn() {

    },
    movePlayer() {
        for (i = 0; i < diceNum; i++) {
            if (player2.position === 0) {
                player2.position += 1;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
            else if (player2.position === 49) {
                player2.position -= 1;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
            else if (player2.position === 43) {
                player2.position -= 7;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
            else if (player2.position === 44 || player2.position === 45 || player2.position === 46 || player2.position === 47 || player2.position === 48) {
                player2.position -= 1;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
            else if (player2.position % 7 === 0) {
                player2.position += 7;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            } 
            else if ((player2.position % 7 === 1) && (player2.position === 1)) {
                player2.position += 1;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
            else if (player2.position % 7 === 1) {
                player2.position -= 7;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            } 
            else {
                player2.position += 1;
                console.log(`You moved 1 space and are at position: ${this.position}`);
            }
        }
        player2.char();
        currentSpaceEl = document.getElementById(`square${this.position}`);
        currentSpaceEl.append(this.charModel);
        this.updatePoints();
    },
    updatePoints() {
        if (currentSpaceEl.classList.contains('blue-space')) {
            player2.points += 3;
        }
    }
}

// Dice Roll function
function rollDice() {
    diceNum = Math.floor(Math.random() * (7 - 1) + 1);
    console.log(`You rolled a ${diceNum}`);
}

// testing ground
rollDice();
player2.movePlayer();

for (let i = 0; i < 6; i++) {
    rollDice();
    player2.movePlayer(); 
}