<script lang="ts">
  export let id: string;
  let className: string | null | undefined = undefined;
  export {className as class};
</script>

{#if $$slots.icon}
<div class="relative">
  <label for={id} class="text-gray-600 absolute left-2.5 top-1/2 -translate-y-1/2">
    <slot name="icon"><!-- optional fallback --></slot>
  </label>
  <input {id} class="pr-3 pl-8 py-1 w-full bg-gray-100 focus:bg-under-primary outline focus:outline-2 outline-primary-hairline rounded-xl focus:outline-primary-s2 placeholder:text-gray-400 {className ?? ""}" {...$$restProps} />
</div>
{:else}
<input {id} class="px-3 py-1 w-full bg-gray-100 focus:bg-under-primary outline focus:outline-2 outline-primary-hairline rounded-xl focus:outline-primary-s2 placeholder:text-gray-400 {className ?? ""}" {...$$restProps} />
{/if}