<script lang="ts">
  export let width : number | null | undefined = undefined;
  export let height : number | null | undefined = undefined;
  export let stroke : number | null | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>
<svg xmlns="http://www.w3.org/2000/svg" {width} {height} class={className} viewBox="0 0 24 24" stroke-width={stroke ?? 2} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <line x1="9" y1="10" x2="9.01" y2="10" />
  <line x1="15" y1="10" x2="15.01" y2="10" />
  <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
</svg>