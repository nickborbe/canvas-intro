class Dinosaur {
  constructor() {
    this.currentX = 25;
    this.currentY = 25;
    this.height = 50;
    this.width = 50;
    this.img = new Image();
    this.img.src = "./dino.png";
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.currentX,
      this.currentY,
      this.width,
      this.height
    );
  }

  safeFromEdges(speed) {
    if (this.currentX - speed <= 0 && currentGame.activeDirections.left) return false;
    if (this.currentX + speed >= 500 && currentGame.activeDirections.right) return false;
    if (this.currentY - speed <= 0 && currentGame.activeDirections.up) return false;
    if (this.currentY + speed >= 300 && currentGame.activeDirections.down) return false;

    return true;
  }

  move(speed) {
    if (this.safeFromEdges(speed)) {
      if (currentGame.activeDirections.right) this.currentX += speed;

      if (currentGame.activeDirections.left) this.currentX -= speed;

      if (currentGame.activeDirections.down) this.currentY += speed;

      if (currentGame.activeDirections.up) this.currentY -= speed;
    }
  }
}
