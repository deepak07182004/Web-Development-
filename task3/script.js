const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-btn');
let currentPlayer = 'X';
let gameActive = true;
const boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (!gameActive || boardState[cellIndex] !== '') return;

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
    } else {
    
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState.fill('');
    gameStatus.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleCellClick); 
        cell.addEventListener('click', handleCellClick, { once: true }); 
    });
}
