<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
	import PopoverMenu from '../ui/PopoverMenu.svelte';
	import PopoverMenuContent from '../ui/PopoverMenuContent.svelte';
	import SelectItem from './SelectItem.svelte';

  export let align: "right"|"left" = "right";
  export let options: { label: string; value: string }[] = [];
  export let value: string | string[] | null = null;
  export let title: string;
  export let placeholder = "Select…";
  export let multiple = false;
  export let name: string | undefined = undefined; // for forms
  export let list_width: string = "10rem";
  export let stick_placeholder = false;

  let className: string | null | undefined = undefined;
  export {className as class};

  let open = false;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (multiple && !Array.isArray(value)) value = [];
    if (!multiple && Array.isArray(value)) value = null;
  });


  function isSelected(v: string) {
    return multiple
      ? (value as string[] | null)?.includes(v) ?? false
      : value === v;
  }

  function selectOption(option: { label: string; value: any; }) {
    if (multiple) {
      const arr = new Set(value as string[]);
      if (arr.has(option.value)) arr.delete(option.value);
      else arr.add(option.value);
      value = [...arr];
    } else {
      if(value === option.value) value = null;
      else value = option.value;
      open = false
    }

    dispatch('change', value);
  }
</script>

<!-- Hidden input for real forms -->
{#if name}
  <!-- SINGLE -->
  {#if !multiple}
    <input type="hidden" name={name} value={value ?? ''} />
  {/if}

  <!-- MULTI -->
  {#if multiple && value}
    {#each value as v}
      <input type="hidden" name={name} value={v} />
    {/each}
  {/if}
{/if}

<PopoverMenu bind:open={open} haspopup="listbox" title={multiple? placeholder : stick_placeholder ? placeholder : options.find(o => o.value === value)?.label ?? placeholder} class="border border-primary-hairline !py-1 text-gray-600 font-normal {className ?? ""}" {...$$restProps}>
  <PopoverMenuContent {align} role="listbox" width={list_width}>
    <span class="sticky top-0 inline-block w-full rounded-t-lg bg-bg outline-[calc(var(--spacing)*1)] outline-bg py-1 px-2 mb-1 text-gray-500 text-xs font-normal">{title}</span>
    {#key value}
    {#each options as option}
    <SelectItem checked={isSelected(option.value)} {option} handleSelect={selectOption} />
    {/each}
    {/key}
  </PopoverMenuContent>
</PopoverMenu>
