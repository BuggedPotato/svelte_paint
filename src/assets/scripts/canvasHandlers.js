export const canvasHandlers = {
  clear: (c) => {
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
  },
  
  background: ( c, colour ) => {
    const ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    ctx.fillRect( 0, 0, c.width, c.height );
  },
  start: ( e, paint, canvasRef ) => {
    let context = canvasRef.getContext("2d");
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
  draw: ( e, paint, canvasRef ) => {
      let context = canvasRef.getContext("2d");
      if( !paint.drawing )
          return;
      context.lineTo( 
          e.clientX - canvasRef.offsetLeft,
          e.clientY - canvasRef.offsetTop
      );
      // console.log( e.clientX - canvasRef.offsetLeft, e.clientY - canvasRef.offsetTop )
      context.stroke();
  },
  end: ( e, paint, canvasRef ) => {
    let context = canvasRef.getContext("2d");
    if( !paint.drawing )
      return;
    context.stroke();
    context.closePath();
    paint.drawing = false;
  },
  resize: ( e, paint, canvasRef ) => {
    // console.log( window.getComputedStyle( canvasRef ).getPropertyValue("width"), window.getComputedStyle( canvasRef ).getPropertyValue("height") )
    canvasRef.width = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("width") );
    canvasRef.height = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("height") );
    paint.drawSize = 1;
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
