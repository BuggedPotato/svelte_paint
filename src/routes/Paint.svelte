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
    fill: false,
    relScale: 1, // scale of canvas relative to last size
  }
  
  $: canvasHandlers.redraw( canvasUnderlayRef, paint );

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

    window.addEventListener( "keydown", (e)=>{
      switch( e.code ){
        case 'KeyX':
          tools.swapColours(paint);
          paint = paint;
        break;
        case 'ControlLeft':
          paint.keepRatio = true;
          if( paint.drawObject )
            paint.drawObject.keepRatio = paint.keepRatio;
        break;
      }
    }, false );

    window.addEventListener( "keyup", (e)=>{
      switch( e.code ){
        case 'ControlLeft':
          paint.keepRatio = false;
          if( paint.drawObject )
            paint.drawObject.keepRatio = paint.keepRatio;
        break;
      }
    }, false );
  }

</script>

<div class="w-100 h-100 flex items-center flex-col">
  <div class="flex w-full h-fit">
    <i class="bi-moon-stars {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "dark" )}/>
    <i class="bi-sun-fill mx-3 {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "light" )} />
    <i class="bi-bootstrap-fill {theme.textMain}" style="font-size: 1.5rem" on:click={()=>setTheme( "contrast" )}/>
  </div>
  <div class="flex flex-col w-full h-fit">
    <div id="tools" class="flex flex-wrap flex-row p-2 items-center my-4">
      <i class="bi-arrow-90deg-left {theme.textMain} mr-2 text-[1.5rem]" on:click={(e)=> {canvasHandlers.undo( e, paint ); paint = paint}}/>
      <i class="bi-trash3 {theme.textMain} mr-2 text-[1.5rem]" on:click={ ()=>{ canvasHandlers.clear( canvasUnderlayRef ); paint.history.length = 0} } />
      <i class="bi-save2 {theme.textMain} mr-2 text-[1.5rem]" on:click={ ()=> {canvasHandlers.save( canvasUnderlayRef )} } />
      <i class="bi-paint-bucket {theme.textMain} mr-2 text-[1.5rem]" on:click={ ()=>{ canvasHandlers.background( paint ); paint = paint; } } />
      <input id="size-input" bind:value={paint.drawSize} type="range" class="ml-5 mr-2" min="1" max="100" step="1" /> <!-- TODO starting vluae -->
      <label for="size-input" class="{theme.textMain} text-[1.25rem]">{paint.drawSize}</label>
      
      <i class="bi-brush {theme.textMain} ml-5 mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.FreeLine } />
      <i class="bi-slash-lg {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Line } />
      <i class="bi-square {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Rectangle } />
      <i class="bi-triangle {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Triangle } />
      <i class="bi-circle {theme.textMain} mr-2" style="font-size: 1.5rem" on:click={ ()=> paint.drawType = DrawType.Circle } />
      
      <label for="keep-ratio" class="{theme.textMain} ml-5 mr-2">Keep ratio:</label>
      <input id="keep-ratio" type="checkbox" bind:checked={paint.keepRatio} />
      <label for="fill" class="{theme.textMain} ml-5 mr-2">Fill:</label>
      <input id="fill" type="checkbox" bind:checked={paint.fill} />

      <div class="flex flex-row flex wrap mx-5">
        <div class="flex flex-row flex-wrap">
          <div on:click={()=> paint.colour.primary = "#dc2626" } class="h-8 w-8 bg-red-600"></div>
          <div on:click={()=> paint.colour.primary = "#fb923c" } class="h-8 w-8 bg-orange-400"></div>
          <div on:click={()=> paint.colour.primary = "#facc15" } class="h-8 w-8 bg-yellow-400"></div>
          <div on:click={()=> paint.colour.primary = "#15803d" } class="h-8 w-8 bg-green-700"></div>
          <div on:click={()=> paint.colour.primary = "#1d4ed8" } class="h-8 w-8 bg-blue-700"></div>
          <div on:click={()=> paint.colour.primary = "#7e22ce" } class="h-8 w-8 bg-purple-700"></div>
        </div>
        <div class="flex relative h-full m-3" style="margin-top: 0;">
          <input type="color" bind:value={paint.colour.primary} class="h-10 w-10 absolute z-10 bg-transparent appearance-none border-none" style="--border-color: {theme.textMainHexadec}" />
          <input type="color" bind:value={paint.colour.secondary} class="h-10 top-3 absolute left-6 w-10 bg-transparent appearance-none border-none" style="--border-color: {theme.textMainHexadec}" />
        </div>
      </div>
    </div>
  </div>
  <div class="relative h-5/6 w-11/12">
    <canvas id="canvas" class="absolute w-full h-full z-10 cursor-crosshair" bind:this={canvasRef}></canvas>
    <canvas id="canvasUnderlay" class="absolute w-full bg-checkered h-full" bind:this={canvasUnderlayRef}></canvas>
  </div>
</div>

<style>
  input[type=color]::-webkit-color-swatch{
    border: 1px solid var(--border-color);
    border-radius: 1px;
  }
</style>