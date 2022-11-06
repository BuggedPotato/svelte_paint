import { BaseFigure } from "./BaseFigure";
import { Point } from "./Point";

export class Circle extends BaseFigure {
    
    _radius = new Point();
    get radius() {
        return { x: this._radius.x * this.scale, y: this._radius.y * this.scale };
    }
    set radius(value) {
        this._radius = value;
    }
    _center = new Point();
    get center() {
        return { x: this._center.x * this.scale, y: this._center.y * this.scale };
    }
    set center(value) {
        this._center = value;
    }
    set end( point ) {
        this._end = point;
        const fooY = this._start.y + (this.keepRatio ? Math.abs(this._end.x - this._start.x)*(this._end.y <= this._start.y ? -1 : 1 ) : (this._end.y - this._start.y)) / 2;
        const fooX = this._start.x + (this._end.x - this._start.x) / 2;
        this._center = { x: fooX, y: fooY }

        this._radius.x = Math.abs(this.center.x - this.start.x);
        this._radius.y = this.keepRatio ? this._radius.x : Math.abs(this.center.y - this.start.y);
    }
    get end() {
        return { x: this._end.x * this.scale, y: this._end.y * this.scale };
    }

    draw( c ) {
        console.log(  )
        const ctx = c.getContext( "2d" );
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.ellipse( this.center.x, this.center.y, this.radius.x, this.radius.y, 0, 0, 2 * Math.PI );
        ctx.closePath();
        ctx.stroke();
    }
}
    