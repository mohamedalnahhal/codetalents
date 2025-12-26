<script lang="ts">
  export let or : boolean | null | undefined = undefined;
  /** @default = 'او' */
  export let orText : string = 'or';
  /** @default = 'border-primary-hairline' */
  export let color : string = 'border-primary-hairline';
</script>
{#if or}
<div class="w-full px-2 flex flex-row items-center gap-3">
  <hr class="w-full border-t {color}"/>
  <span class="text-gray-500 text-sm">{orText}</span>
  <hr class="w-full border-t {color}"/>
</div>
{:else}
<hr class="border-t {color}"/>
{/if}