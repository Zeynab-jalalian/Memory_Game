const startPage = document.getElementById("start-page");
const startBtn = document.getElementById("start-btn");
const moves = document.querySelector(".moves");
const time = document.querySelector(".time");

let move = 0,
  winCount = 0;

let seconds = 60;

let firstCard = false;
let secondCard = false;

startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startPage.style.display = "none";
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

