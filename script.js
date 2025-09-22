const startPage = document.getElementById("start-page");
const startBtn = document.getElementById("start-btn");
const moves = document.querySelector(".moves");
const time = document.querySelector(".time");
const catPage = document.querySelector(".category-page");
const CatBtns = document.querySelectorAll(".cat-btn");
const Art = document.querySelector(".art");
const wrapper = document.querySelector(".wrapper");

let move = 0,
  winCount = 0;

let seconds = 60;

let firstCard = false;
let secondCard = false;

let interval;
let cardValues;

const items = [
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
  { name: "", image: "" },
];

startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startPage.classList.add("hide");
  }, 100);
});

const MovesCounter = () => {
  move += 1;
  moves.innerHTML = `<span>Moves</span>:${move}`;
};
const timeLimit = () => {
  seconds -= 1;
  if (seconds <= 0) {
    seconds = 0;
    stopGame();
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  time.innerHTML = `<span>Time</span>:${secondsValue}`;
};

Art.addEventListener("click", () => {
  catPage.classList.add("hide");
  wrapper.classList.remove("hide");
});

/*
<div class="card-container" data-card-value="${cardValues[i].name}">
     <div class="card-before">?</div>
     <div class="card-after">
     <img src="${cardValues[i].image}" class="image"></div>
     </div>
     </div>
  */
