const startPage = document.getElementById("start-page");
const result = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const moves = document.querySelector(".moves");
const time = document.querySelector(".time");
const catPage = document.querySelector(".category-page");
const CatBtns = document.querySelectorAll(".cat-btn");
const Art = document.querySelector(".art");
const wrapper = document.querySelector(".wrapper");
const gameContainer = document.querySelector(".games-container");

let cards;
let move = 0,
  winCount = 0;

let seconds = 60;

let firstCard = false;
let secondCard = false;

let interval;

const items = [
  { name: "art1", image: "images/art1.jpg" },
  { name: "art2", image: "images/art2.jpg" },
  { name: "art3", image: "images/art3.jpg" },
  { name: "art4", image: "images/art4.jpg" },
  { name: "art5", image: "images/art5.jpg" },
  { name: "art6", image: "images/art6.jpg" },
  { name: "art7", image: "images/art7.jpg" },
  { name: "art8", image: "images/art8.jpg" },
  { name: "art9", image: "images/art9.jpg" },
  { name: "art10", image: "images/art10.jpg" },
  { name: "art11", image: "images/art11.jpg" },
  { name: "art12", image: "images/art12.jpg" },
];

//pick random cards
const randomCards = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
//shuffle
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
     <div class="card-before">?</div>
     <div class="card-after">
     <img src="${cardValues[i].image}" class="image"></div>
     </div>
     </div>
     `;
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const dingSound2 = new Audio("sounds/ding2.mp3");
        dingSound2.play();
        if (!card.classList.contains("matched")) {
          card.classList.add("flipped");
          if (!firstCard) {
            firstCard = card;
            firstCardValue = card.getAttribute("data-card-value");
          } else {
            MovesCounter();
            secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
              const dingSound = new Audio("sounds/ding1.mp3");
              dingSound.play();

              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              firstCard = false;
              secondCard = false;
              winCount += 1;
              if (winCount == Math.floor(cardValues.length / 2)) {
                const dingSound3 = new Audio("sounds/ding3.mp3");
                dingSound3.play();
                result.innerHTML = `
        <h2>Well Done!</h2>
        <h3>Moves: ${move}</h3>
    `;

                // رفتن به صفحه استارت
                startPage.classList.remove("hide");
                wrapper.classList.add("hide");
                catPage.classList.remove("hide");

                clearInterval(interval);
              }
            } else {
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;

              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 400);
            }
          }
        }
      });
    });
  }
};
startBtn.addEventListener("click", () => {
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.play();
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
    const oops = new Audio("sounds/oops.mp3");
    oops.play();
    result.innerHTML = `
        <h2>Game Over!</h2>
     
    `;

    startPage.classList.remove("hide");
    wrapper.classList.add("hide");
    catPage.classList.remove("hide");
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  time.innerHTML = `<span>Time</span>:${secondsValue}`;
};

Art.addEventListener("click", () => {
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.play();
  Art.addEventListener("click", () => {
    // پاک کردن اینتروال قبلی اگر وجود داشته باشه
    clearInterval(interval);

    // ریست متغیرها
    move = 0;
    winCount = 0;
    seconds = 60;
    moves.innerHTML = `<span>Moves</span>:${move}`;
    time.innerHTML = `<span>Time</span>:${seconds}`;

    // صفحات
    catPage.classList.add("hide");
    wrapper.classList.remove("hide");

    // شروع تایمر
    interval = setInterval(timeLimit, 1000);

    // شروع بازی
    initializer();
  });
});

stopBtn.addEventListener(
  "click",
  (stopGame = () => {
    stopBtn.addEventListener(
      "click",
      (stopGame = () => {
        const clickSound = new Audio("sounds/click.mp3");
        clickSound.play();
        startPage.classList.remove("hide");
        wrapper.classList.add("hide");
        catPage.classList.remove("hide");
        clearInterval(interval);
        seconds = 60;
        time.innerHTML = `<span>Time</span>:${seconds}`;
        move = 0;
        moves.innerHTML = `<span>Moves</span>:${move}`;
      })
    );
  })
);
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = randomCards();
  matrixGenerator(cardValues);
};
