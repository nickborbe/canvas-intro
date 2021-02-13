const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");

let dino = new Image();
dino.src = "./dino.png";
let currentX = 25;
let currentY = 25;
let activeDirections = { up: false, down: false, left: false, right: false };
let obstacleArray = [];
let lives = 3;
let gameID = null;

function gameLoop() {
  gameID = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    obstacleArray.forEach((eachObstacle) => {
      eachObstacle.draw();
    });

    drawDinosaur();

    let rando = Math.random();
    if (rando > 0.95) generateObstacle();

    if(detectCollisions()){
        lives -= 1;
        currentX = 0;
        currentY = 0;
    }

    checkForDefeat();

  }, 100);
}

function checkForDefeat(){
    if (lives <= 0){
        clearInterval(gameID);
        ctx.fillText('You Lose', 200, 120)
    }
}

function safeFromEdges(speed) {
  if (currentX - speed <= 0 && activeDirections.left) return false;
  if (currentX + speed >= 500 && activeDirections.right) return false;
  if (currentY - speed <= 0 && activeDirections.up) return false;
  if (currentY + speed >= 300 && activeDirections.down) return false;

  return true;
}

function detectCollisions(){
    let collision = false
    obstacleArray.forEach((eachObstacle)=>{
        // to make this function super exact what you need to do is
        // create variables for the 4 sides of your dinosaur
        // leftSide = currentX
        // rightSide = currentX + width of dino 
        // top = currentY
        // bottom = currentY + height of dino
        // you need to do the same for the obstacle as well
        // and then ask if dino rightside > obstacle leftside && dino left sid < box right side && dino top < obstacle bottom && dino bottom > obstacle top
        if (Math.abs(eachObstacle.x  - currentX) < 30 && Math.abs(eachObstacle.y - currentY) < 30){
          collision = true
        //   this is an approximate solution 
        // because x is referring to the right side and y is referring to the top so the range we are using does not start in the center of our dinosaur
        }
    })
    return collision;
} 



function generateObstacle() {
  const randomHeight = Math.round(Math.random() * 50 + 5);

  const randomWidth = Math.round(Math.random() * 50 + 25);

  const randomYValue = Math.round(Math.random() * (300 - randomHeight));
  const newObstacle = new Obstacle(
    canvas.width,
    randomYValue,
    randomWidth,
    randomHeight
  );
  obstacleArray.push(newObstacle);
  newObstacle.moveLeftForever();
}

function drawDinosaur() {
  ctx.drawImage(dino, currentX, currentY, 50, 50);
}

function move(speed) {
  if (safeFromEdges(speed)) {
    if (activeDirections.right) currentX += speed;

    if (activeDirections.left) currentX -= speed;

    if (activeDirections.down) currentY += speed;

    if (activeDirections.up) currentY -= speed;
  } 
}

// setInterval(() => {
//     ctx.clearRect(0,0,300,300);
//     moveRight();
//     moveDown();
//     drawDinosaur();

// }, 80);

document.onkeydown = function (event) {
  const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (arrows.includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp") {
    activeDirections.up = true;
  } else if (event.key === "ArrowDown") {
    activeDirections.down = true;
  } else if (event.key === "ArrowLeft") {
    activeDirections.left = true;
  } else if (event.key === "ArrowRight") {
    activeDirections.right = true;
  }
  move(3);
};

document.onkeyup = function (event) {
  if (event.key === "ArrowUp") {
    activeDirections.up = false;
  } else if (event.key === "ArrowDown") {
    activeDirections.down = false;
  } else if (event.key === "ArrowLeft") {
    activeDirections.left = false;
  } else if (event.key === "ArrowRight") {
    activeDirections.right = false;
  }
};

gameLoop();
