import { Point } from "./Point";

export class BaseFigure {

    _start = new Point();
    points = [];
    _end = new Point();
    keepRatio = false;
    scale = 1;
    get start(){
        return { x: this._start.x * this.scale, y: this._start.y * this.scale };
    }
    set start(value) {
        this._start = value;
    }
    get end() {
        return { x: this._end.x * this.scale, y: this._end.y * this.scale };
    }
    set end(value) {
        this._end = value;
    }
    colour = "#000000";
    width = 1;

    constructor( startX, startY, colour, width, ratio ){
        this._start.x = startX;
        this._start.y = startY;
        this.colour = colour;
        this.width = width;
        this.keepRatio = ratio;
    }

    draw(){
        console.warn( "No custom draw function" );
    }

}