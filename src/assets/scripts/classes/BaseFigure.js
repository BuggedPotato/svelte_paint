import { Point } from "./Point";

export class BaseFigure {

    start = new Point();
    points = [];
    end = new Point();
    colour = "#000000";
    width = 1;

    constructor( startX, startY, colour, width ){
        this.start.x = startX;
        this.start.y = startY;
        this.colour = colour;
        this.width = width;
    }

    draw(){
        console.warn( "No custom draw function" );
    }
}