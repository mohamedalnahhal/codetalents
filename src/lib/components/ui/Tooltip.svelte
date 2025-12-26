<script lang="ts">
	import { browser } from "$app/environment";
  import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  export let placement: "top" | "bottom" | "left" | "right" | "auto" = "auto";
  export let delay: number = 120;     // ms before showing
  export let hideDelay: number = 50;  // ms before hiding
  export let maxWidth: string = "320px";
  export let interactive: boolean = false; // if true, tooltip won't hide on pointerenter
  let className: string = ""; // extra classes for tooltip box
  export {className as class}

  const dispatch = createEventDispatcher();

  let anchorEl: HTMLElement;
  let tipEl: HTMLElement;
  let visible = false;
  let showTimer: any = null;
  let hideTimer: any = null;

  // compute actual placement at show time (if 'auto' flip)
  let resolvedPlacement = placement;

  function clearTimers() {
    if (showTimer) { clearTimeout(showTimer); showTimer = null; }
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  }

  function scheduleShow() {
    clearTimers();
    showTimer = setTimeout(async () => {
      visible = true;
      await computePlacementAndPosition();
      dispatch("show");
      showTimer = null;
    }, delay);
  }

  function scheduleHide() {
    clearTimers();
    hideTimer = setTimeout(() => {
      visible = false;
      dispatch("hide");
      hideTimer = null;
    }, hideDelay);
  }

  function onAnchorEnter() {
    scheduleShow();
  }
  function onAnchorLeave() {
    if (!interactive) {
      scheduleHide();
    }
  }

  function onTipEnter() {
    if (interactive) {
      // keep visible while pointer is over tooltip
      clearTimers();
      visible = true;
    }
  }
  function onTipLeave() {
    if (interactive) scheduleHide();
  }

  // keyboard: show on focus, hide on blur / Escape
  function onAnchorFocus() {
    scheduleShow();
  }
  function onAnchorBlur() {
    scheduleHide();
  }
  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      clearTimers();
      visible = false;
      dispatch("hide");
    }
  }

  // compute placement and set CSS transform/position
  async function computePlacementAndPosition() {
    await tick();
    if (!anchorEl || !tipEl) return;

    const anchor = anchorEl.getBoundingClientRect();
    const tip = tipEl.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    // candidate placements in priority order
    const candidates = placement === "auto"
      ? ["bottom", "top", "right", "left"]
      : [placement];

    // helper to check fit
    function fits(p: string) {
      if (p === "bottom") return (vh - anchor.bottom) >= tip.height + 8;
      if (p === "top") return anchor.top >= tip.height + 8;
      if (p === "left") return anchor.left >= tip.width + 8;
      if (p === "right") return (vw - anchor.right) >= tip.width + 8;
      return true;
    }

    //@ts-ignore
    resolvedPlacement = candidates.find(fits) || candidates[0];

    // Position tip by style variables (set on tipEl)
    // We'll compute left/top in viewport coords and use transform translate for small offsets.
    let top = 0;
    let left = 0;

    const spacing = 8; // gap between anchor and tip
    if (resolvedPlacement === "top") {
      top = anchor.top - tip.height - spacing;
      left = anchor.left + (anchor.width - tip.width) / 2;
    } else if (resolvedPlacement === "bottom") {
      top = anchor.bottom + spacing;
      left = anchor.left + (anchor.width - tip.width) / 2;
    } else if (resolvedPlacement === "left") {
      top = anchor.top + (anchor.height - tip.height) / 2;
      left = anchor.left - tip.width - spacing;
    } else { // right
      top = anchor.top + (anchor.height - tip.height) / 2;
      left = anchor.right + spacing;
    }

    // Clamp so tooltip doesn't overflow viewport too much
    const pad = 6;
    left = Math.min(Math.max(left, pad), vw - tip.width - pad);
    top = Math.min(Math.max(top, pad), vh - tip.height - pad);

    // apply styles (use fixed positioning so scroll doesn't move it incorrectly)
    tipEl.style.position = "fixed";
    tipEl.style.left = `${Math.round(left)}px`;
    tipEl.style.top = `${Math.round(top)}px`;

    // set a data-placement for CSS arrow direction
    tipEl.setAttribute("data-placement", resolvedPlacement);
  }

  // reposition on scroll/resize while visible
  function onWindowChange() {
    if (visible) computePlacementAndPosition();
  }

  onMount(() => {
    window.addEventListener("resize", onWindowChange, { passive: true });
    window.addEventListener("scroll", onWindowChange, true);
    document.addEventListener("keydown", onKeydown);
  });

  onDestroy(() => {
    clearTimers();
    if(browser){
      window.removeEventListener("resize", onWindowChange);
      window.removeEventListener("scroll", onWindowChange, true);
      document.removeEventListener("keydown", onKeydown);
    }
  });

  // helper: allow parent to programmatically show/hide via component methods if needed
  /** @returns current visibility */
  export function isVisible() { return visible; }
  export function show() { scheduleShow(); }
  export function hide() { scheduleHide(); }
</script>

<style>
  /* base tooltip box */
  .tooltip-box {
    z-index: 10000;
    pointer-events: auto;
    max-width: var(--tooltip-max-width, 320px);
    padding: 0.5rem;
    box-shadow: 0 6px 6px rgba(5, 20, 6, 0.15);
    border: 1px solid var(--color-primary-hairline);
    transition: opacity 140ms ease, transform 160ms ease;
    transform-origin: center;
    position: absolute;
  }

  .tooltip-box::before {
    content: "";
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    rotate: 45deg;
    position: absolute;
    background: inherit;
  }

  /* visually-hidden helper for SR-only content if needed */
  .sr-only {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden; clip: rect(1px,1px,1px,1px);
    white-space: nowrap; border: 0; padding: 0; margin: -1px;
  }

  /* small responsive tweaks */
  @media (max-width: 520px) {
    .tooltip-box { font-size: 12px; padding: 6px 8px; }
  }
</style>

<!--
  Usage pattern: <Tooltip content="..." placement="top"> <button>Hover me</button> </Tooltip>
-->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div style="display: inline-block;" on:mouseenter={onAnchorEnter} on:mouseleave={onAnchorLeave}
      on:focusin={onAnchorFocus} on:focusout={onAnchorBlur}
      on:touchstart={onAnchorEnter}
      bind:this={anchorEl}
      tabindex="0"
      aria-describedby="svelte-tooltip"
      class="tooltip-anchor"
>
  <slot />
</div>

{#if visible}
  <p role="tooltip"
        class="tooltip-box w-fit text-sm text-center bg-[#092313] dark:bg-white text-white dark:text-black rounded-lg 
        {resolvedPlacement === "top"? "before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-1/2":
        resolvedPlacement === "bottom"? "before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2":
        resolvedPlacement === "left"? "before:right-0 before:top-1/2 before:translate-x-1/2 before:-translate-y-1/2":
        "before:left-0 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2"}
        {className}"
        bind:this={tipEl}
        style="--tooltip-max-width: {maxWidth}"
        on:mouseenter={onTipEnter}
        on:mouseleave={onTipLeave}
        transition:fly={{
        y: resolvedPlacement === 'top' ? 6 : (resolvedPlacement === 'bottom' ? -6 : 0),
        x: resolvedPlacement === 'left' ? 6 : (resolvedPlacement === 'right' ? -6 : 0),
        duration: 180,
        opacity: 0.0,
        easing: cubicOut
      }}>
    <slot name="content"><!-- optional fallback --></slot>
  </p>
{/if}
