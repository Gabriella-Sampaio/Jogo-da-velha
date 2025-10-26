const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Vez do jogador: ${currentPlayer}`;
    }
}

function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (
        gameState[a] !== "" &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
        ) {
        statusText.textContent = `╰(*°▽°*)╯ Jogador ${gameState[a]} venceu! 🥳🎉🎈`;
        gameActive = false;
        return;
        }
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Deu velha! 😅";
        gameActive = false;
    }
}


function ReiniciaJogo(){
    gameActive = true;
    currentPlayer = "X";
    gameState = Array(9).fill("");

    cells.forEach(cell => (cell.textContent = ""));

    statusText.textContent = "Vez do jogador: X";
}

restartBtn.addEventListener("click", ReiniciaJogo);