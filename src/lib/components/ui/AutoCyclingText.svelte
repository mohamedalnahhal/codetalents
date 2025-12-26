<script lang="ts">
	import EdgeShadowd from "./EdgeShadowd.svelte";
	import { onDestroy, onMount, tick } from "svelte";

  /**
   * speed in px/s
   * @default = 100 
   */
  export let speed: number = 100;
  /** 
   * pause time after each cycle in ms
   * if false no pause time
   * if true text will be cycled once
   * @default = 2000 
   */
  export let cycle_pause: number | boolean = 2000;
  /** @default = 500 */
  export let wait_to_start: number | false = 500;
  /** @default = 10 */
  export let shadow_length : number = 10;
  /** @default = { color: 'from-white from-25% to-transparent' } */
  export let shadow_color : 
  {start: string, end: string, color?: undefined} | 
  {start?: undefined, end?: undefined, color: string} = {color: 'from-white from-25% to-transparent'};
  /** @default = true */
  export let start_shadow : boolean = true;
  /** @default = true */
  export let end_shadow : boolean = true;
  /** @default = 50*/
  export let shadow_zindex : number = 50;

  let x: number = 0, d: number = 0;
  let thisEl: HTMLElement;
  let textEl: HTMLParagraphElement;

  let textWidth: number = 0;
  let needCycling: boolean = false;
  function checkNeedCycling() {
    textWidth = needCycling? textEl.clientWidth/2 - 24 : textEl.clientWidth;
    const diff = textWidth - thisEl.parentElement!.clientWidth;
    if(diff > 0) {
      resizeObserver?.unobserve(thisEl);
      needCycling = true;
    }
    else {
      resizeObserver?.observe(thisEl);
      needCycling = false;
    }
  }

  function startCycling() {
    const neededDuration = Math.round(textEl.clientWidth/speed)*1000;
    const neededTranslation = textEl.clientWidth/2 + 24;
    const resetCycle = async ()=>{
      d = 0;
      x = 0;
      checkNeedCycling();
      if(!needCycling || cycle_pause === true) return;
      await tick();
      if(cycle_pause){
        setTimeout(cycleText, cycle_pause)
      } else {
        cycleText();
      }
    }
    const cycleText = async ()=>{
      d = neededDuration;
      x = neededTranslation;
      await tick();
      setTimeout(resetCycle, d);
    }
    if(wait_to_start) setTimeout(cycleText, wait_to_start);
    else cycleText();
  }

  async function updateCyclingState() {
    if(textEl){
      checkNeedCycling();
      if(needCycling) {
        await tick();
        startCycling();
      }
    }
  }

  let resizeObserver : ResizeObserver | undefined;
  onMount(()=>{
    resizeObserver = new ResizeObserver(updateCyclingState);
    updateCyclingState();
  });
  onDestroy(()=>{resizeObserver?.disconnect()});
</script>

<main bind:this={thisEl} style={needCycling? `max-width: ${textWidth}px;` : ""}>
  {#if needCycling}
  <EdgeShadowd
  pos={{value:x, target:textEl?.clientWidth}}
  direction="row"
  {start_shadow}
  {end_shadow}
  {shadow_length}
  {shadow_color}
  {shadow_zindex}>
    <p
    bind:this={textEl}
    dir="auto"
    style="transform: translateX({x}px); transition-duration: {d}ms;"
    class="w-max transition-transform ease-linear whitespace-nowrap">
      <slot/>
      <span class="inline-block w-10"></span>
      <slot/>
    </p>
  </EdgeShadowd>
  {:else}
  <p
  bind:this={textEl}
  dir="auto"
  class="w-max whitespace-nowrap">
    <slot/>
  </p>
  {/if}
</main>