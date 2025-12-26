<script lang="ts">
	import EdgeShadowd from "./EdgeShadowd.svelte";
	import { afterUpdate } from "svelte";

  /** @default = col */
  export let direction : 'col' | 'row' = 'col';
  /** @default = false */
  export let disable_oppsite_dir_scroll: boolean = false;
  /** @default = 25 */
  export let shadow_length : number = 25;
  /** @default = { color: 'from-white from-25% to-transparent' } */
  export let shadow_color : 
  {start: string, end: string, color?: undefined} | 
  {start?: undefined, end?: undefined, color: string} = {color: 'from-bg to-transparent'};
  /** @default = true */
  export let start_shadow : boolean = true;
  /** @default = true */
  export let end_shadow : boolean = true;
  /** @default = 50 */
  export let shadow_zindex : number = 50;
  /** @default = false */
  export let no_scrollbar : boolean = false;
  /** @default = undefined */
  export let scrollbar_color : string | undefined = undefined;
  /** @default = true */
  export let user_scrolling : boolean = true;

  let className : string | undefined = undefined;
  export { className as class };
  export let wrapperClass : string | undefined = undefined;

  let scrollElement : HTMLDivElement;
  export let scrollNeeded : boolean = false;
  export let oppsiteScrollNeeded : boolean = false;

  let scrollPos: {value: number, target: number};
  function updateScrollPos(){
    scrollPos = direction === "col"? {value: scrollElement!.scrollTop, target: scrollElement!.scrollHeight} : {value: scrollElement!.scrollLeft, target: scrollElement!.scrollWidth};
  }

  export function updateScrollState() {
    const col = (scrollElement?.scrollHeight ?? 0) > (scrollElement?.clientHeight ?? 0);
    const row = (scrollElement?.scrollWidth ?? 0) > (scrollElement?.clientWidth ?? 0);
    scrollNeeded = direction === "col"? col : row;
    oppsiteScrollNeeded = direction === "col"? row : col;
  }
  afterUpdate(updateScrollState);
  $: if((scrollNeeded || !scrollNeeded) && scrollElement) updateScrollPos();

  export function scrollTo(options: ScrollToOptions) {
    if(scrollElement) {
      scrollElement.scrollTo(options);
    }
  }
</script>

<EdgeShadowd
pos={scrollPos}
class={wrapperClass? wrapperClass : ''}
{direction}
{shadow_length}
{shadow_color}
{start_shadow}
{end_shadow}
{shadow_zindex}>
  <div 
  bind:this={scrollElement} 
  on:scroll={updateScrollPos} 
  style={no_scrollbar || !scrollNeeded? 'scrollbar-width: none;' : scrollbar_color?`scrollbar-color: ${scrollbar_color};`:''} 
  class="{user_scrolling? '' : 'pointer-events-none touch-none '}h-full w-full max-w-full max-h-full {direction === "col"? 'overflow-y-scroll' : 'overflow-x-scroll'} {disable_oppsite_dir_scroll? "overflow-hidden" : ""} {className? className : ''}">
    <slot/>
  </div>
</EdgeShadowd>