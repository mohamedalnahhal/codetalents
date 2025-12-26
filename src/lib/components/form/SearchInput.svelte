<script lang="ts">
	import SearchIcon from "$lib/icons/regular/SearchIcon.svelte";
	import Input from "./Input.svelte";

  export let id: string;
  export let placeholder = "search";

  let className: string | null | undefined = undefined;
  export {className as class};
</script>

<Input {id} {placeholder} class={className} type="search" {...$$restProps}>
  <svelte:fragment slot="icon">
    <SearchIcon class="w-3.5" />
  </svelte:fragment>
</Input>