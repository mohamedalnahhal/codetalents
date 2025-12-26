<script lang="ts">
  export let align: "right"|"left" = "right";
  export let role: "menu" | "listbox" | "tree" = "menu";
  export let width = "10rem";
  let className: string | null | undefined = undefined;
  export {className as class};
</script>
<ul
{role}
style="width: {width};"
class="absolute z-50 mt-2 rounded-lg bg-bg shadow-lg ring-1 ring-black/10 dark:ring-white/10 origin-top transition {
  align === "right" ? "right-0" : "left-0"
} {className?? ""}"
{...$$restProps}
>
  <div class="max-h-[60dvh] overflow-y-auto p-1 space-y-1">
    <slot />
  </div>
</ul>