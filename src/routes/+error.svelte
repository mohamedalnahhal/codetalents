<script lang="ts">
	import { onMount } from "svelte";
  import { page } from '$app/state';

  let logoSrc = "/imgs/logo.png";

  onMount(()=>{
    logoSrc = document.documentElement.classList.contains('dark')? './imgs/logo-dark.png':'./imgs/logo.png';
  })
</script>

<div class="p-4 mx-auto max-[28rem]:w-full w-fit min-[28rem]:w-md min-h-svh flex flex-col justify-center items-center gap-1">
  <a href="/" class="text-xl font-semibold flex flex-row items-center gap-2 text-on-primary mb-3">
    <img id="logo" class="h-6" src="/imgs/logo.png" alt="" srcset="">
    CodeTalents
  </a>
  <div class="rounded-xl p-6 mb-2 font-semibold text-center text-red-500 bg-red-500/10 ring-1 ring-red-500/30">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-20 m-auto" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
    </svg>
    <h1 class="font-bold mb-4">Status: {page.status}</h1>
    <p>{page.error?.message}</p>
  </div>
  <p class="text-gray-500 text-center">
    Refresh this page. <br>
    If the problem persists, please contact us. <br>
    <a class="hover:text-gray-700 hover:underline" href="mailto:feedback@codetalents.com">feedback@codetalents.com</a>
  </p>
</div>