let currentGame;

document.getElementById('start').onclick = function(){
  currentGame = new Game();
}

document.onkeydown = function (event) {
  const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (arrows.includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp") {
    currentGame.activeDirections.up = true;
  } else if (event.key === "ArrowDown") {
    currentGame.activeDirections.down = true;
  } else if (event.key === "ArrowLeft") {
    currentGame.activeDirections.left = true;
  } else if (event.key === "ArrowRight") {
    currentGame.activeDirections.right = true;
  }
  currentGame.dino.move(3);
};

document.onkeyup = function (event) {
  if (event.key === "ArrowUp") {
    currentGame.activeDirections.up = false;
  } else if (event.key === "ArrowDown") {
    currentGame.activeDirections.down = false;
  } else if (event.key === "ArrowLeft") {
    currentGame.activeDirections.left = false;
  } else if (event.key === "ArrowRight") {
    currentGame.activeDirections.right = false;
  }
};


