<script lang="ts">
  export let width : number | null | undefined = undefined;
  export let height : number | null | undefined = undefined;
  export let stroke : number | null | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>
<svg xmlns="http://www.w3.org/2000/svg" {width} {height} class={className} viewBox="0 0 24 24" stroke-width={stroke ?? 2} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
</svg>