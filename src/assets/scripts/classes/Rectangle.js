import { BaseFigure } from "./BaseFigure";

export class Rectangle extends BaseFigure {
  draw(c) {
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = this.colour;
    ctx.fillStyle = this.colour;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.lineTo(this.start.x, this.end.y);
    ctx.closePath();
    ctx.stroke();
    if (this.fill) ctx.fill();
  }

  set end(point) {
    if (this.keepRatio) {
      const fooY =
        this.start.y +
        Math.abs(point.x - this.start.x) * (point.y <= this.start.y ? -1 : 1);
      this._end = { x: point.x, y: fooY };
    } else this._end = point;
  }
  get end() {
    return { x: this._end.x * this.scale, y: this._end.y * this.scale };
  }
  get start() {
    return { x: this._start.x * this.scale, y: this._start.y * this.scale };
  }
}
