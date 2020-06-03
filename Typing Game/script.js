const settingsBtn = document.getElementById("settings-btn"),
  settings = document.getElementById("settings"),
  gameMode = document.getElementById("game-mode"),
  container = document.querySelector(".container"),
  word = document.getElementById("word"),
  text = document.getElementById("text"),
  timeEl = document.getElementById("time"),
  scoreEL = document.getElementById("score"),
  gameOverEl = document.getElementById("game-over-container"),
  settingsForm = document.getElementById("settings-form");

const words = [
  "son",
  "drawer",
  "security",
  "enthusiasm",
  "surgery",
  "marketing",
  "assignment",
  "debt",
  "insect",
  "guest",
  "variation",
  "dad",
  "proposal",
  "editor",
  "singer",
  "database",
  "category",
  "maintenance",
  "republic",
  "bread",
  "soup",
  "idea",
  "recommendation",
  "advertising",
  "youth",
  "director",
  "contribution",
  "customer",
  "assumption",
  "fishing",
  "president",
  "importance",
  "presence",
  "army",
  "reality",
  "role",
  "courage",
  "region",
  "movie",
  "shopping",
  "homework",
  "member",
  "newspaper",
  "expression",
  "chocolate",
  "method",
  "weakness",
  "disk",
  "wealth",
  "department",
];

let randomWord,
  score = 0,
  time = 10;

// set difficulty value in localStorage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set display difficulty value
gameMode.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//   To Focus cursor on Text
text.focus();

// Time counting down
const timeCalculator = setInterval(updateTime, 1000);

//   --------------------------Functions--------------------------

// Generating random name
function generateRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

// Adding Word to DOM
function updateDOM() {
  randomWord = generateRandom();
  word.innerText = randomWord;
}

// Updating The Score Value
function updateScore() {
  score++;
  scoreEL.innerText = score;
}

// Checking Correct Word
function checkCorrectWord(e) {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    updateDOM();
    updateScore();
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else if (difficulty === "hard") {
      time += 2;
    }
    text.value = "";
  }
}

// Updating Time every Second
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeCalculator);
    gameOver();
  }
}

// Game Ends and Display replay Screen
function gameOver() {
  gameOverEl.innerHTML = `<h1>Time ran out</h1>
<p>Your final score is : ${score}</p>
<button onclick="window.location.reload()">Play Again</button>`;
  gameOverEl.style.display = "flex";
}

// Scroll The settings on click
function scrollSetting() {
  settings.classList.toggle("hide");
}

// --------------------------Event Listeners--------------------------

// checking word input
text.addEventListener("input", checkCorrectWord);

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  window.location.reload();
});

// Settings Scroller
settingsBtn.addEventListener("click", scrollSetting);

updateDOM();
