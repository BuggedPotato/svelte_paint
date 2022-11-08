import { BaseFigure } from "./BaseFigure";
export class FreeLine extends BaseFigure {
  draw(c) {
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = this.colour;
    ctx.fillStyle = this.colour;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    this.points.map((point) => {
      ctx.lineTo(point.x * this.scale, point.y * this.scale);
    });
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
  }
}
