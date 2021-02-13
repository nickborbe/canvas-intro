class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    const { x, y, width, height } = this;
    ctx.fillRect(x, y, width, height);
  }

  moveLeftForever() {
    setInterval(() => {
      this.x -= 5;
    }, 200);
  }
}
