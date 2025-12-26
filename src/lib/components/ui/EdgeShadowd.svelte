<script lang="ts">
  /**
   * inner element position in px relative to target, needed to update shadows
   */
  export let pos : {value: number, target: number};
  /** @default = col */
  export let direction : 'col' | 'row' = 'col';
  /** @default = 48 */
  export let shadow_length : number = 48;
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

  let className : string | undefined = undefined;
  export { className as class };

  let startShadowEl : HTMLDivElement | undefined;
  let endShadowEl : HTMLDivElement | undefined;

  let upperEl : HTMLDivElement | undefined;

  $: if(pos && upperEl) updateShadows();

  function updateShadows() {
    if(direction === "col") updateColShadows();
    else updateRowShadows();
  }

  function updateColShadows() {
    const abs = Math.abs(pos.value);
    if(startShadowEl){
      const round = Math.floor(abs);
      startShadowEl.style.opacity = `${Math.min(1, (round / shadow_length))*100}%`;
      if(round === 0){
        startShadowEl.style.display = "none";
      }else {
        startShadowEl.style.display = "block";
      }
    }
    if(endShadowEl){
      const round = Math.ceil(abs);
      const heightDiff = pos.target - upperEl!.clientHeight;
      endShadowEl.style.opacity = `${Math.min(1, (heightDiff - round) / shadow_length)*100}%`;
      if(round >= heightDiff){
        endShadowEl.style.display = "none";
      }else {
        endShadowEl.style.display = "block";
      }
    }
  }

  function updateRowShadows() {
    const abs = Math.abs(pos.value);
    const widthDiff = pos.target - upperEl!.clientWidth;
    if(end_shadow){
      const round = Math.floor(abs);
      endShadowEl!.style.opacity = `${Math.min(1, (round / Math.min(widthDiff, shadow_length)))*100}%`;
      if(round === 0){
        endShadowEl!.style.display = "none";
      }else {
        endShadowEl!.style.display = "block";
      }
    }
    if(start_shadow){
      const round = Math.ceil(abs);
      startShadowEl!.style.opacity = `${Math.min(1, (widthDiff - round) / Math.min(widthDiff, shadow_length))*100}%`;
      if(round >= widthDiff){
        startShadowEl!.style.display = "none";
      }else {
        startShadowEl!.style.display = "block";
      }
    }
  }

</script>

<div class="h-full w-full max-h-full max-w-full overflow-hidden relative {className? className : ''}">
  {#if start_shadow}
  <div bind:this={startShadowEl} style="z-index: {shadow_zindex}; {direction === 'col'? `height: ${shadow_length}px; width: 100%;` : `width: ${shadow_length}px; height: 100%;`}" class="absolute {direction === "row"? 'right-0 top-0 bg-linear-to-l' : 'top-0 right-0 bg-linear-to-b'} {shadow_color.start ?? shadow_color.color} select-none pointer-events-none"></div>
  {/if}
  <div bind:this={upperEl} class="h-full w-full max-w-full max-h-full">
    <slot/>
  </div>
  {#if end_shadow}
  <div bind:this={endShadowEl} style="z-index: {shadow_zindex}; {direction === 'col'? `height: ${shadow_length}px; width: 100%;` : `width: ${shadow_length}px; height: 100%;`}" class="absolute {direction === "row"? 'left-0 top-0 bg-linear-to-r' : 'bottom-0 right-0 bg-linear-to-t'} {shadow_color.end ?? shadow_color.color} select-none pointer-events-none"></div>
  {/if}
</div>