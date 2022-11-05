import { DrawType } from "./EDrawType";
import { FreeLine } from "./classes/FreeLine";
import { Point } from "./classes/Point";

export const canvasHandlers = {
  clear: ( c ) => {
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  },
  
  background: ( c, colour ) => {
    const ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    ctx.fillRect( 0, 0, c.width, c.height );
  },
  
  setCanvasProps: ( c, paint ) => {
    const context = c.getContext( "2d" );
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = paint.colour.primary;
    context.fillStyle = paint.colour.primary;
    context.lineWidth = paint.drawSize;
  },

  start: ( e, paint, c ) => {
    const start = { x: e.clientX - c.parentNode.offsetLeft + window.scrollX,
    y: e.clientY - c.parentNode.offsetTop + window.scrollY };
    paint.drawing = true;
    switch( paint.drawType ){
      case DrawType.FreeLine:
        paint.drawObject = new FreeLine( start.x, start.y, paint.colour.primary, paint.drawSize );
      break;
    }
    paint.drawObject.draw( c );
    console.log( paint.history )
  },
  draw: ( e, paint, c ) => {
    canvasHandlers.clear( c );
    if( !paint.drawing )
        return;
    switch( paint.drawType ){
      case DrawType.FreeLine:
        paint.drawObject.points.push( new Point( e.clientX - c.parentNode.offsetLeft + window.scrollX,
          e.clientY - c.parentNode.offsetTop + window.scrollY ) );
      break;
    }
    paint.drawObject.draw( c );
  },
  end: ( e, paint, c ) => {
    if( !paint.drawing )
      return;
    switch( paint.drawType ){
      case DrawType.FreeLine:
        paint.drawObject.end = new Point( e.clientX - c.parentNode.offsetLeft + window.scrollX,
          e.clientY - c.parentNode.offsetTop + window.scrollY );
      break;
    }
    const foo = paint.drawObject;
    paint.history = [ ...paint.history, foo ];
    paint.drawObject = null;
    paint.drawing = false;
    console.log( paint.history )
  },

  resize: ( e, paint, canvasRef ) => {
    canvasRef.width = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("width") );
    canvasRef.height = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("height") );
    paint.drawSize = 1;
  },

  undo: ( e, paint ) => {
    console.log( "Undo" );
    paint.history.pop();
  },
  
  save: ( canvasRef ) => {
    let link = document.createElement( "a" );
    const name = "paint_" + canvasHandlers.getCurrentDateTimeStr() + ".png";
    link.setAttribute( "download", name );
    canvasRef.toBlob( ( blob )=>{
      let url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.click();
    } );
  },

  getCurrentDateTimeStr: () => {
        let date = new Date( Date.now() ).toString();
        let tmp = date.split( " " );
        date = tmp[2] + "_" + tmp[1] + "_" + tmp[3] + "_" + tmp[4].replace( ":", "_" );
        return date;
    }
};
