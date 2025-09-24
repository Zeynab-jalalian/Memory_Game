const startPage = document.getElementById("start-page");
const result = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const moves = document.querySelector(".moves");
const time = document.querySelector(".time");
const catPage = document.querySelector(".category-page");
const Art = document.querySelector(".art");
const show = document.querySelector(".show");
const places = document.querySelector(".places");
const animals = document.querySelector(".animals");
const wrapper = document.querySelector(".wrapper");
const gameContainer = document.querySelector(".games-container");

let cards;
let move = 0,
  winCount = 0;

let seconds = 60;

let firstCard = false;
let secondCard = false;
let firstCardValue = "";
let secondCardValue = "";

let interval;
let currentItems = [];

// Art items
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

// Film items
const items2 = [
  { name: "film1", image: "images/film1.jpg" },
  { name: "film2", image: "images/film2.jpg" },
  { name: "film3", image: "images/film3.jpg" },
  { name: "film4", image: "images/film4.jpg" },
  { name: "film5", image: "images/film5.jpg" },
  { name: "film6", image: "images/film6.jpg" },
  { name: "film7", image: "images/film7.jpg" },
  { name: "film8", image: "images/film8.jpg" },
  { name: "film9", image: "images/film9.jpg" },
  { name: "film10", image: "images/film10.jpg" },
  { name: "film11", image: "images/film11.jpg" },
  { name: "film12", image: "images/film12.jpg" },
  { name: "film13", image: "images/film13.jpg" },
  { name: "film14", image: "images/film14.jpg" },
  { name: "film15", image: "images/film15.jpg" },
  { name: "film16", image: "images/film16.jpg" },
  { name: "film17", image: "images/film17.jpg" },
  { name: "film18", image: "images/film18.jpg" },
  { name: "film19", image: "images/film19.jpg" },
  { name: "film20", image: "images/film20.jpg" },
  { name: "film21", image: "images/film21.jpg" },
  { name: "film22", image: "images/film22.jpg" },
  { name: "film23", image: "images/film23.jpg" },
  { name: "film24", image: "images/film24.jpg" },
  { name: "film25", image: "images/film25.jpg" },
  { name: "film26", image: "images/film26.jpg" },
  { name: "film27", image: "images/film27.jpg" },
  { name: "film28", image: "images/film28.jpg" },
  { name: "film29", image: "images/film29.jpg" },
  { name: "film30", image: "images/film30.jpg" },
];


// animals
const items3 = [
  { name: "animal1", image: "images/animal1.jpg" },
  { name: "animal2", image: "images/animal2.jpg" },
  { name: "animal3", image: "images/animal3.jpg" },
  { name: "animal4", image: "images/animal4.jpg" },
  { name: "animal5", image: "images/animal5.jpg" },
  { name: "animal6", image: "images/animal6.jpg" },
  { name: "animal7", image: "images/animal7.jpg" },
  { name: "animal8", image: "images/animal8.jpg" },
  { name: "animal9", image: "images/animal9.jpg" },
  { name: "animal10", image: "images/animal10.jpg" },
  { name: "animal11", image: "images/animal11.jpg" },
  { name: "animal12", image: "images/animal12.jpg" },
  { name: "animal13", image: "images/animal13.jpg" },
  { name: "animal14", image: "images/animal14.jpg" },
  { name: "animal15", image: "images/animal15.jpg" },
  { name: "animal16", image: "images/animal16.jpg" },
  { name: "animal17", image: "images/animal17.jpg" },
  { name: "animal18", image: "images/animal18.jpg" },
  { name: "animal19", image: "images/animal19.jpg" },
  { name: "animal20", image: "images/animal20.jpg" },
  { name: "animal21", image: "images/animal21.jpg" },
  { name: "animal22", image: "images/animal22.jpg" },
  { name: "animal23", image: "images/animal23.jpg" },
  { name: "animal24", image: "images/animal24.jpg" },
  { name: "animal25", image: "images/animal25.jpg" },
  { name: "animal26", image: "images/animal26.jpg" },
  { name: "animal27", image: "images/animal27.jpg" },
  { name: "animal28", image: "images/animal28.jpg" },
  { name: "animal29", image: "images/animal29.jpg" },
  { name: "animal30", image: "images/animal30.jpg" },
];


// places
const items4 = [
  { name: "place1", image: "images/place1.jpg" },
  { name: "place2", image: "images/place2.jpg" },
  { name: "place3", image: "images/place3.jpg" },
  { name: "place4", image: "images/place4.jpg" },
  { name: "place5", image: "images/place5.jpg" },
  { name: "place6", image: "images/place6.jpg" },
  { name: "place7", image: "images/place7.jpg" },
  { name: "place8", image: "images/place8.jpg" },
  { name: "place9", image: "images/place9.jpg" },
  { name: "place10", image: "images/place10.jpg" },
  { name: "place11", image: "images/place11.jpg" },
  { name: "place12", image: "images/place12.jpg" },
];

// Pick random cards
const randomCards = (size = 4) => {
  let tempArray = [...currentItems];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    let randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

// Shuffle & create game board
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);

  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image">
        </div>
      </div>
    `;
  }

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
          if (card === firstCard) {
            return;
          }
          MovesCounter();
          secondCard = card;
          secondCardValue = card.getAttribute("data-card-value");

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

              startPage.classList.remove("hide");
              wrapper.classList.add("hide");
              catPage.classList.remove("hide");
              clearInterval(interval);
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 400);
          }
        }
      }
    });
  });
};

// Start Button
startBtn.addEventListener("click", () => {
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.play();
  startPage.classList.add("hide");
  catPage.classList.remove("hide");
});

// Start game function
function startGame(itemsArray) {
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.play();

  clearInterval(interval);
  currentItems = itemsArray;
  move = 0;
  winCount = 0;
  seconds = 60;
  moves.innerHTML = `<span>Moves</span>:${move}`;
  time.innerHTML = `<span>Time</span>:${seconds}`;
  result.innerText = "";

  catPage.classList.add("hide");
  wrapper.classList.remove("hide");

  interval = setInterval(timeLimit, 1000);
  initializer();
}

// Category buttons
Art.addEventListener("click", () => {
  startGame(items);
});

show.addEventListener("click", () => {
  startGame(items2);
});

animals.addEventListener("click", () => {
  startGame(items3);
});

places.addEventListener("click", () => {
  startGame(items4);
});

// Stop game
function stopGame() {
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.play();

  startPage.classList.remove("hide");
  wrapper.classList.add("hide");
  catPage.classList.remove("hide");

  clearInterval(interval);
  seconds = 60;
  time.innerHTML = `<span>Time</span>: ${seconds}`;
  move = 0;
  moves.innerHTML = `<span>Moves</span>: ${move}`;
}

stopBtn.addEventListener("click", stopGame);

// Moves counter
const MovesCounter = () => {
  move += 1;
  moves.innerHTML = `<span>Moves</span>:${move}`;
};

// Timer
const timeLimit = () => {
  seconds -= 1;
  if (seconds <= 0) {
    seconds = 0;
    stopGame();
    const oops = new Audio("sounds/oops.mp3");
    oops.play();
    result.innerHTML = `<h2>Game Over!</h2>`;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  time.innerHTML = `<span>Time</span>:${secondsValue}`;
};

// Initialize game
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = randomCards();
  matrixGenerator(cardValues);
};
