// Function to check for a win or draw
function checkScore() {
  const winningCombos = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  let draw = true;
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (boardState[a[0]][a[1]] && boardState[a[0]][a[1]] === boardState[b[0]][b[1]] && boardState[a[0]][a[1]] === boardState[c[0]][c[1]]) {
      infoDisplay.textContent = boardState[a[0]][a[1]] + ' Wins!';
      gameBoard.querySelectorAll('.square').forEach(square => square.removeEventListener('click', addGo));
      draw = false;
      previousButton.disabled = false;
      nextButton.disabled = false;
      return;
    }
  }
  if (draw) {
    const isBoardFull = boardState.every(row => row.every(cell => cell !== ''));
    if (isBoardFull) {
      infoDisplay.textContent = 'It\'s a draw!';
      gameBoard.querySelectorAll('.square').forEach(square => square.removeEventListener('click', addGo));
      previousButton.disabled = false;
      nextButton.disabled = false;
    }
  }
}