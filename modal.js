chooseFirstPlayerButton.addEventListener('click', openModal);
crossBtn.addEventListener('click', chooseFirstPlayer);
circleBtn.addEventListener('click', chooseFirstPlayer);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function chooseFirstPlayer(e) {
  if (e.target.id === "crossBtn") {
    go = "cross";
  } else if (e.target.id === "circleBtn") {
    go = "circle";
  }
  infoDisplay.textContent = `${go} goes first`;
  gameBoard.innerHTML = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      boardState[row][col] = '';
    }
  }
  createBoard();
  closeModal();
  previousButton.disabled = true;
  nextButton.disabled = true;
}