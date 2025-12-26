<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { AriaRole } from "svelte/elements";

  export let id : string | null | undefined = undefined;
  export let name : string | null | undefined = undefined;
  export let value : any = null;
  export let checked : boolean | null | undefined = undefined;
  export let dir : "auto" | "rtl" | "ltr" | null | undefined = undefined;
  export let disabled : boolean | null | undefined = undefined;
  export let hidden : boolean | null | undefined = undefined;
  /** @default = false */
  export let hideInput : boolean = false;
  export let group : any = null;
  export let readonly : boolean | null | undefined = undefined;
  export let required : boolean | null | undefined = undefined;
  export let role : AriaRole | null | undefined = undefined;
  export let unselectable : "on" | "off" | null | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<label 
  for={id}
  class="cursor-pointer py-[0.664125rem] px-5 w-full h-[3.3rem] text-[15px] text-primary-trans border-primary-hairline border select-none has-[:checked]:!bg-under-primary has-[:checked]:!text-primary has-[:checked]:!border-transparent transition-[background-color,color,border-color] flex items-center justify-between gap-0 rounded-xl"
  {dir} 
  {hidden}
>
  <span class="font-semibold">
    <slot />
  </span>
  <div class="relative shrink-0 w-5 h-5 rounded-full border-[3px] border-primary-hairline has-[:checked]:border-primary transition-all duration-200">
    <input
      on:change={(e)=>dispatch('change', e)}
      class="cursor-pointer appearance-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full checked:h-[0.625rem] checked:w-[0.625rem] rounded-full bg-transparent checked:bg-primary"
      style="transition: width 200ms 100ms, height 200ms 100ms, background-color 200ms"
      type= "radio"
      {id}
      {name}
      {value}
      {checked}
      hidden={hideInput}
      {disabled}
      bind:group={group}
      {readonly}
      {required}
      {role}
      {unselectable}
    />
  </div>
</label>