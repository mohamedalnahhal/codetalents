<script lang="ts">
  export let label: string;
  export let active = false;        // initial state
  export let direction: "rtl"|"ltr" = "rtl";
  export let small = false;

  // Dispatch event when toggled
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function toggle() {
    active = !active;
    // dispatch("change", { active });
  }

  $:if(active || !active) dispatch("change", { active });
</script>

<input type="checkbox" bind:checked={active} hidden {...$$restProps}>
<button
  role="switch"
  aria-checked={active}
  aria-label={label}
  on:click={toggle}
  class="relative {small? "w-10 h-5" : "w-12 h-6"} rounded-full transition-colors focus:outline-none cursor-pointer {active ? "bg-primary-s2" : "bg-gray-300"}"
>
  <span
    class="absolute top-1 left-1 {small? "w-3 h-3" : "w-4 h-4"}  bg-white rounded-full shadow-md transition-transform {
      active ? 
      (direction=="ltr"? small? "translate-x-5" : "translate-x-6" : "translate-x-0") :
      "scale-90 "+(direction=="ltr"? "translate-x-0" : small? "translate-x-5" : "translate-x-6")
    }"
  ></span>
</button>