<script lang="ts">
	import { createEventDispatcher } from "svelte";

  export let style : 'tonal' | 'primary' | 'secondry' = 'primary';
  let className: string|undefined = undefined;
  export {className as class}
  /** default false */
  export let small : boolean = false;
  /** default false */
  export let prevent_default : boolean = false;

  const dispatch = createEventDispatcher();
</script>
<button
  on:click={(e)=>{if(prevent_default) e.preventDefault(); dispatch('click', e)}}
  class="w-full px-2 cursor-pointer {small? 'py-1' : 'h-[3.3rem] py-[0.664125rem]'} text-[15px] {style === 'primary'? 'bg-primary text-on-primary hover:bg-primary-dark-s1' : style === 'tonal'? 'bg-under-primary text-primary border border-primary-hairline' : ''} rounded-lg transition-colors {className? className:''}"
  {...$$restProps}
>
  <slot />
</button>