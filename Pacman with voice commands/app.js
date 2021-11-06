
var alanBtnInstance = alanBtn({
    key: "c3927d2b4ac02e4d3fc4206e97124c2b2e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: function (commandData) {
        if (commandData.command === "go-left") {
            goLeft();
        }
        if (commandData.command === "go-right") {
            goRight();
        }
        if (commandData.command === "go-up") {
            goUp();
        }
        if (commandData.command === "go-down") {
            goDown();
        }
        if (commandData.command === "start-game") {
            startGame();
        }
    },
    rootEl: document.getElementById("alan-btn"),
});

const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const width = 28; // 28*28 784 squares
let score = 0;
let gameOverId;
let checkWinId;
let leftId;
let rightId;
let upId;
let downId;

// Layout of the grid which is in the square
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

// Legend
// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pallet
// 4 - empty

const squares = [];
console.log(layout.length);
// Draw the grid and render it
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        // Add layout to the board
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        }
        else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        }
        else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        }
        else if (layout[i] === 3) {
            squares[i].classList.add('power-pallet');
        }
    }
}
createBoard();

function startGame() {
    // Move the ghosts ranomly
    ghosts.forEach(ghost => moveGhost(ghost));
    document.addEventListener('keyup', movePacman);
    checkWinId = setInterval(checkForWin, 100);
    gameOverId = setInterval(checkGameOver, 100);
}

startButton.addEventListener('click', startGame);

// Starting position of pac man
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pac-man');
squares[pacmanCurrentIndex].classList.add('pac-man-right');

function removePacman() {
    squares[pacmanCurrentIndex].classList.remove('pac-man');
    squares[pacmanCurrentIndex].classList.remove('pac-man-right');
    squares[pacmanCurrentIndex].classList.remove('pac-man-left');
    squares[pacmanCurrentIndex].classList.remove('pac-man-up');
    squares[pacmanCurrentIndex].classList.remove('pac-man-down');
}

function goLeft() {
    clearInterval(rightId);
    clearInterval(upId);
    clearInterval(downId);
    leftId = setInterval(function () {
        if (
            squares[pacmanCurrentIndex - 1].classList.contains('wall') ||
            squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
        ) {
            clearInterval(leftId);
        } else {
            removePacman();
            pacmanCurrentIndex -= 1;
            if (squares[pacmanCurrentIndex - 1] === squares[363]) {
                pacmanCurrentIndex = 391;
            }
            squares[pacmanCurrentIndex].classList.add('pac-man');
            squares[pacmanCurrentIndex].classList.add('pac-man-left');
            pacDotEaten();
            powerpalletEaten();
        }
    }, 500)
}

function goRight() {
    clearInterval(leftId);
    clearInterval(upId);
    clearInterval(downId);
    rightId = setInterval(function () {
        if (
            squares[pacmanCurrentIndex + 1].classList.contains('wall') ||
            squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
        ) {
            clearInterval(rightId);
        } else {
            removePacman();
            pacmanCurrentIndex += 1;
            if (squares[pacmanCurrentIndex + 1] === squares[392]) {
                pacmanCurrentIndex = 364;
            }
            squares[pacmanCurrentIndex].classList.add('pac-man');
            squares[pacmanCurrentIndex].classList.add('pac-man-right');
            pacDotEaten();
            powerpalletEaten();
        }
    }, 500)
}

function goUp() {
    clearInterval(rightId);
    clearInterval(leftId);
    clearInterval(downId);
    upId = setInterval(function () {
        if (
            squares[pacmanCurrentIndex - width].classList.contains('wall') ||
            squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
        ) {
            clearInterval(upId);
        } else {
            removePacman();
            pacmanCurrentIndex -= width;
            squares[pacmanCurrentIndex].classList.add('pac-man');
            squares[pacmanCurrentIndex].classList.add('pac-man-up');
            pacDotEaten();
            powerpalletEaten();
        }
    }, 500)
}

function goDown() {
    clearInterval(rightId);
    clearInterval(upId);
    clearInterval(leftId);
    downId = setInterval(function () {
        if (
            squares[pacmanCurrentIndex + width].classList.contains('wall') ||
            squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
        ) {
            clearInterval(downId);
        } else {
            removePacman();
            pacmanCurrentIndex += width;
            squares[pacmanCurrentIndex].classList.add('pac-man');
            squares[pacmanCurrentIndex].classList.add('pac-man-down');
            pacDotEaten();
            powerpalletEaten();
        }
    }, 500)
}

// Move pac man
function movePacman(e) {
    switch (e.keyCode) {
        case 37:
            goLeft();
            break;
        case 38:
            goUp();
            break;
        case 39:
            goRight();
            break;
        case 40:
            goDown();
            break;
    }
    // pacDotEaten();
    // powerpalletEaten();
}


// What happens when pacman eats a pac-dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
}

// What happens when you eat a power-pallet
function powerpalletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pallet')) {
        score += 10;
        scoreDisplay.innerHTML = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
        squares[pacmanCurrentIndex].classList.remove('power-pallet');
    }
}

// Make the ghosts stop flashing
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

// Create our Ghost Template
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN;
        this.isScared = false;
    }
}

ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
]

// Draw the ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
})


// Write the function to move the ghosts
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
        // If the next square is not a wall and a ghost then ghost can go there
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            // Ghost can go here
            // Remove all ghost related class
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            // Change the currentIndex to the next square
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
        // Else find a new direction to try
        else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        // If the ghosts are currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        // If the ghosts scared and pacman runs into it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            scoreDisplay.innerHTML = score;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
    }, ghost.speed);
}

// Check for a Game Over
function checkGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacman);
        setTimeout(function () {
            alert('Game Over! Your final score is ' + score);
            window.location.reload();
        }, 500);
        clearInterval(gameOverId);
        clearInterval(checkWinId);
    }
}

// Check for win
function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacman);
        setTimeout(function () {
            alert('You Won! Your final score is ' + score);
            window.location.reload();
        }, 500)
        clearInterval(gameOverId);
        clearInterval(checkWinId);
    }
}