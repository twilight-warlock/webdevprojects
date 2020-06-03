const figureParts = document.querySelectorAll(".figure-part");
const playAgain = document.querySelector("#play-again");
const wordEl = document.querySelector("#word");
const wrong = document.querySelector("#incorrect");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

const words = [
  "application",
  "programming",
  "react",
  "angular",
  "flutter",
  "javascript",
  "nodejs",
  "express",
  "mongodb",
];
var count = 0;
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// --------Functions----------

// To Display the Randomly Generated Word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}</span>
             `
      )
      .join("")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You have Won!";
    popup.style.display = "flex";
    // popup.style.opacity = "1";
  }
}

// Printing wrong Letters
function concatenator() {
  var s = "";
  for (var i = 0; i < wrongLetters.length; i++) {
    s = `${s + wrongLetters[i]},`;
  }
  return s;
}

// Displaying Incorrect Letters
function displayIncorrect() {
  var s = concatenator();
  wrong.innerHTML = `<p>Wrong</p>
    <span>${s}</span>`;

  if (count < 5) {
    figureParts[count].style.display = "block";
    figureParts[count].style.opacity = "1";
    count += 1;
  } else if (count === 5) {
    figureParts[count].style.display = "block";
    setTimeout(() => {
      finalMessage.innerText = "Oops! You have Lost!";
      popup.style.display = "flex";
    }, 1000);
  }
}

// Show Repeated Letter Message
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Resetting Game on Play Again button click
function reset() {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  wrong.innerHTML = "";
  figureParts.forEach((part, index) => {
    part.style.display = "none";
  });
  displayWord();
  count = 0;
  popup.style.display = "none";
}

displayWord();

// -------------------------------Event Listeners---------------------------------
playAgain.addEventListener("click", reset);

// Check Key Down Press Anywhere on window
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // console.log(e.key);
    if (selectedWord.includes(e.key)) {
      if (!correctLetters.includes(e.key)) {
        correctLetters.push(e.key);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(e.key)) {
        wrongLetters.push(e.key);
        displayIncorrect();
      } else {
        showNotification();
      }
    }
  }
});

// ----------------Accessories-------------

// 1] Random user generator
// for (var i = 0; i < 10; i++) {
//   var randomWord = fetch("https://randomuser.me/api")
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.results[0].name.first);
//     });
// }

// 2]Bad Try

// for (var i = 0; i < selectedWord.length; i++) {
//     // console.log(String(selectedWord).charAt(i));
//     addElement(selectedWord.charAt(i));
//   }
//
// function addElement(e) {
//     const elm = document.createElement("div");
//     elm.classList.add("letter");
//     elm.innerHTML = `${e}`;
//     wordEl.appendChild(elm);
//
