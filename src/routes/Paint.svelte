<script>
  import  "../lib/Tailwind.css";
  import { savedTheme, themes, setTheme } from "../assets/themes.js"; 
  import { onMount } from "svelte";
  import canvasHandlers from "../assets/scripts/canvasHandlers";

  let theme;
  savedTheme.subscribe( v =>{
    console.log( v )
    window.document.body.classList.remove( ...Object.values( themes ).map( t => t.bgMain ) )
    theme = themes[v];
    window.document.body.classList.add( theme.bgMain );
  });


  let canvasRef;
  let context;
  let paint = {
    drawing: false,
    colour: { primary: "#000000", secondary: "#ffffff" },
    drawSize: 2
  }
      

  onMount( () => {
        canvasRef.width = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("width") );
        canvasRef.height = parseInt( window.getComputedStyle( canvasRef ).getPropertyValue("height") );
        console.log( canvasRef.width, canvasRef.height )
        context = canvasRef.getContext( "2d" );
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = paint.drawSize;
        setListeners();
  } );
  
  $:{
    if( context ){
        context.strokeStyle = paint.colour.primary;
        context.fillStyle = paint.colour.primary;
        context.lineWidth = paint.drawSize;
        context.fillStyle = paint.colour.primary;
        context.strokeStyle = paint.colour.primary;
    }
  }

  const setListeners = () => {
    canvasRef.addEventListener( "mousedown", listenerHandlers.start, false );
    canvasRef.addEventListener( "mousemove", listenerHandlers.draw, false );
    canvasRef.addEventListener( "mouseup", listenerHandlers.end, false );

    window.addEventListener( "resize", listenerHandlers.resize, false );
  }

  const listenerHandlers = {
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
  }

</script>

<div class="w-screen h-screen flex items-center flex-col">
    <div class="flex w-full h-fit">
        <i class="bi-moon-stars {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "dark" )}/>
        <i class="bi-sun-fill mx-3 {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "light" )} />
        <i class="bi-bootstrap-fill {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "contrast" )}/>
    </div>
    <div class="flex flex-col w-11/12 h-5/6">
        <div id="tools">
            <i class="bi-arrow-90deg-left {theme.textMain}" style="font-size: 1.5rem" on:click={()=>console.log("undo")}/>
            <i class="bi-trash3 {theme.textMain}" style="font-size: 1.5rem" on:click={ ()=> canvasHandlers.clear(null, canvasRef) } />
            <input type="range" min="1" max="30" bind:value={paint.drawSize} />
            <input type="color" bind:value={paint.colour.primary} />
        </div>
        <canvas id="canvas" class="w-full h-full bg-checkered cursor-crosshair" bind:this={canvasRef}></canvas>
    </div>
</div>