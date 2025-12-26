<script lang="ts">
	import ChevronDownIcon from "$lib/icons/regular/ChevronDownIcon.svelte";


  interface props {
    items: { question: string; answer: string }[],
    class?: string,
  }
  let { items = [], class: className } : props = $props();

  /** Stores index of open item, or -1 if none open */
  let openIndex = $state(-1);

  function toggle(index: number) {
    openIndex = (openIndex === index ? -1 : index);
  }
</script>

<div class="w-full {className ?? ""}">
  {#each items as item, i}
    <div class="border-b border-gray-300 py-4">
      <button
        class="w-full text-lg flex justify-between items-center text-left font-medium text-gray-800 hover:text-txt-primary transition-colors"
        onclick={() => toggle(i)}
      >
        {item.question}

        <span class="transition-transform"
          style:transform={openIndex === i ? "rotate(180deg)" : "rotate(0deg)"}>
          <ChevronDownIcon class="w-6" />
        </span>
      </button>

      <div
        class="overflow-hidden transition-all duration-300 text-gray-600"
        style:height={openIndex === i ? "auto" : "0"}
      >
        {#if openIndex === i}
          <p class="mt-2 pr-6 leading-relaxed">
            {item.answer}
          </p>
        {/if}
      </div>
    </div>
  {/each}
</div>
