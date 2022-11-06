import { BaseFigure } from "./BaseFigure";
import { Point } from "./Point";

export class Triangle extends BaseFigure {
    
    _thirdVertex;
    get thirdVertex() {
        return { x: this._thirdVertex.x * this.scale, y: this._thirdVertex.y * this.scale };
    }
    set thirdVertex(value) {
        this._thirdVertex = value;
    }
    set end( point ) {
        if( this.keepRatio ) {
            const fooY = this.start.y + Math.abs(point.x - this.start.x) * (point.y <= this.start.y ? -1 : 1 ) * Math.sqrt(3) / 2;
            this._end = { x: point.x, y: fooY }
        } else {
            this._end = point;
        }
        this._thirdVertex = new Point( this._start.x + (this._end.x - this._start.x) / 2, this._end.y );
    }
    get end() {
        return { x: this._end.x * this.scale, y: this._end.y * this.scale };
    }
    get start(){
        return { x: this._start.x * this.scale, y: this._start.y * this.scale };
    }

    draw( c ) {
        console.log( this.thirdVertex )
        const ctx = c.getContext( "2d" );
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo( this.start.x, this.start.y );
        ctx.lineTo( this.thirdVertex.x, this.thirdVertex.y );
        ctx.lineTo( this.end.x, this.start.y );
        ctx.closePath();
        ctx.stroke();
    }
}