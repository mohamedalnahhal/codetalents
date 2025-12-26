<script lang="ts">
  // export let label: string;
  // export let action: (() => void) | undefined = undefined;
  // export let handleItemClick: (() => void) | undefined = undefined;
  // export let el: string = "button";
  // export let slotted = false;
  // export let role: "menuitem"|"listitem"|"treeitem"|"option" = "menuitem";

  interface props {
    label: string,
    action?: (() => void) | undefined ,
    handleItemClick?: (() => void) | undefined,
    el?: string
    slotted?: boolean,
    role?: "menuitem"|"listitem"|"treeitem"|"option",
    class?: string | undefined,
    rest?: any
  }

  let {
    label,
    action = undefined,
    handleItemClick = undefined,
    el = "button",
    slotted = false,
    role = "menuitem",
    class: className,
    rest = undefined
  } : props = $props();

</script>

<li 
{role}
>
<svelte:element
this={el}
onclick={() => {action?.(); handleItemClick?.()}}
class="block select-none w-full text-start px-2 py-1 text-sm rounded-md hover:bg-gray-200 transition-colors cursor-pointer font-normal {className ?? ""}"
{...rest}
>
{#if slotted}
<slot><!-- optional fallback --></slot>
{:else}
{label}
{/if}
</svelte:element>
</li>