
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const rulesButton = document.querySelector(".rules-btn");
const closeButton = document.querySelector(".close-btn");
const rulesModal = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameContainer = document.querySelector(".game");
const resultsContainer = document.querySelector(".results");
const resultContainers = document.querySelectorAll(".results__result");

const winnerResult = document.querySelector(".results__winner");
const resultMessage = document.querySelector(".results__text");

const playAgainButton = document.querySelector(".play-again");

const scoreDisplay = document.querySelector(".score__number");
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;

updateScoreDisplay();

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const chosenOption = button.dataset.choice;
    const choice = CHOICES.find((option) => option.name === chosenOption);
    playGame(choice);
  });
});

function playGame(choice) {
  const aiChoice = getAiChoice();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function getAiChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function displayResults(results) {
  resultContainers.forEach((resultContainer, idx) => {
    setTimeout(() => {
      resultContainer.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = checkWinner(results);
    const aiWins = checkWinner(results.reverse());

    if (userWins) {
      resultMessage.innerText = "You win!";
      resultContainers[0].classList.toggle("winner");
      updateScore(1);
    } else if (aiWins) {
      resultMessage.innerText = "You lose!";
      resultContainers[1].classList.toggle("winner");
      updateScore(-1);
    } else {
      resultMessage.innerText = "It's a tie!";
    }
    winnerResult.classList.toggle("hidden");
    resultsContainer.classList.toggle("show-winner");
  }, 1000);
}

function checkWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScore(point) {
  score += point;
  localStorage.setItem("score", score);
  updateScoreDisplay();
}

function updateScoreDisplay() {
  scoreDisplay.innerText = score;
}

// Play Again
playAgainButton.addEventListener("click", () => {
  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");

  resultContainers.forEach((resultContainer) => {
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("winner");
  });

  resultMessage.innerText = "";
  winnerResult.classList.toggle("hidden");
  resultsContainer.classList.toggle("show-winner");
});

// Show/Hide Rules
rulesButton.addEventListener("click", () => {
  rulesModal.classList.toggle("show-modal");
});
closeButton.addEventListener("click", () => {
  rulesModal.classList.toggle("show-modal");
});
