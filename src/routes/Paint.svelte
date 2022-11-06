<script>
  import  "../lib/Tailwind.css";
  import { savedTheme, themes, setTheme } from "../assets/themes.js"; 
  import { onMount } from "svelte";
  import {canvasHandlers} from "../assets/scripts/canvasHandlers";
  import { tools } from "../assets/scripts/tools";
  import { DrawType } from "../assets/scripts/EDrawType";

  let theme;
  savedTheme.subscribe( v =>{
    console.log( v )
    window.document.body.classList.remove( ...Object.values( themes ).map( t => t.bgMain ) )
    theme = themes[v];
    window.document.body.classList.add( theme.bgMain );
  });

  let canvasRef;
  let canvasUnderlayRef;
  let paint = {
    drawing: false,
    colour: { primary: "#000000", secondary: "#ffffff" },
    drawSize: 2,
    history: [],
    drawType: DrawType.FreeLine,
    drawObject: null,
    keepRatio: false,
    relScale: 1 // scale of canvas relative to last size
  }
  
  $: canvasHandlers.redraw( canvasUnderlayRef, paint );

  // function redraw( c, paint ) {
  //   if( !c )
  //     return;
  //   canvasHandlers.clear( c );
  //   paint.history.map( ( obj )=>{
  //     obj.draw( c );
  //   } );
  // }

  // function setNewScale( c, paint ) {
  //   if( !c )
  //     return;
  //   paint.history.map( ( obj )=>{
  //     obj.scale *= paint.relScale;
  //   } );
  // }

  onMount( () => {
    canvasHandlers.resize( null, paint, canvasRef );
    canvasHandlers.resize( null, paint, canvasUnderlayRef );
    console.log( canvasRef.width, canvasRef.height );
    canvasHandlers.setCanvasProps( canvasRef, paint );
    canvasHandlers.setCanvasProps( canvasUnderlayRef, paint );
    setListeners();        
  } );
  

  $:{
    if( canvasRef )
      canvasHandlers.setCanvasProps( canvasRef, paint );
    if( canvasUnderlayRef )
      canvasHandlers.setCanvasProps( canvasUnderlayRef, paint );
  }

  const setListeners = () => {
    canvasRef.addEventListener( "mousedown", (e)=> canvasHandlers.start(e, paint, canvasRef), false );
    canvasRef.addEventListener( "mousemove", (e)=> canvasHandlers.draw(e, paint, canvasRef), false );
    canvasRef.addEventListener( "mouseup", (e)=> {canvasHandlers.end(e, paint, canvasRef); paint.history = paint.history }, false );
    canvasRef.addEventListener( "mouseout", (e)=> {canvasHandlers.end(e, paint, canvasRef); paint.history = paint.history }, false );
    // canvasRef.addEventListener( "mouseover", (e)=> {canvasHandlers.end(e, paint, canvasRef); paint.history = paint.history ; console.log("dad")}, false );

    window.addEventListener( "resize", (e)=>{ 
      canvasHandlers.resize(e, paint, canvasRef);
      canvasHandlers.resize(e, paint, canvasUnderlayRef);
      canvasHandlers.setNewScale( canvasUnderlayRef, paint );
      canvasUnderlayRef = canvasUnderlayRef; // redraw
    }, false );
  }

</script>

<div class="w-screen h-screen flex items-center flex-col">
  <div class="flex w-full h-fit">
    <i class="bi-moon-stars {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "dark" )}/>
    <i class="bi-sun-fill mx-3 {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "light" )} />
    <i class="bi-bootstrap-fill {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "contrast" )}/>
  </div>
  <div class="flex flex-col w-full h-fit">
    <div id="tools" class="flex flex-row p-2 items-center">
      <i class="bi-arrow-90deg-left {theme.textMain} mr-2 text-[1.5rem]" on:click={(e)=> {canvasHandlers.undo( e, paint ); paint = paint}}/>
      <i class="bi-trash3 {theme.textMain} mr-2 text-[1.5rem]" on:click={ ()=>{ canvasHandlers.clear( canvasUnderlayRef ); paint.history.length = 0} } />
      <i class="bi-save2 {theme.textMain} mr-2 text-[1.5rem]" on:click={ ()=> canvasHandlers.save( canvasUnderlayRef ) } />
      <input id="size-input" type="range" class="ml-5 mr-2" min="0.5" max="6" step="0.1" on:input={ (e)=>{ paint.drawSize = tools.brushSizeFromInput( e ) } } /> <!-- TODO starting vluae -->
      <label for="size-input" class="{theme.textMain} text-[1.25rem]">{paint.drawSize}</label>
      
      <i class="bi-brush {theme.textMain} ml-5 mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.FreeLine } />
      <i class="bi-slash-lg {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Line } />
      <i class="bi-square {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Rectangle } />
      <i class="bi-triangle {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Triangle } />
      <i class="bi-circle {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Circle } />
      
      <label for="keep-ratio" class="{theme.textMain} ml-5 mr-2">Keep ratio:</label>
      <input id="keep-ratio" type="checkbox" bind:checked={paint.keepRatio} />

      <div class="flex relative h-full m-3" style="margin-top: -1.5rem;">
        <input type="color" bind:value={paint.colour.primary} class="h-10 w-10 absolute z-10 bg-transparent appearance-none border-none" style="--border-color: {theme.textMainHexadec}" />
        <input type="color" bind:value={paint.colour.secondary} class="h-10 top-5 absolute left-5 w-10 bg-transparent appearance-none border-none" style="--border-color: {theme.textMainHexadec}" />
      </div>
    </div>
  </div>
  <div class="relative h-5/6 w-11/12">
    <canvas id="canvas" class="absolute w-full h-full z-10 cursor-crosshair" bind:this={canvasRef}></canvas>
    <canvas id="canvasUnderlay" class="absolute w-full bg-checkered h-full" bind:this={canvasUnderlayRef}></canvas>
  </div>
</div>
<button on:click={(e)=> {tools.swapColours(e, paint); paint = paint;}} >kdahkwdh</button>

<style>
  input[type=color]::-webkit-color-swatch{
    border: 1px solid var(--border-color);
    border-radius: 1px;
  }
</style>