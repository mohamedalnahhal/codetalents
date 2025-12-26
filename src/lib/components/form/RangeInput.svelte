<script lang="ts">
	import MinusIcon from "$lib/icons/regular/MinusIcon.svelte";
	import { remToPx } from "$lib/utils/unitConverter";
  import PlusIcon from "../../icons/regular/PlusIcon.svelte";

	import { onMount } from "svelte";

  export let name: string | null | undefined = undefined;

  export let min: number;
  export let max: number;

  export let steps: number[] | undefined = undefined;
  export let step: number | undefined = undefined;

  export let multiple: boolean = false;
  export let oneside: boolean = false;

  if(multiple && oneside) throw new Error("RangeInput can't be multiple ranges and in the same time one side range");

  export let min_diff: number = 0;

  if(min_diff > max-min) throw new Error(`min_diff:${min_diff} is bigger than the RangeInput`);

  export let init_min: number = min;
  export let init_max: number = max;

  if(oneside && init_min !== min) throw new Error("RangeInput with one side can't spacify init_min because it always min value");
  if(init_max - init_min < min_diff) throw new Error(`(init_max:${init_max} - init_min:${init_min}) shouldn't be less than min_diff:${min_diff}`)

  /**@default true */
  export let show_labels: boolean = true;

  export let label_reneder: ((input: number) => number|string) | undefined = undefined;

  let className: string | undefined = undefined;
  export {className as class};

  let inputs: number[][] = [oneside? [init_max] : [init_min, init_max]];

  export const value = oneside? inputs[0][0] : undefined;

  let container: HTMLDivElement;
  let lbls: HTMLDivElement[] = [];
  let lbls_edgs_lookup: number[] = [];

  onMount(()=>{new ResizeObserver(()=>{container = container}).observe(container)});

  function addRange() {
    inputs.push([Math.min(inputs[inputs.length-1][1] + 0.07*(max-min), max), Math.min(inputs[inputs.length-1][1] + 0.12*(max-min), max)]);
    inputs = inputs;
  }

  function removeRange() {
    if(inputs.length > 1){
      inputs.pop();
      inputs = inputs;
    }
  }

  let offsetX: number = 0;
  let offsetInput: number = 0;
  let dragButton: HTMLButtonElement | undefined = undefined;

  // Mouse Dragging

  function startMouseDragging(e:MouseEvent, i: number, x: 0|1) {
    offsetX = e.clientX;
    offsetInput = inputs[i][x];
    if(dragButton) dragButton.style.zIndex = "11";
    dragButton = e.target as HTMLButtonElement;
    dragButton.style.zIndex = "12";
    if(!oneside) (dragButton.parentElement!.querySelector('button.node'+(x===0?1:0)) as HTMLButtonElement).style.zIndex = "10";
    const dragging = (e:MouseEvent)=>calcDragging(e.clientX, i, x);
    const stopDragging = (e:MouseEvent)=>stopMouseDragging(dragging, stopDragging);

    document.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mouseleave", stopDragging);
  }

  function stopMouseDragging(dragging: (e:MouseEvent)=>any, stopDragging: (e:MouseEvent)=>any) {
    resetDragging();
    document.removeEventListener("mousemove", dragging);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("mouseleave", stopDragging);
  }

  // Touch Dragging

  function startTouchDragging(e:TouchEvent, i: number, x: 0|1) {
    offsetX = e.touches[0].clientX;
    offsetInput = inputs[i][x];
    if(dragButton) dragButton.style.zIndex = "11";
    dragButton = e.target as HTMLButtonElement;
    dragButton.style.zIndex = "12";
    if(!oneside) (dragButton.parentElement!.querySelector('button.node'+(x===0?1:0)) as HTMLButtonElement).style.zIndex = "10";
    const dragging = (e:TouchEvent)=>calcDragging(e.touches[0].clientX, i, x);
    const stopDragging = (e:TouchEvent)=>stopTouchDragging(dragging, stopDragging);

    document.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", stopDragging);
    document.addEventListener("touchcancel", stopDragging);
  }

  function stopTouchDragging(dragging: (e:TouchEvent)=>any, stopDragging: (e:TouchEvent)=>any) {
    resetDragging();
    document.removeEventListener("touchmove", dragging);
    document.removeEventListener("touchend", stopDragging);
    document.removeEventListener("touchcancel", stopDragging);
  }

  function calcDragging(xPos:number, i: number, x: 0|1){
    inputs[i][x] = offsetInput + ((offsetX - xPos) / container.clientWidth) * (max-min);
    inputs[i][x] = Math.max(inputs[i][x], x===0? i > 0? inputs[i-1][1] : min : inputs[i][0]);
    inputs[i][x] = Math.min(inputs[i][x], x===1||oneside? i < inputs.length-1? inputs[i+1][0] : max : inputs[i][1]);
    if(step){
      inputs[i][x] -= inputs[i][x] % step;
    }
    // lbls
    inputs = inputs;
  }

  function resetDragging() {
    // dragButton!.style.zIndex = "11";
    // dragButton!.style.zIndex = "10";
    // dragButton = undefined;
  }

  function getLblMargin(index: number) {
    const m = (lbls[index].firstElementChild as HTMLDivElement)!.style.transform.match(/translateX\([-+]?[0-9]*\.?[0-9]+/)![0] as string;
    console.log(m.slice(11));
    return parseFloat(m.slice(11));
  }
</script>

<!-- {#each inputs as _,i}
  {#each _ as __,j}
    <input hidden type="number" bind:value={inputs[i][j]}>
  {/each}
{/each} -->

<input hidden type="text" value={inputs.flat().toString()}>
<main class="w-full {multiple? "flex flex-row gap-1 items-end" : ""} {className??""}">
  <div class="pt-10 w-full">
    <div bind:this={container} class="h-5 w-full bg-under-primary rounded-full px-2">
      <div class="h-full w-full relative">
        {#if show_labels}
        <div dir="ltr" class="absolute z-10 -top-full right-0 -translate-y-1/2 translate-x-1 w-max flex flex-col justify-center items-end text-xs" >
          <div class="rounded-md rounded-br-none p-1 {oneside? 'bg-primary text-white' : 'bg-under-primary text-primary'}">{label_reneder? label_reneder(min) : min}</div>
          <svg class="{oneside? 'fill-primary':'fill-under-primary'} rotate-180" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        <div dir="ltr" class="absolute z-10 -top-full right-full -translate-y-1/2 translate-x-[calc(100%-0.25rem)] w-max flex flex-col justify-center text-xs" >
          <div class="rounded-md rounded-bl-none p-1 bg-under-primary text-primary">{label_reneder? label_reneder(max) : max}</div>
          <svg class="fill-under-primary rotate-180" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        {:else}
        <p class="absolute -top-full right-0 text-xs opacity-50">{label_reneder? label_reneder(min):min}</p>
        <p class="absolute -top-full left-0 text-xs opacity-50">{label_reneder? label_reneder(max):max}</p>
        {/if}
        {#if oneside}
        {@const percent = (inputs[0][0]-min)/(max-min) * 100}
        {#if container && show_labels}
        {@const lbl_pos = percent/100 * container.clientWidth}
        {@const lbl_width = lbls[0]?.clientWidth ?? 0}
        {@const lm = lbl_pos + remToPx(0.25) < lbl_width/2? -lbl_width/2+lbl_pos + remToPx(0.25) : container.clientWidth - lbl_pos + 4 < lbl_width/2? lbl_width/2-container.clientWidth+lbl_pos-4 : 0}
        {@const rcr = Math.min(lbl_width/2+lm-4, remToPx(0.375))}
        {@const lcr = Math.min(lbl_width/2-lm-4, remToPx(0.375))}
        <div bind:this={lbls[0]} class="absolute z-10 -top-full -translate-y-1/2 translate-x-1/2 w-max flex flex-col justify-center items-center text-xs text-white" style="right: {percent}%;" >
          <div class="rounded-md p-1 bg-primary" style="transform: translateX({lm}px); border-bottom-left-radius: {lcr}px; border-bottom-right-radius: {rcr}px;">{label_reneder? label_reneder(inputs[0][0]) : inputs[0][0]}</div>
          <svg class="fill-primary rotate-180 w-2 h-2" xmlns="http://www.w3.org/2000/svg" viewBox="{rcr === 0?'5':lcr === 0?'-5':'0'} 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        {/if}
        <div class="absolute h-full top-0 right-0 bg-primary" style="width: {percent}%;">
          <button tabindex="-1" type="button" on:mousedown|preventDefault={(e)=>startMouseDragging(e, 0, 0)} on:touchstart|preventDefault={(e)=>startTouchDragging(e, 0, 0)} aria-label="max value" class="active:scale-125 transition-transform absolute top-0 left-0 -translate-x-1/2 z-10 w-5 h-5 border-2 border-primary bg-under-primary rounded-full cursor-pointer"></button>
          <div class="absolute top-0 right-0 translate-x-1/2 z-10 w-5 h-5 bg-primary rounded-full"></div>
        </div>
        {:else}
        {#each inputs as input, i}
        {@const prev_left = i>0?(inputs[i-1][1]-min)/(max-min) * 100:0}
        {@const right = (input[0]-min)/(max-min) * 100}
        {@const left = (input[1]-min)/(max-min) * 100}
        {@const next_right = i<inputs.length-1?(inputs[i+1][0]-min)/(max-min) * 100:100}
  
        {#if container && show_labels}
        {@const right_label = label_reneder? label_reneder(input[0]) : input[0]}
        {@const left_label = label_reneder? label_reneder(input[1]) : input[1]}
  
        {@const prev_left_px = (lbls.length && i>0? lbls[2*i-1].clientWidth/2+4:0) + prev_left/100 * container.clientWidth}
        {@const right_px = right/100 * container.clientWidth}
        {@const left_px = left/100 * container.clientWidth}
        <!-- {@const next_right_px = next_right/100 * container.clientWidth - (lbls.length && i<inputs.length-1? lbls[2*i+1].clientWidth/2+4:0)} -->
  
        {@const right_label_width = lbls[2*i]?.clientWidth ?? 0}
        {@const left_label_width = lbls[2*i+1]?.clientWidth ?? 0}
  
        <!-- right label margin -->
        {@const rlm = right_px - prev_left_px + remToPx(0.25) < right_label_width/2? -right_label_width/2+right_px-prev_left_px+remToPx(0.25) : 0}
        <!-- left label margin -->
        {@const llm = container.clientWidth - left_px + remToPx(0.25) < left_label_width/2? left_label_width/2-container.clientWidth+left_px-remToPx(0.25) : 0}
  
        {@const merge = (left_px - left_label_width/2 - llm) - (right_px + right_label_width/2 - rlm) < 0}
  
        {#if merge}
        {@const center = (left+right)/2}
        {@const center_px = center/100 * container.clientWidth}
        {@const center_label_width = right_label == left_label? right_label_width : right_label_width+left_label_width+4}
        <!-- center margin -->
        {@const cm = container.clientWidth - center_px + 4 < center_label_width/2? center_label_width/2-container.clientWidth+center_px-4 : center_px - prev_left_px + remToPx(0.25) < center_label_width/2? Math.max(-container.clientWidth+center_label_width/2+remToPx(0.25), -center_label_width/2+center_px-prev_left_px + remToPx(0.25)) : 0}
        {@const log = console.log(container.clientWidth-center_px+center_label_width/2+remToPx(0.25), -center_label_width/2+center_px-prev_left_px + remToPx(0.25))}
        {@const rcr = Math.min(center_label_width/2+cm-4, remToPx(0.375))}
        {@const lcr = Math.min(center_label_width/2-cm-4, remToPx(0.375))}
        <div class="absolute z-10 -top-full -translate-y-1/2 translate-x-1/2 w-max flex flex-col justify-center items-center text-xs text-white" style="right: {center}%;">
          <div class="rounded-md p-1 bg-primary" style="transform: translateX({cm}px); border-bottom-right-radius: {rcr}px; border-bottom-left-radius: {lcr}px;">{right_label == left_label? right_label : right_label+" - "+left_label}</div>
          <svg class="fill-primary rotate-180 w-2 h-2" xmlns="http://www.w3.org/2000/svg" viewBox="{rcr === 0?'5':lcr === 0?'-5':'0'} 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        {/if}
        <!-- right label left corner rounded -->
        {@const rllcr = Math.min(right_label_width/2+rlm-4, remToPx(0.375))}
        <div bind:this={lbls[2*i]} class="absolute z-10 -top-full -translate-y-1/2 translate-x-1/2 w-max flex flex-col justify-center items-center text-xs text-white {merge? "invisible":""}" style="right: {right}%;">
          <div class="rounded-md p-1 bg-primary" style="transform: translateX({rlm}px); border-bottom-right-radius: {rllcr}px;">{right_label}</div>
          <svg class="fill-primary rotate-180 w-2 h-2" xmlns="http://www.w3.org/2000/svg" viewBox="{rllcr === 0?'5':'0'} 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        <!-- left label right corner rounded -->
        {@const llrcr = Math.min(left_label_width/2-llm-4, remToPx(0.375))}
        <div bind:this={lbls[2*i+1]} class="absolute z-10 -top-full -translate-y-1/2 translate-x-1/2 w-max flex flex-col justify-center items-center text-xs text-white {merge? "invisible":""}" style="right: {left}%;">
          <div class="rounded-md p-1 bg-primary" style="transform: translateX({llm}px); border-bottom-left-radius: {llrcr}px;">{left_label}</div>
          <svg class="fill-primary rotate-180 w-2 h-2" xmlns="http://www.w3.org/2000/svg" viewBox="{llrcr === 0?'-5':'0'} 0 56 35"><path d="M 9.5899 50.2070 L 46.4102 50.2070 C 49.9257 50.2070 52.1289 47.6758 52.1289 44.4883 C 52.1289 43.5273 51.8947 42.5664 51.3791 41.6758 L 32.9336 8.6758 C 31.8789 6.7773 29.9570 5.7930 28.0117 5.7930 C 26.0899 5.7930 24.1211 6.7773 23.0664 8.6758 L 4.6446 41.6992 C 4.1289 42.5898 3.8711 43.5273 3.8711 44.4883 C 3.8711 47.6758 6.0977 50.2070 9.5899 50.2070 Z"/></svg>
        </div>
        {/if}
        <div class="absolute h-full top-0 bg-primary" style="right: calc({right}%); width: {left - right}%;">
          <button tabindex="-1" type="button" on:mousedown|preventDefault={(e)=>startMouseDragging(e, i, 0)} on:touchstart|preventDefault={(e)=>startTouchDragging(e, i, 0)} aria-label="min value" class="node0 active:scale-125 transition-transform absolute top-0 right-0 translate-x-1/2 z-10 w-5 h-5 border-2 border-primary bg-under-primary rounded-full cursor-pointer"></button>
          <button tabindex="-1" type="button" on:mousedown|preventDefault={(e)=>startMouseDragging(e, i, 1)} on:touchstart|preventDefault={(e)=>startTouchDragging(e, i, 1)} aria-label="max value" class="node1 active:scale-125 transition-transform absolute top-0 left-0 -translate-x-1/2 z-10 w-5 h-5 border-2 border-primary bg-under-primary rounded-full cursor-pointer"></button>
        </div>
        {/each}
        {/if}
      </div>
    </div>
  </div>
  {#if multiple}
  <button type="button" on:click={removeRange} disabled={inputs.length <= 1} class="shrink-0 text-xs h-5 w-5 rounded-md bg-under-primary hover:bg-primary/20 active:scale-75 text-primary flex flex-row gap-1 items-center justify-center transition-[transform,background-color]">
    <MinusIcon stroke_width={3} class="w-3"/>
    <!-- إضافة مجال -->
  </button>
  <button type="button" on:click={addRange} class="shrink-0 text-xs h-5 w-5 rounded-md bg-under-primary hover:bg-primary/20 active:scale-75 text-primary flex flex-row gap-1 items-center justify-center transition-[transform,background-color]">
    <PlusIcon stroke_width={3} class="w-3"/>
    <!-- إضافة مجال -->
  </button>
  {/if}
</main>