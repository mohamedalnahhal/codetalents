<script lang="ts">
	import PopoverMenu from "$lib/components/ui/PopoverMenu.svelte";
	import PopoverMenuContent from "$lib/components/ui/PopoverMenuContent.svelte";
	import PopoverMenuItem from "$lib/components/ui/PopoverMenuItem.svelte";
	// import ToggleButton from "$lib/components/ui/ToggleButton.svelte";
	import ArrowLeftIcon from "$lib/icons/regular/ArrowLeftIcon.svelte";
	import ArrowUpLeftIcon from "$lib/icons/regular/ArrowUpLeftIcon.svelte";
	import FlameIcon from "$lib/icons/regular/FlameIcon.svelte";
	import LogoutIcon from "$lib/icons/regular/LogoutIcon.svelte";
	import PopoverSubmenu from "$lib/components/ui/PopoverSubmenu.svelte";
	import BellIcon from "$lib/icons/regular/BellIcon.svelte";
	import MessageCircleIcon from "$lib/icons/regular/MessageCircleIcon.svelte";
	import PlusIcon from "$lib/icons/regular/PlusIcon.svelte";
	import Tooltip from "$lib/components/ui/Tooltip.svelte";
	import BrightnessIcon from "$lib/icons/regular/BrightnessIcon.svelte";
	import { CheckmarkIcon } from "$lib";
	import { theme, actual_theme } from "../../stores/theme";
	import { onMount } from "svelte";
  import { page } from "$app/state";

  if (page.data.theme) $theme = page.data.theme;

	let { data } = $props();

  let profileMenuOpen = $state(false);
  function profileMenuHandler() {
    profileMenuOpen = false;
  }
  let logoSrc = $state("./imgs/logo.png");

  onMount(()=>{
    actual_theme.subscribe((v)=>{
      logoSrc = v === "dark"? "./imgs/logo-dark.png":"./imgs/logo.png";
    })
  })

  let resetNotifications = $state(true);
  async function notifications() {
    const res = await fetch("/notifications");
    if(res.ok){
      return await res.json();
    }
    else throw Error("failed to load notifications");
  }
</script>

<header class="w-full top-0 z-1000 {page.url.pathname === "/"? "h-18":"h-14"} sticky border-b border-primary-hairline bg-bg shadow-md shadow-black/3 dark:shadow-black/15">
  <!-- <nav class="m-auto h-full {page.url.pathname === "/problem"? "w-full" : page.url.pathname === "/"? "px-8 max-w-7xl" : "px-6 max-w-7xl"}"> -->
    <div class="m-auto h-full {page.url.pathname === "/problem"? "w-full" : page.url.pathname === "/"? "px-8 max-w-7xl" : "px-6 max-w-7xl"} h-full m-auto flex flex-row gap-1 justify-between items-center">
      <div class="flex flex-row gap-3 items-center">
        <a href="/" class="{page.url.pathname === "/"? "text-2xl":"text-xl"} font-semibold flex flex-row items-center gap-3 text-on-primary mr-1 my-3.5">
          <img class={page.url.pathname === "/"? "h-8":"h-7"} src={logoSrc} alt="" srcset="">
          <h1>CodeTalents</h1>
        </a>
        <nav class="flex flex-row items-center h-full max-md:hidden">
          <a class="hover:bg-gray-200 transition-colors p-2 rounded-xl" href="/home">Home</a>
          <a class="hover:bg-gray-200 transition-colors p-2 rounded-xl" href="/contests">Contests</a>
          <a class="hover:bg-gray-200 transition-colors p-2 rounded-xl" href="/problemset">Problem Set</a>
          <a class="hover:bg-gray-200 transition-colors p-2 rounded-xl" href="">Leaderboard</a>
        </nav>
      </div>
      {#if data.user}
      <div class="flex flex-row items-center justify-center gap-2">
        <div class="max-lg:hidden flex flex-row bg-[#f4e6b0] dark:bg-[#b67629]/15 text-[#b67629] p-1 px-2 rounded-full">
          <FlameIcon class="w-4"/>
          <div class="text-sm">
            <span class="font-semibold">+142 pts</span>
            today
          </div>
        </div>
        <div class="max-md:hidden flex flex-row items-center gap-1">
          <div class="bg-violet-200 rounded-full flex flex-row pl-2 pr-1 dark:bg-[#a578ff]/15 text-[#7b46bd] dark:text-[#a578ff]">
            Rank
            <ArrowLeftIcon class="-rotate-90 w-4 -ml-0.5 text-[#814bc2] dark:text-[#8249f3]" stroke={3}/>
          </div>
          <div>
            <span class="text-gray-500">#</span><span class="font-bold text-[#7c5fb6] dark:text-[#8249f3] text-xl">9</span>
          </div>
        </div>
        <div class="flex flex-row-reverse items-center gap-1.5 ms-2">
          <PopoverMenu class="rounded-full! p-1!" slotted hideArrow bind:open={profileMenuOpen}>
            <img slot="head" class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
            <PopoverMenuContent>
              <div class="text-on-primary flex flex-col items-start p-2 pt-1">
                <span class="font-semibold text-sm">{data.user.username}</span>
                <span class="text-xs font-normal">{data.user.rating} pts</span>
              </div>
              <hr class="m-1 text-gray-300 border-gray-300"/>
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="profile" slotted class="group flex flex-row gap-2 items-center justify-between">
                <ArrowUpLeftIcon stroke={1} class="w-6 opacity-60 group-hover:opacity-100"/>
                Profile
              </PopoverMenuItem>
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="setting" slotted class="group flex flex-row gap-2 items-center justify-between">
                <ArrowUpLeftIcon stroke={1} class="w-6 opacity-60 group-hover:opacity-100"/>
                Setting
              </PopoverMenuItem>
              <hr class="m-1 text-gray-300 border-gray-300"/>
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="teams" slotted class="group flex flex-row gap-2 items-center justify-between">
                <ArrowUpLeftIcon stroke={1} class="w-6 opacity-60 group-hover:opacity-100"/>
                Teams
              </PopoverMenuItem>
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="submissions" slotted class="group flex flex-row gap-2 items-center justify-between">
                <ArrowUpLeftIcon stroke={1} class="w-6 opacity-60 group-hover:opacity-100"/>
                Submissions
              </PopoverMenuItem>
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="contest" slotted class="group flex flex-row gap-2 items-center justify-between">
                <ArrowUpLeftIcon stroke={1} class="w-6 opacity-60 group-hover:opacity-100"/>
                Contests
              </PopoverMenuItem>
              <hr class="m-1 text-gray-300 border-gray-300"/>
              <PopoverSubmenu role="listbox" haspopup="listbox" label="Appearance">
                <PopoverMenuItem slotted={$theme === "dark"} role="option" label="Dark" action={()=>{$theme = "dark";}} handleItemClick={profileMenuHandler} class={$theme === "dark"? "flex flex-row gap-2 justify-between  bg-gray-200 hover:bg-gray-300" : ""}>
                  Dark
                  <CheckmarkIcon class="w-4 text-gray-500"/>
                </PopoverMenuItem>
                <PopoverMenuItem slotted={$theme === "light"} role="option" label="Light" action={()=>{$theme = "light";}} handleItemClick={profileMenuHandler} class={$theme === "light"? "flex flex-row gap-2 justify-between bg-gray-200 hover:bg-gray-300" : ""}>
                  Light
                  <CheckmarkIcon class="w-4 text-gray-500"/>
                </PopoverMenuItem>
                <PopoverMenuItem slotted={$theme === "sys"} role="option" label="System" action={()=>{$theme = "sys";}} handleItemClick={profileMenuHandler} class={$theme === "sys"? "flex flex-row gap-2 justify-between bg-gray-200 hover:bg-gray-300" : ""}>
                  System
                  <CheckmarkIcon class="w-4 text-gray-500"/>
                </PopoverMenuItem>
              </PopoverSubmenu>
              <hr class="m-1 text-gray-300 border-gray-300"/>
              <!-- TODO: make slot named icon to automaticly add flex and align icon -->
              <PopoverMenuItem el="a" rest={{href: `/logout${page.url.pathname !== "/"? `?continue=${page.url.pathname}` : "" }`}} handleItemClick={profileMenuHandler} label="logout" slotted class="group flex flex-row gap-2 items-center justify-between">
                <LogoutIcon stroke={1} class="w-6 rotate-180 opacity-60 group-hover:opacity-100"/>
                Logout
              </PopoverMenuItem>
            </PopoverMenuContent>
          </PopoverMenu>
          <PopoverMenu class="rounded-full! p-2! bg-gray-200 hover:bg-gray-300" slotted hideArrow>
            <svelte:fragment slot="head">
              <BellIcon class="w-5" />
            </svelte:fragment>
            <PopoverMenuContent width="14rem">
              <span class="sticky top-0 inline-block w-full rounded-t-lg bg-bg outline-[calc(var(--spacing)*1)] outline-bg py-1 px-2 mb-1 text-gray-500 text-xs font-normal">
                Notifications
              </span>
              {#key resetNotifications}
              {#await notifications()}
              loading ...
              {:then notifications} 
              {#each notifications as notification}
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="profile" slotted class="group flex flex-row gap-2 items-center justify-between">
                {notification.message}
              </PopoverMenuItem>
              {/each}
              {:catch}
              <div class="w-full flex flex-col gap-2 text-center items-center justify-center">
                <span></span>failed to load notifications!
                <button class="bg-error-bg text-error py-1 px-2 rounded-md mb-4 cursor-pointer" onclick={()=>{resetNotifications = resetNotifications}}>
                  try again
                </button>
              </div>
              {/await}
              {/key}
            </PopoverMenuContent>
          </PopoverMenu>
          <PopoverMenu class="rounded-full! p-2! bg-gray-200 hover:bg-gray-300" slotted hideArrow>
            <svelte:fragment slot="head">
              <MessageCircleIcon class="w-5" />
            </svelte:fragment>
            <PopoverMenuContent width="14rem">
              <span class="sticky top-0 inline-block w-full rounded-t-lg bg-bg outline-[calc(var(--spacing)*1)] outline-bg py-1 px-2 mb-1 text-gray-500 text-xs font-normal">
                Messages
              </span>
              {#key resetNotifications}
              {#await notifications()}
              loading ...
              {:then notifications} 
              {#each notifications as notification}
              <PopoverMenuItem el="a" rest={{href: ""}} handleItemClick={profileMenuHandler} label="profile" slotted class="group flex flex-row gap-2 items-center justify-between">
                {notification.message}
              </PopoverMenuItem>
              {/each}
              {:catch}
              <div class="w-full flex flex-col gap-2 text-center items-center justify-center">
                <span></span>failed to load messages!
                <button class="bg-error-bg text-error py-1 px-2 rounded-md mb-4 cursor-pointer" onclick={()=>{resetNotifications = resetNotifications}}>
                  try again
                </button>
              </div>
              {/await}
              {/key}
            </PopoverMenuContent>
          </PopoverMenu>
          {#if page.url.pathname === "/home"}
          <Tooltip delay={500}>
            <span slot="content">Create Post</span>
            <button class="flex flex-row gap-1 text-sm font-semibold rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"><PlusIcon class="w-4"/> Create</button>
          </Tooltip>
          {/if}
        </div>
      </div>
      {:else}
      <div class="flex flex-row items-center gap-2">
        <a href="/login" class="rounded-full font-semibold bg-gray-200 hover:bg-gray-300 px-3 py-1 cursor-pointer transition-colors">Login</a>
        <a href="/signup" class="max-sm:hidden rounded-full font-semibold bg-primary-s1 hover:bg-primary-s2 px-3 py-1 cursor-pointer transition-colors">Sign Up</a>
        <button aria-label="theme switch" type="button" class="hover:bg-gray-300 cursor-pointer p-1 rounded-full transition-colors" onclick={()=>{$theme = ($actual_theme == "dark"? "light" : "dark")}}>
          <BrightnessIcon stroke={1} class="w-6"/>
        </button>
      </div>
      {/if}
    </div>
  <!-- </nav> -->
</header>

<slot/>