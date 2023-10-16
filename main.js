const gameBoard = document.querySelector('#game-board'); 
const infoDisplay = document.querySelector('#info'); 
const resetButton = document.querySelector('#reset-button'); 
const chooseFirstPlayerButton = document.querySelector('#choose-first-player-button');
const previousButton = document.getElementById('previous'); 
const nextButton = document.getElementById('next'); 
const modal = document.getElementById('myModal');
const crossBtn = document.getElementById('crossBtn');
const circleBtn = document.getElementById('circleBtn');
resetButton.addEventListener('click', resetGame);
previousButton.addEventListener('click', previousMove);
nextButton.addEventListener('click', nextMove);

const boardState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let go = "circle"; 
let moveHistory = []; 
let currentIndex = -1; 

// Function to create the game board
function createBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('square');
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;
      cellElement.addEventListener('click', addGo);
      gameBoard.appendChild(cellElement);
    }
  }
}

// Function to handle a player's move
function addGo(e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  if (boardState[row][col] === '') {
    if (infoDisplay.textContent.includes('Wins')) {
      return; // Exit the function if there is already a winner
    }
    boardState[row][col] = go;
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    moveHistory.splice(currentIndex + 1, moveHistory.length - currentIndex - 1, JSON.stringify(boardState));
    currentIndex++;
    go = go === "circle" ? "cross" : "circle"; // Toggle the current player
    infoDisplay.textContent = go + "'s turn";
    checkScore();
    e.target.removeEventListener('click', addGo); // Remove click event listener to prevent further moves in this cell
  }
}

// Function to reset the game
function resetGame() {
  gameBoard.innerHTML = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      boardState[row][col] = '';
    }
  }
  previousButton.disabled = true;
  nextButton.disabled = true;
  
  createBoard();
  go = "circle";
  infoDisplay.textContent = "Circle goes first";
  currentIndex = -1; 
  moveHistory = []; 
}

function previousMove() {
  if (currentIndex > 0) {
    currentIndex--;
    const previousBoardState = JSON.parse(moveHistory[currentIndex]);
    updateBoard(previousBoardState);
  }
}

function nextMove() {
  if (currentIndex < moveHistory.length - 1) {
    currentIndex++;
    const nextBoardState = JSON.parse(moveHistory[currentIndex]);
    updateBoard(nextBoardState);
  }
}

function updateBoard(boardState) {
  gameBoard.innerHTML = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('square');
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;
      cellElement.addEventListener('click', addGo);
      if (boardState[row][col] === 'circle' || boardState[row][col] === 'cross') {
        const goDisplay = document.createElement('div');
        goDisplay.classList.add(boardState[row][col]);
        cellElement.append(goDisplay);
        cellElement.removeEventListener('click', addGo);
      }
      gameBoard.appendChild(cellElement);
    }
  }
}

createBoard();