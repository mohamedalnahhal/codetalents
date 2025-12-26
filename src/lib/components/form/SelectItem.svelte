<script lang="ts">
	import { CheckmarkIcon } from "$lib";

  export let option: {label: string, value: any};
  export let slotted = false;
  export let checked = false;
  export let handleSelect: (option: {label: string, value: any})=>void;

  let className: string | null | undefined = undefined;
  export {className as class};
</script>

<li
  role="option"
  aria-selected={checked}
>
<button
type="button"
on:click={()=>{handleSelect(option); checked = !checked;}}
data-checked={checked}
class:bg-gray-100={checked}
class:dark:bg-under-primary={checked}
class="flex flex-row gap-2 items-center justify-between select-none w-full text-left px-2 py-1 text-sm rounded-md hover:bg-gray-200 transition-colors cursor-pointer font-normal {className ?? ""}"
{...$$restProps}
>
{#if slotted}
<slot><!-- optional fallback --></slot>
{:else}
{option.label}
<div class="shrink-0 {checked? "opacity-100" : "opacity-0"} text-gray-500 transition-opacity">
  <CheckmarkIcon class="w-4" />
</div>
{/if}
</button>
</li>