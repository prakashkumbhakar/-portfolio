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
  if (gameBoard[index] || checkWinner() || gameBoard.every(Boolean)) return;

  gameBoard[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    if (currentPlayer === 'X') {
      status.textContent = "✅ You WIN! 🎉";
      status.className = "status win-player";
    } else {
      status.textContent = "❌ You LOSE! 🤖 Bot wins!";
      status.className = "status win-bot";
      document.querySelector('.container').classList.add('shake');
    }
    return;
  }

  if (gameBoard.every(Boolean)) {
    status.textContent = "🤝 It's a Draw!";
    status.className = "status draw";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === 'O') {
    setTimeout(bestBotMove, 400);
  }
}


function bestBotMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < gameBoard.length; i++) {
    if (!gameBoard[i]) {
      gameBoard[i] = 'O';
      let score = minimax(gameBoard, 0, false);
      gameBoard[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  makeMove(move);
}

function minimax(boardState, depth, isMaximizing) {
  const winner = getWinner();
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (boardState.every(Boolean)) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) {
        boardState[i] = 'O';
        let eval = minimax(boardState, depth + 1, false);
        boardState[i] = null;
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) {
        boardState[i] = 'X';
        let eval = minimax(boardState, depth + 1, true);
        boardState[i] = null;
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }
}

function getWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

function checkWinner() {
  const winner = getWinner();
  return winner !== null;
}

function resetGame() {
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  status.className = "status"; // 🔁 Reset win/draw styles
  document.querySelector('.container').classList.remove('shake'); // 🧠 Remove bot win shake
  drawBoard();
}

