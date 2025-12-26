<script lang="ts">
	import ChevronDownIcon from '$lib/icons/regular/ChevronDownIcon.svelte';
	import { popover } from '$lib/svelte-actions/popover';
	import { tick } from 'svelte';

  interface props {
    title?: string,
    open?: boolean,
    hideArrow?: boolean,
    slotted?: boolean,
    hideDelay?: number,
    haspopup?: "menu" | boolean | "listbox" | "tree",
    class?: string,
  }

  let {
    title = "Menu",
    open = $bindable(false),
    hideArrow = false,
    slotted = false,
    hideDelay = 0,
    haspopup = "menu",
    class: className,
    ...rest
  } : props = $props();

  let visible = $state(false);
  let showing = $state(false);

  let showTimer: NodeJS.Timeout | null = null;
  let hideTimer: NodeJS.Timeout | null = null;

  function clearTimers() {
    if (showTimer) { clearTimeout(showTimer); showTimer = null; }
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  }

  function scheduleShow() {
    clearTimers();
    visible = true;
    tick().then(()=>{
      showTimer = setTimeout(() => {
        showing = true;
        showTimer = null;
      });
    })
  }

  function scheduleHide() {
    clearTimers();
    showing = false;
    tick().then(()=>{
      hideTimer = setTimeout(() => {
        visible = false;
        hideTimer = null;
      }, 150);
    })
  }

  $effect(()=>{
    if(open) scheduleShow();
    else {
      if(visible) scheduleHide();
    }
  })

  let opacity = $derived(showing ? 1.0 : 0.0);
  let transform_y = $derived(showing ? "0px" : "-10px");
  let scale = $derived(showing ? 1 : 0.95);
</script>

<div class="relative inline-block text-left shrink-0" use:popover={{onClose: ()=>{open=false}}}>
  <!-- Trigger -->
  <button
    onclick={() => (open = !open)}
    type="button"
    data-open={open}
    aria-haspopup={haspopup}
    aria-expanded={open}
    class="inline-flex justify-between items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors {className ?? ""}"
    {...rest}
  >
    {#if slotted}
    <slot name="head"><!-- optional fallback --></slot>
    {:else}
    {title}
    {/if}
    {#if !hideArrow}
    <ChevronDownIcon class="w-3 mt-0.5 transition-transform {open? "rotate-180" : "rotate-0"}"/>
    {/if}
  </button>

  <!-- Popup -->
  <div style="--popover-opacity: {opacity}; --popover-transform-y: {transform_y}; --popover-scale: {scale};" class="popover-list {(!visible)? "hidden":""}">
    <slot><!-- optional fallback --></slot>
  </div>
</div>