const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

function drawBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell || '';
    div.onclick = () => makeMove(index);
    board.appendChild(div);
  });
}

function makeMove(index) {
  if (gameBoard[index] || checkWinner()) return;
  gameBoard[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
  } else if (gameBoard.every(Boolean)) {
    status.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    if (currentPlayer === 'O') {
      setTimeout(botMove, 500); // Bot waits 0.5 sec
    }
  }
}

function botMove() {
  const emptyCells = gameBoard.map((v, i) => (v === null ? i : null)).filter(i => i !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => gameBoard[i] === currentPlayer)
  );
}

function resetGame() {
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  drawBoard();
}

drawBoard();
