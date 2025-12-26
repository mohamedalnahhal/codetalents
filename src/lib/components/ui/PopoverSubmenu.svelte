<script lang="ts">
	import { browser } from "$app/environment";
  import ChevronDownIcon from "$lib/icons/regular/ChevronDownIcon.svelte";
  import { tick } from "svelte";

  export let role: "menu" | "listbox" | "tree" = "menu";
  export let haspopup: "menu" | boolean | "listbox" | "tree" = "menu";

  export let label: string;
  export let open = false;
  export let hideDelay: number = 0;

  let visible = false;
  let showing = false;

  let showTimer: any = null;
  let hideTimer: any = null;
  let closeTimer: any = null;

  function clearTimers() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    clearTimeout(closeTimer);
  }

  function scheduleShow() {
    clearTimers();
    visible = true;
    tick().then(() => {
      showTimer = setTimeout(() => {
        showing = true;
        showTimer = null;
      }, 10);
    });
  }

  function scheduleHide() {
    clearTimers();
    showing = false;

    hideTimer = setTimeout(() => {
      visible = false;
      hideTimer = null;
    }, 120);
  }

  function toggle() {
    open = !open;
    open ? scheduleShow() : scheduleHide();
  }

  function delayedClose() {
    if(!open) return;
    if (!hideDelay) return (open = false);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      open = false;
    }, hideDelay);
  }

  $: if (browser) {
    if (open) scheduleShow();
    else if (!open && visible) scheduleHide();
  }
  
  let liOffset = 0;

  $: opacity = showing ? 1 : 0;
  $: scale = showing ? 1 : 0.96;
  $: transform_x = showing ? "calc(var(--spacing) * -1)" : "0px";

  export let className: string | null | undefined = undefined;
  export { className as class };
</script>

<!-- TODO: repurpose existing component in this componente eg. PopoverMenuContent -->
{#if browser}
<li
  class="select-none"
  on:mouseenter={(e) => {
    open = true;
    if (!browser) return;
    if(!e.currentTarget || !e.currentTarget.parentElement) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement.getBoundingClientRect();
    liOffset = rect.top - parentRect.top;
  }}
  on:mouseleave={() => delayedClose()}>
  <button
  type="button"
  data-open={open}
  aria-haspopup={haspopup}
  aria-expanded={open}
  on:click|stopPropagation={() => toggle()}
  class="group w-full cursor-pointer flex items-center justify-between pe-2 ps-1.5 py-1 rounded-md hover:bg-gray-200  {className ?? ''}">
    <!-- Right arrow -->
    <ChevronDownIcon stroke={1} class="w-6 h-6 rotate-90 mr-2 opacity-60 group-hover:opacity-100 transition" />
    <!-- Label -->
    <span class="text-sm">{label}</span>
  </button>

  <!-- Submenu Popup -->
  <div class="absolute top-0 -mr-1 right-full origin-top-right pr-1 z-[999] w-max min-w-25 {visible ? '' : 'hidden'}"
    style="transform: translateY({liOffset}px)">
    <ul
      {role}
      class="bg-bg rounded-lg shadow-lg ring-1 ring-black/10 dark:ring-white/10 p-1 space-y-1 transition"
      style="
      --submenu-opacity:{opacity};
      --submenu-scale:{scale};
      --submenu-transform-x:{transform_x};
      opacity: var(--submenu-opacity);
      transform: translateX(var(--submenu-transform-x)) scale(var(--submenu-scale));"
    >
      <slot><!-- nested items --></slot>
    </ul>
  </div>
</li>
{/if}