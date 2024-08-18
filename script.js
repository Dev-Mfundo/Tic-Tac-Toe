const gameState = {
    board: Array(9).fill(null),
    isGameActive: false,
    currentPlayer: null,
    players: [],
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
};

function initGame() {
    const player1Name = document.getElementById('player1Name').value || 'Player X';
    const player2Name = document.getElementById('player2Name').value || 'Player O';

    gameState.players = [
        { name: player1Name, symbol: 'X' },
        { name: player2Name, symbol: 'O' }
    ];

    gameState.currentPlayer = gameState.players[0];
    gameState.isGameActive = true;
    gameState.board.fill(null);

    updateGameStatus(`${gameState.currentPlayer.name}'s turn`);
    clearBoardUI();
}

function clearBoardUI() {
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => cell.textContent = '');
}

function handleCellClick(event, index) {
    if (gameState.board[index] !== null || !gameState.isGameActive) {
        return;
    }

    gameState.board[index] = gameState.currentPlayer.symbol;
    event.target.textContent = gameState.currentPlayer.symbol;
    if (checkWinner()) {
        updateGameStatus(`${gameState.currentPlayer.name} wins!`);
        gameState.isGameActive = false;
    } else if (gameState.board.every(cell => cell !== null)) {
        updateGameStatus("It's a tie!");
        gameState.isGameActive = false;
    } else {
        switchPlayer();
        updateGameStatus(`${gameState.currentPlayer.name}'s turn`);
    }
}

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === gameState.players[0] ? gameState.players[1] : gameState.players[0];
}

function checkWinner() {
    return gameState.winningCombinations.some(combination => {
        return combination.every(index => gameState.board[index] === gameState.currentPlayer.symbol);
    });
}

function updateGameStatus(message) {
    const gameStatus = document.getElementById('game-status');
    gameStatus.textContent = message;
}

document.querySelectorAll('[data-cell]').forEach((cell, index) => {
    cell.addEventListener('click', (event) => handleCellClick(event, index));
});

document.getElementById('startButton').addEventListener('click', initGame);

window.onload = initGame;
