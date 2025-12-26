<script lang="ts">
  import CheckmarkIcon from "$lib/icons/regular/CheckmarkIcon.svelte";
	import { createEventDispatcher } from "svelte";
	import type { AriaRole } from "svelte/elements";

  export let id : string | null | undefined = undefined;
  export let name : string | null | undefined = undefined;
  export let value : any = null;
  export let checked : boolean | null | undefined = undefined;
  export let dir : "auto" | "rtl" | "ltr" | null | undefined = undefined;
  export let disabled : boolean | null | undefined = undefined;
  export let hidden : boolean | null | undefined = undefined;
  export let group : any = null;
  export let readonly : boolean | null | undefined = undefined;
  export let required : boolean | null | undefined = undefined;
  export let role : AriaRole | null | undefined = undefined;
  export let unselectable : "on" | "off" | null | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<label 
  for={id}
  class="cursor-pointer py-[0.664125rem] pr-5 pl-3 w-full h-[3.3rem] text-[15px] text-primary-trans border-primary-hairline border select-none has-[:checked]:!bg-under-primary has-[:checked]:!text-primary has-[:checked]:!border-transparent transition-[background-color,color,border-color] flex items-center justify-between gap-0 rounded-xl"
  {dir} 
  {hidden}
>
  <span class="font-semibold">
    <slot />
  </span>
  <div class="relative shrink-0 w-6 h-6">
    <input
      on:change={(e)=>dispatch('change', e)}
      class="peer cursor-pointer appearance-none"
      type="checkbox"
      hidden
      {id}
      {name}
      {value}
      bind:checked={checked}
      {disabled}
      bind:group={group}
      {readonly}
      {required}
      {role}
      {unselectable}
    />
    <div class="opacity-0 peer-checked:opacity-100 h-3 w-3 peer-checked:h-full peer-checked:w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
      <CheckmarkIcon />
    </div>
  </div>
</label>