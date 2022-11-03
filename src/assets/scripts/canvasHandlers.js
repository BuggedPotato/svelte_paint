export default {
  clear: (e, c) => {
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  },
  
  background: ( c, colour ) => {
    const ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    ctx.fillRect( 0, 0, c.width, c.height );
  },
  start: ( e ) => {
    paint.drawing = true;
    context.beginPath();
    context.moveTo( 
        e.clientX - canvasRef.offsetLeft,
        e.clientY - canvasRef.offsetTop
    );
    context.lineTo( 
        e.clientX - canvasRef.offsetLeft,
        e.clientY - canvasRef.offsetTop
    );
  },
  draw: ( e ) => {
      if( !paint.drawing )
          return;
      context.lineTo( 
          e.clientX - canvasRef.offsetLeft,
          e.clientY - canvasRef.offsetTop
      );
      // console.log( e.clientX - canvasRef.offsetLeft, e.clientY - canvasRef.offsetTop )
      context.stroke();
  },
  end: ( e ) => {
    if( !paint.drawing )
      return;
    context.stroke();
    context.closePath();
    paint.drawing = false;
  },
  resize: ( e ) => {
    canvasRef.width = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("width") );
    canvasRef.height = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("height") );
  }
};
