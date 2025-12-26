<script lang="ts">
	import { Hr } from "$lib";
	import Input from "$lib/components/form/Input.svelte";
	import LockIcon from "$lib/icons/regular/LockIcon.svelte";
	import LoginIcon from "$lib/icons/regular/LoginIcon.svelte";
	import UserIcon from "$lib/icons/regular/UserIcon.svelte";
	import ErrorBadge from "$lib/components/ui/ErrorBadge.svelte";
	import SpinnerLoading from "$lib/components/animations/SpinnerLoading.svelte";
	import BrightnessIcon from "$lib/icons/regular/BrightnessIcon.svelte";
	import { onMount } from "svelte";
	import { actual_theme, theme } from "../../stores/theme";
	import { enhance } from "$app/forms";

  let {form} = $props();

  onMount(()=>{
    actual_theme.subscribe((v)=>{
      logoSrc = v === "dark"? "./imgs/logo-dark.png":"./imgs/logo.png";
    })
  })

  let loading = $state(false);
  let logoSrc = $state("./imgs/logo.png");
</script>
<div class="p-4 mx-auto max-[28rem]:w-full w-fit min-[28rem]:w-md min-h-svh flex flex-col justify-center items-center gap-1">
  <div class="w-full flex flex-row justify-between gap-2 ps-2 mb-3">
    <a href="/" class="text-xl font-semibold flex flex-row items-center gap-2 text-on-primary">
      <!-- {#if browser} -->
      <img class="h-6" src={logoSrc} alt="" srcset="">
      <!-- {/if} -->
      CodeTalents
    </a>
    <button aria-label="theme switch" type="button" class="hover:bg-gray-300 cursor-pointer p-1 rounded-full transition-colors" onclick={()=>{$theme = ($actual_theme == "dark"? "light" : "dark")}}>
      <BrightnessIcon stroke={1} class="w-6"/>
    </button>
  </div>
  <div class="w-full ring-1 ring-primary-hairline rounded-xl p-3">
    <div class="flex flex-row gap-1 items-center mt-1 ms-1 {form?.error? "mb-4" : "mb-8"}">
      <LoginIcon stroke={1} class="w-7" />
      <h1 class="text-xl font-semibold text-gray-700">Login</h1>
    </div>
    <form method="POST" use:enhance={()=>{
      loading = true;
      return ({update})=>{loading = false; update({reset: false});}
    }}>
      {#if form?.error}
      <ErrorBadge class="mb-5" shake>{form.error}</ErrorBadge>
      {/if}
      <div class="mb-3">
        <Input id="username_input_43s21a" placeholder="username" name="username" type="text" required class="bg-bg! py-2">
          <svelte:fragment slot="icon">
            <UserIcon class="w-4" />
          </svelte:fragment>
        </Input>
      </div>
      <div class="mb-2">
        <Input id="password_input_f432xghj" placeholder="password" name="password" type="password" required class="bg-bg! py-2">
          <svelte:fragment slot="icon">
            <LockIcon class="w-4" />
          </svelte:fragment>
        </Input>
      </div>
      <a class="hover:underline hover:text-gray-600 text-sm text-gray-500 ms-1" href="">Forgot your password?</a>
      <button disabled={loading} class="bg-primary-s1 p-2 w-full flex flex-row gap-2 justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-primary-s2 mt-6 mb-2 transition-colors">
        {#if loading}
        <SpinnerLoading spin class="block -ms-6"/>
        {/if}
        Login
      </button>
      <Hr or />
      <button class="bg-gray-200 p-2 w-full rounded-full font-semibold cursor-pointer hover:bg-gray-300 mt-2 mb-4 transition-colors">Continue with Google</button>
      <a class="hover:underline hover:text-gray-600 m-auto w-fit block text-sm text-gray-500 mb-3" href="/signup">Don't have an account? Sign Up</a>
    </form>
  </div>
</div>