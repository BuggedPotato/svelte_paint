import { BaseFigure } from "./BaseFigure";
import { Point } from "./Point";

export class Triangle extends BaseFigure {
    
    thirdVertex;

    draw( c ) {
        const ctx = c.getContext( "2d" );
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo( this.start.x, this.start.y );
        ctx.lineTo( this.thirdVertex.x, this.thirdVertex.y );
        ctx.lineTo( this._end.x, this.start.y );
        ctx.closePath();
        ctx.stroke();
    }

    set end( point ) {
        if( this.keepRatio ) {
            const fooY = this.start.y + Math.abs(point.x - this.start.x) * (point.y <= this.start.y ? -1 : 1 ) * Math.sqrt(3) / 2;
            this._end = { x: point.x, y: fooY }
        } else {
            this._end = point;
        }
        this.thirdVertex = new Point( this.start.x + (this._end.x - this.start.x) / 2, this._end.y );
    }
}