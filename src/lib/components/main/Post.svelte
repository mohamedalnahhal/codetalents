<script lang="ts">
	import MessageCircleIcon from "$lib/icons/regular/MessageCircleIcon.svelte";
	import ThumbUpIcon from "$lib/icons/regular/ThumbUpIcon.svelte";
	import { actual_theme } from "../../../stores/theme";

  export let id: string;
  export let username: string;
  export let points: number;
  export let rank: number | undefined = undefined; 
  export let date: Date;
  export let text: string;
  export let imgs: File[] | undefined = undefined;

  export let status: -1 | 0 | 1 = 0;
  export let n_like: number;
  export let n_dislike: number;
  export let n_comment: number;
  
  function like(){
    if(status == 1) status = 0;
    else status = 1;
  }

  function dislike(){
    if(status == -1) status = 0;
    else status = -1;
  }
</script>
<div class="border-primary-hairline border rounded-lg py-2 px-3 mb-2">
  <div class="flex flex-row items-start gap-2">
    <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
    <div class="text-on-primary flex flex-col items-start">
      <a href="" class="font-semibold text-sm hover:underline">{username}</a>
      <span class="text-xs font-normal">{points} pts</span>
    </div>
    {#if rank}
    <div class="bg-violet-200 dark:bg-[#7b46bd]/10 text-[#7b46bd] text-xs rounded-md px-1 py-0.5 font-semibold">
      Rank #{rank}
    </div>
    {/if}
    <span class="text-gray-500 text-xs mt-1">{date.toDateString()}</span>
  </div>
  <p class="mx-1 my-2 dark:text-gray-600">
    {text}
  </p>
  <hr class="text-primary-hairline border-primary-hairline my-2" />
  <div class="flex flex-row gap-1 text-gray-700 text-sm">
    <button on:click={like} class="flex flex-row gap-1 items-center cursor-pointer rounded-lg px-1.5 hover:text-on-primary transition-all {status==1? `font-semibold ${$actual_theme === "dark"? "":"bg-primary-s1 hover:bg-primary-s2"}` : "hover:bg-gray-200 py-1"}"><ThumbUpIcon fill={status==1? ($actual_theme === "dark"? "var(--color-primary)":"var(--color-on-primary)") : "none"} stroke={status==1?0:2} class="mb-0.5 transition-all {status==1? "text-on-primary w-5": "w-4 "}"/>{n_like > 0? n_like : ""} Like</button>
    <button on:click={dislike} class="flex flex-row gap-1 items-center cursor-pointer rounded-lg px-1.5 hover:text-on-primary transition-all {status==-1? `font-semibold  ${$actual_theme === "dark"? "":"bg-primary-s1 hover:bg-primary-s2"}`: "hover:bg-gray-200 py-1"}"><ThumbUpIcon fill={status==-1? ($actual_theme === "dark"? "var(--color-primary)":"var(--color-on-primary)") : "none"} stroke={status==-1?0:2} class="w-4 rotate-180 -mb-0.5 transition-all {status==-1? "text-on-primary w-5": "w-4"}"/>{n_dislike > 0? n_dislike : ""} Dislike</button>
    <button class="flex flex-row gap-1 items-center cursor-pointer rounded-lg hover:bg-gray-200 hover:text-on-primary py-1 px-1.5 transition-colors"><MessageCircleIcon class="w-4 -mb-0.5"/>{n_comment > 0? n_comment : ""} Comment</button>
  </div>
</div>