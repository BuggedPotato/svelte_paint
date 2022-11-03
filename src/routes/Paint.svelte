<script>
  import  "../lib/Tailwind.css";
  import { savedTheme, themes, setTheme } from "../assets/themes.js"; 
  import { onMount } from "svelte";
  import {canvasHandlers} from "../assets/scripts/canvasHandlers";

  let theme;
  savedTheme.subscribe( v =>{
    console.log( v )
    window.document.body.classList.remove( ...Object.values( themes ).map( t => t.bgMain ) )
    theme = themes[v];
    window.document.body.classList.add( theme.bgMain );
  });


  let canvasRef;
  let canvasUnderlayRef;
  let context;
  let paint = {
    drawing: false,
    colour: { primary: "#000000", secondary: "#ffffff" },
    drawSize: 2
  }
      

  onMount( () => {
        canvasHandlers.resize( null, paint, canvasRef );
        console.log( canvasRef.width, canvasRef.height );
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
    canvasRef.addEventListener( "mousedown", (e)=> canvasHandlers.start(e, paint, canvasRef), false );
    canvasRef.addEventListener( "mousemove", (e)=> canvasHandlers.draw(e, paint, canvasRef), false );
    canvasRef.addEventListener( "mouseup", (e)=> canvasHandlers.end(e, paint, canvasRef), false );

    window.addEventListener( "resize", (e)=> canvasHandlers.resize(e, paint, canvasRef), false );
    window.addEventListener( "resize", (e)=> canvasHandlers.resize(e, paint, canvasUnderlayRef), false );
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
            <i class="bi-trash3 {theme.textMain}" style="font-size: 1.5rem" on:click={ ()=> canvasHandlers.clear( canvasRef ) } />
              <i class="bi-save2 {theme.textMain}" style="font-size: 1.5rem" on:click={ ()=> canvasHandlers.save( canvasRef ) } />
            <input type="range" min="1" max="30" bind:value={paint.drawSize} />
            <input type="color" bind:value={paint.colour.primary} />
        </div>
        <div class="grid-container w-full h-full">
          <canvas id="canvas" class="grid-area-main bg-checkered w-full h-full z-10 cursor-crosshair" bind:this={canvasRef}></canvas>
          <canvas id="canvasUnderlay" class="grid-area-main w-full h-full cursor-crosshair" bind:this={canvasUnderlayRef}></canvas>
        </div>
    </div>
</div>