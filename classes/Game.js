class Game {
  constructor() {
    this.activeDirections = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.obstacleArray = [];
    this.lives = 3;
    this.gameID = null;
    this.dino = new Dinosaur();
    this.timer = 20;
    this.frames = 0;
    this.gameLoop();
  }

  generateObstacle() {
    const randomHeight = Math.round(Math.random() * 20 + 5);

    const randomWidth = Math.round(Math.random() * 50 + 35);

    const randomYValue = Math.round(Math.random() * (300 - randomHeight));
    const newObstacle = new Obstacle(
      canvas.width,
      randomYValue,
      randomWidth,
      randomHeight
    );
    this.obstacleArray.push(newObstacle);
    newObstacle.moveLeftForever();
  }

  checkForDefeat() {
    if (this.lives <= 0) {
      clearInterval(this.gameID);
      ctx.fillText("You Lose", 200, 120);
    }
  }
  checkForVictory(){
    if(this.timer < 1){
      clearInterval(this.gameID);
      ctx.fillText("You Win", 200, 120);
    }
  }

  detectCollisions() {
    let collision = false;
    this.obstacleArray.forEach((eachObstacle) => {
      // to make this function super exact what you need to do is
      // create variables for the 4 sides of your dinosaur
      // leftSide = currentX
      // rightSide = currentX + width of dino
      // top = currentY
      // bottom = currentY + height of dino
      // you need to do the same for the obstacle as well
      // and then ask if dino rightside > obstacle leftside && dino left sid < box right side && dino top < obstacle bottom && dino bottom > obstacle top
      if (
        Math.abs(eachObstacle.x - this.dino.currentX) < 30 &&
        Math.abs(eachObstacle.y - this.dino.currentY) < 30
      ) {
        collision = true;
        //   this is an approximate solution
        // because x is referring to the right side and y is referring to the top so the range we are using does not start in the center of our dinosaur
      }
    });
    return collision;
  }

  gameLoop() {
    this.gameID = setInterval(() => {
      this.frames++;
      
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      this.obstacleArray.forEach((eachObstacle) => {
        eachObstacle.draw();
      });

      this.dino.draw();

      let rando = Math.random();
      if (rando > 0.965) this.generateObstacle();

      if (this.detectCollisions()) {
        this.lives -= 1;
        this.dino = new Dinosaur();
      }

      if(this.frames % 10 === 0){
        this.timer -=1;
        document.getElementById('timer').innerHTML = this.timer;
        this.checkForVictory();
      }

      this.checkForDefeat();

    }, 100);
  }
}
