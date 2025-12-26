<script lang="ts">
	import { onMount } from "svelte";

  let expanded = false;
  let isOverflowing = false;
  let textEl: HTMLParagraphElement;

  onMount(() => {
    // Detect if the text is longer than the visible area
    isOverflowing = textEl.scrollHeight > textEl.clientHeight;
  });
</script>

  <p
    bind:this={textEl}
    class="transition-all whitespace-pre-wrap {expanded ? 'line-clamp-none' : 'line-clamp-12'}"
  >
    {#if !expanded}
    <slot><!-- optional fallback --></slot>
      {#if isOverflowing}
        <button class="text-primary-dark-s1 cursor-pointer hover:underline inline ml-0.5" on:click={() => (expanded = true)}>
          ...more
        </button>
      {/if}
    {:else}
    <slot><!-- optional fallback --></slot>
      <button class="text-primary-dark-s1 cursor-pointer hover:underline inline ml-0." on:click={() => (expanded = false)}>
        Show less
      </button>
    {/if}
  </p>
