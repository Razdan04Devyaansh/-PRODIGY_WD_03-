let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let restartBtn = document.getElementById('restart');

const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');

function playMoveSound() {
    moveSound.play();
}

function playWinSound() {
    winSound.play();
}

function trackGameState() {
    let xCount = 0;
    let oCount = 0;

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 'X') {
            xCount++;
        } else if (gameBoard[i] === 'O') {
            oCount++;
        }
    }

    return { xCount, oCount };
}

function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        const gameState = trackGameState();
        playMoveSound();

        if (checkWinner()) {
            document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
            playWinSound();
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            document.getElementById('status').innerText = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}
function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;

    // Reset the game board
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = '';
        document.getElementsByClassName('cell')[i].innerText = '';
    }
}
restartBtn.addEventListener('click', restartGame);

