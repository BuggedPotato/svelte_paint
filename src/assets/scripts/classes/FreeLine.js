import { canvasHandlers } from "../canvasHandlers";
import { BaseFigure } from "./BaseFigure";
export class FreeLine extends BaseFigure {

    draw( c ){
        const ctx = c.getContext( "2d" );
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo( this.start.x, this.start.y );
        this.points.map( ( point )=>{
            ctx.lineTo( point.x, point.y );
        } );
        ctx.lineTo( this._end.x, this._end.y );
        ctx.stroke();
        ctx.closePath();
    }
}