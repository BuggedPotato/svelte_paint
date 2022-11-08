export class BackgroundFill {
  color = "#ffffff";
  isBackground = true;

  constructor(color) {
    this.color = color;
  }

  draw(c) {
    const ctx = c.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, c.width, c.height);
  }
}
