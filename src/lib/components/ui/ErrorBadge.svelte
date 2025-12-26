<script lang="ts">
	import ExclamationIcon from "$lib/icons/regular/ExclamationIcon.svelte";
	import XmarkIcon from "$lib/icons/regular/XmarkIcon.svelte";
	import { createEventDispatcher } from "svelte";

  /** @default = false */
  export let shake: boolean = false;
  /** @default = false */
  export let closable: boolean = false;

  let className : string | undefined = undefined;
  export { className as class };

  let closed = false;
  const dispatch = createEventDispatcher();
</script>

<div class="w-fit flex flex-row items-center rounded-lg bg-error-bg text-error {closed? 'hidden' : ''} {shake? 'animate-shake-once' : ''} {className ?? ''}">
  <div class="px-3 rounded-s-lg">
    <ExclamationIcon height={12} />
  </div>
  <div class="h-full py-4 w-px border-e border-current/40"></div>
  <span class="text-sm px-3 mb-0.5">
    <slot><!-- msg --></slot>
  </span>
  {#if closable}
  <div class="grow"></div>
  <button
  type="button"
  class="shrink-0 h-6 w-6 p-1 m-1 rounded-full hover:bg-error-bg transition-colors cursor-pointer" 
  on:click|preventDefault|stopPropagation={(e)=>{
    closed = true;
    dispatch('close', e);
  }}>
    <XmarkIcon width={16}/>
  </button>
  {/if}
</div>