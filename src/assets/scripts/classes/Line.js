import { BaseFigure } from "./BaseFigure";
import { Point } from "./Point";
export class Line extends BaseFigure {
  draw(c) {
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = this.colour;
    ctx.fillStyle = this.colour;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
  }

  set end(point) {
    if (this.keepRatio) {
      const diff = {
        x: Math.abs(point.x - this._start.x),
        y: Math.abs(point.y - this._start.y),
      };
      if (diff.x > diff.y) this._end = new Point(point.x, this._start.y);
      else this._end = new Point(this._start.x, point.y);
    } else this._end = point;
  }
  get end() {
    return { x: this._end.x * this.scale, y: this._end.y * this.scale };
  }
}
