<script lang="ts">
  export let width : number | null | undefined = undefined;
  export let height : number | null | undefined = undefined;
  export let stroke : number | null | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };
</script>
<svg xmlns="http://www.w3.org/2000/svg" {width} {height} class={className} viewBox="0 0 24 24" stroke-width={stroke ?? 2} stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
</svg>