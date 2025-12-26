<script lang="ts">
  export let width : number | null | undefined = undefined;
  export let height : number | null | undefined = undefined;
  export let stroke : number | null | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>
<svg xmlns="http://www.w3.org/2000/svg" {width} {height} class={className} viewBox="0 0 24 24" stroke-width={stroke ?? 2} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="7" y1="7" x2="17" y2="17" />
  <polyline points="16 7 7 7 7 16" />
</svg>