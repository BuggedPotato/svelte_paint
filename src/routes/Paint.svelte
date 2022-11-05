<script>
  import  "../lib/Tailwind.css";
  import { savedTheme, themes, setTheme } from "../assets/themes.js"; 
  import { onMount } from "svelte";
  import {canvasHandlers} from "../assets/scripts/canvasHandlers";
  import { tools } from "../assets/scripts/tools";

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
    canvasHandlers.resize( null, paint, canvasUnderlayRef );
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

    window.addEventListener( "resize", (e)=>{ canvasHandlers.resize(e, paint, canvasRef); canvasHandlers.resize(e, paint, canvasUnderlayRef) }, false );
  }

</script>

<div class="w-screen h-screen flex items-center flex-col">
    <div class="flex w-full h-fit">
        <i class="bi-moon-stars {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "dark" )}/>
        <i class="bi-sun-fill mx-3 {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "light" )} />
        <i class="bi-bootstrap-fill {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "contrast" )}/>
    </div>
    <div class="flex flex-col w-full h-fit">
        <div id="tools">
            <i class="bi-arrow-90deg-left {theme.textMain}" style="font-size: 1.5rem" on:click={()=>console.log("undo")}/>
            <i class="bi-trash3 {theme.textMain}" style="font-size: 1.5rem" on:click={ ()=> canvasHandlers.clear( canvasRef ) } />
            <i class="bi-save2 {theme.textMain}" style="font-size: 1.5rem" on:click={ ()=> canvasHandlers.save( canvasRef ) } />
            <input id="size-input" type="range" min="0.5" max="6" step="0.1" on:input={ (e)=>{ paint.drawSize = tools.brushSizeFromInput( e ) } } /> <!-- TODO starting vluae -->
            <label for="size-input" class="{theme.textMain}">{paint.drawSize}</label>
            <div class="flex relative h-full w-fit">
              <input type="color" bind:value={paint.colour.primary} class="h-10 w-10 absolute z-10 bg-transparent appearance-none border-none" />
              <input type="color" bind:value={paint.colour.secondary} class="h-10 top-5 absolute left-5 w-10 bg-transparent appearance-none border-none" />
            </div>
        </div>
      </div>
      <div class="relative h-5/6 w-11/12">
        <canvas id="canvas" class="absolute w-full h-full z-10 cursor-crosshair" bind:this={canvasRef}></canvas>
        <canvas id="canvasUnderlay" class="absolute w-full bg-checkered h-full" bind:this={canvasUnderlayRef}></canvas>
      </div>
    </div>
    <button on:click={(e)=> {tools.swapColours(e, paint); paint = paint;}} >kdahkwdh</button>