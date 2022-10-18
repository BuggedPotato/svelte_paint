<script>
import  "../lib/Tailwind.css";
import { savedTheme, themes, setTheme } from "../assets/themes.js"; 
  import { onMount } from "svelte";
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
    colour: { primary: "black", secondary: "white" },
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
        // background( "white" )
        setListeners();
  } );
  
  $:{
    if( context ){
        context.strokeStyle = paint.colour.primary;
        context.fillStyle = paint.colour.primary;
    }
  }


  const background = ( colour ) => {
    context.fillStyle = colour;
    context.fillRect( 0, 0, canvasRef.width, canvasRef.height );
  }

  const setListeners = () => {
    canvasRef.addEventListener( "mousedown", listenerHandlers.start, false );
    canvasRef.addEventListener( "mousemove", listenerHandlers.draw, false );
    canvasRef.addEventListener( "touchstart", listenerHandlers.start, false );
    canvasRef.addEventListener( "touchmove", listenerHandlers.draw, false );
  }

  const listenerHandlers = {
    start: ( e ) => {
        paint.drawing = true;
        context.beginPath();
        context.moveTo( 
            e.clientX - canvasRef.offsetLeft,
            e.clientY - canvasRef.offsetTop
        );
        e.preventDefault();
    },
    draw: ( e ) => {
        if( !paint.drawing )
            return;
        context.lineTo( 
            e.clientX - canvasRef.offsetLeft,
            e.clientY - canvasRef.offsetTop
        );
        console.log( e.clientX, e.clientY )
        console.log( canvasRef.offsetLeft, canvasRef.offsetTop )
        context.stroke();
    }
  }

</script>

<div class="w-screen h-screen flex items-center flex-col">
    <div class="flex w-full h-fit">
        <i class="bi-moon-stars {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "dark" )}/>
        <i class="bi-sun-fill mx-3 {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "light" )} />
        <i class="bi-bootstrap-fill {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "contrast" )}/>
    </div>
    <div class="flex flex-col w-11/12 h-full">
        <div id="tools">
            <i class="bi-arrow-90deg-left {theme.textMain}" style="font-size: 1.5rem" on:click={()=>console.log("undo")}/>
            <i class="bi-arrow-90deg-right {theme.textMain}" style="font-size: 1.5rem" on:click={()=>console.log("redo")}/>
        </div>
        <canvas id="canvas" class="w-full h-[80%] bg-checkered" bind:this={canvasRef}></canvas>
    </div>
</div>