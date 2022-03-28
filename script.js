// Add property on click of button

$('#credits').css({
  display: 'block',
  fontFamily: 'serif',
  fontSize:'22px',
  fontWeight: 'bold',
  position:'absolute',
  left:'5px',
  bottom:'5px'
      });

let element = document.querySelector(".start");
element.addEventListener("click", () => {
  element.style.display = "none";
  
  document.getElementById("scoreBox").style.display = "block";
  document.getElementById("hiscoreBox").style.display = "block";
  document.getElementById("board").style.display = "grid";
  document.getElementById("pause").style.display = "block";
});

// Game constants & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let snakelen = snakeArr.length;
let ispause = true;
let lastInputDirection = { x: 0, y: 0 };

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if (ispause) {
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    lastPaintTime = ctime;
    gameEngine();
  }
}

function isCollide(snake) {
  //  If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 1 ||
    snake[0].y >= 18 ||
    snake[0].y <= 1
  ) {
    return true;
  }
}


//gameEngine Starts
function gameEngine() {
  // Part 1: Updating the snake array & food
  if (isCollide(snakeArr)) 
  {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    lastInputDirection = { x: 0, y: 0 };

    document.getElementById("board").style.display = "none";
    document.getElementById("end").style.display = "block";
    document.getElementById("pause").style.display = "none";

    // alert("Game Over. Press any key to play again!");
    gameOverSound.pause();

    $('#newgame').css({display:'block'});
    document.querySelector("#newgame").addEventListener("click", () => {
      document.getElementById("board").style.display = "grid";
      document.getElementById("newgame").style.display = "none";
      document.getElementById("end").style.display = "none";
      document.getElementById("pause").style.display = "block";
      snakeArr = [{ x: 13, y: 15 }];
      musicSound.play();
      score = 0;
      scoreBox.innerHTML = "Score: " + score;
    });
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) 
  {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore: ", JSON.stringify(hiscoreval));
      hiscoreBox.innerText = "HiScore: " + hiscoreval;
    }

    scoreBox.innerText = "Score: " + score;
    snakelen = snakeArr.length;
    snakeArr.push({
      x: snakeArr[snakelen - 1].x + inputDir.x,
      y: snakeArr[snakelen - 1].y + inputDir.y,
    });
    let a = 2;
    let b = 16;

    // Setting random value of x and y which donot lie on snake body
    let x1 = Math.round(a + (b - a) * Math.random());
    let y1 = Math.round(a + (b - a) * Math.random());

    for (let i = 0; i < snakeArr.length; i++) {
      while (x1 === snakeArr[i].x && y1 === snakeArr[i].y) {
        x1 = Math.round(a + (b - a) * Math.random());
        y1 = Math.round(a + (b - a) * Math.random());
        i = 0;
      }
    }
    food = { x: x1, y: y1 };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//gameEngine ends


document.getElementById("pause").addEventListener("click", () => {
  ispause = !ispause;
  if (ispause == false) musicSound.pause();
  else musicSound.play();
});

// Main logic start here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  // Start the game
  moveSound.play();
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      if (lastInputDirection.y !== 0) break;
      inputDir.x = 0;
      inputDir.y = -1;
      lastInputDirection = inputDir;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      if (lastInputDirection.y !== 0) break;
      inputDir.x = 0;
      inputDir.y = 1;
      lastInputDirection = inputDir;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      if (lastInputDirection.x !== 0) break;
      inputDir.x = -1;
      inputDir.y = 0;
      lastInputDirection = inputDir;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      if (lastInputDirection.x !== 0) break;
      inputDir.x = 1;
      inputDir.y = 0;
      lastInputDirection = inputDir;
      break;

    default:
      break;
  }
});


