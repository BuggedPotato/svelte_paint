import { Point } from "./Point";

export class BaseFigure {

    start = new Point();
    points = [];
    _end = new Point();
    keepRatio = false;
    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }
    colour = "#000000";
    width = 1;

    constructor( startX, startY, colour, width, ratio ){
        this.start.x = startX;
        this.start.y = startY;
        this.colour = colour;
        this.width = width;
        this.keepRatio = ratio;
    }

    draw(){
        console.warn( "No custom draw function" );
    }
}