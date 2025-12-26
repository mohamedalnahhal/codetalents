<script lang="ts">
  export let width : number | null | undefined = undefined;
  export let height : number | null | undefined = undefined;
  export let stroke : number | null | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>
<svg xmlns="http://www.w3.org/2000/svg"  {width} {height} class={className} viewBox="0 0 24 24" stroke-width={stroke ?? 2} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <line x1="3" y1="6" x2="3" y2="19" />
  <line x1="12" y1="6" x2="12" y2="19" />
  <line x1="21" y1="6" x2="21" y2="19" />
</svg>