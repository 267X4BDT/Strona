const boardElement = document.getElementById('game-board');
const messageElement = document.getElementById('message');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    renderBoard();
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[a] !== board[b] || board[a] !== board[c]) continue;
        roundWon = true;
        break;
    }

    if (roundWon) {
        messageElement.innerHTML = `<span style="font-size:24px;">Gracz ${currentPlayer} wygrywa!</span>`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.innerHTML = '<span style="font-size:24px;">Remis!</span>';
        gameActive = false;
        return;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.innerText = '';
    renderBoard();
}

renderBoard();

