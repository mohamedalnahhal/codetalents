<script>
	import Calender from "$lib/components/utils/Calender.svelte";
	import SearchIcon from "$lib/icons/regular/SearchIcon.svelte";
	import Input from "$lib/components/form/Input.svelte";
</script>
<div class="max-w-7xl m-auto flex flex-row gap-2 p-4">
  <aside class="w-xs shrink-0 flex-col gap-2 sticky z-40 top-18 h-fit max-h-[calc(100svh-5.5rem)] overflow-y-auto hidden lg:flex">
    <div class="w-full border-primary-hairline border rounded-lg p-3 pt-2.5">
      <div class="flex flex-row gap-1 items-center mb-3">
        <SearchIcon class="w-4" />
        <h2 class="text-on-primary font-semibold">Find User</h2>
      </div>
      <form name="find_user" action="">
        <Input id="username_input_0e2xq234" placeholder="username" name="username" type="text">
          <svelte:fragment slot="icon">
            <span class="text-gray-900">@</span>
          </svelte:fragment>
        </Input>
        <div class="mt-3">
          <button class="rounded-md text-sm font-semibold bg-primary-s1 px-2 py-1 cursor-pointer hover:bg-primary-s2 transition-colors">Find</button>
          <button class="rounded-md text-sm font-semibold bg-gray-200 text-gray-700 px-2 py-1 cursor-pointer hover:bg-gray-300 transition-colors">Friend request</button>
        </div>
      </form>
    </div>
    <div class="w-full border-primary-hairline border rounded-lg p-2">
      <h2 class="py-1 px-2 mb-1 font-semibold">Friends</h2>
      <ul class="pl-2 overflow-hidden text-sm text-gray-700">
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          <div class="flex flex-row items-start gap-2">
            <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
            <div class="text-on-primary flex flex-col items-start">
              <a href="" class="text-sm hover:underline">mohammedalnahhal</a>
              <span class="text-xs font-normal">94357 pts</span>
            </div>
            <div class="bg-violet-200 text-[#7c5fb6] text-xs rounded-md px-1 py-0.5 font-semibold">
              Rank #9
            </div>
          </div>
        </li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          <div class="flex flex-row items-start gap-2">
            <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
            <div class="text-on-primary flex flex-col items-start">
              <a href="" class="text-sm hover:underline">moh3kkks</a>
              <span class="text-xs font-normal">532 pts</span>
            </div>
          </div>
        </li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          <div class="flex flex-row items-start gap-2">
            <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
            <div class="text-on-primary flex flex-col items-start">
              <a href="" class="text-sm hover:underline">kingsaleh</a>
              <span class="text-xs font-normal">122 pts</span>
            </div>
          </div>
        </li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
          <div class="flex flex-row items-start gap-2">
            <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
            <div class="text-on-primary flex flex-col items-start">
              <a href="" class="text-sm hover:underline">fouadkhalid</a>
              <span class="text-xs font-normal">120090 pts</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
  <slot />
  <aside class="w-3xs shrink-0 flex flex-col gap-2 sticky z-40 top-18 h-fit max-h-[calc(100svh-5.5rem)] overflow-y-auto">
    <div class="w-full border-primary-hairline border rounded-lg p-2">
      <!-- <div class="bg-under-primary rounded-lg w-full h-42 mb-1">
      </div> -->
      <Calender class="mb-2" events={[
        {name: "ACPC 2026 Finals", starts: new Date(2025, 10, 22, 9), ends: new Date(2025, 10, 24, 11)},
        {name: "ICPC 2026 Early", starts: new Date(2025, 11, 22, 9), ends: new Date(2025, 11, 26, 9)},
        {name: "Shough Mid Finals", starts: new Date(2025, 10, 11, 9), ends: new Date(2025, 10, 12, 21)},
        {name: "Weekly Contest 025", starts: new Date(2025, 10, 15, 9), ends: new Date(2025, 10, 15, 11)},
        {name: "Weekly Contest 026", starts: new Date(2025, 10, 22, 9), ends: new Date(2025, 10, 22, 11)},
        {name: "Weekly Contest 027", starts: new Date(2025, 10, 29, 9), ends: new Date(2025, 10, 29, 11)},
        {name: "Weekly Contest 028", starts: new Date(2025, 11, 6, 9), ends: new Date(2025, 11, 6, 11)},
        {name: "Weekly Contest 029", starts: new Date(2025, 11, 13, 9), ends: new Date(2025, 11, 13, 11)},
        {name: "Weekly Contest 030", starts: new Date(2025, 11, 20, 9), ends: new Date(2025, 11, 20, 11)},
        {name: "Weekly Contest 030", starts: new Date(2025, 11, 27, 9), ends: new Date(2025, 11, 27, 11)},
        ]}/>
      <h2 class="py-1 px-2">Upcomming Events</h2>
      <ol class="ml-2 mb-2 text-sm text-gray-700 list-decimal list-inside">
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.75"><a class="hover:underline" href="">ACPC 2026 Finals</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.75"><a class="hover:underline" href="">Shough Mid Finals</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.75"><a class="hover:underline" href="">Weekly Contest 025</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.75"><a class="hover:underline" href="">Weekly Contest 026</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.75"><a class="hover:underline" href="">Weekly Contest 027</a></li>
      </ol>
    </div>
    <div class="w-full border-primary-hairline border rounded-lg p-2">
      <h2 class="py-1 px-2">Problems For You</h2>
      <ul class="pl-2 mb-2 overflow-hidden text-sm text-gray-700">
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">Twin Polynomials</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">Paring Dogs</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">Spleting Markets</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">Umbrella Noo</a></li>
      </ul>
      <h2 class="py-1 px-2">Trending</h2>
      <ul class="pl-2 mb-2 overflow-hidden text-sm text-gray-700">
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">#new_scoring_system</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">#icpc_finals</a></li>
        <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-0.5"><a class="hover:underline" href="">#communication_problems</a></li>
      </ul>
    </div>
    <div class="w-full flex flex-col gap-2 sticky z-40 top-0 lg:hidden">
      <div class="w-full border-primary-hairline border rounded-lg p-3 pt-2.5">
        <div class="flex flex-row gap-1 items-center mb-3">
          <SearchIcon class="w-4" />
          <h2 class="text-on-primary font-semibold">Find User</h2>
        </div>
        <form name="find_user" action="">
          <Input id="username_input_0e2xq234" placeholder="username" name="username" type="text">
            <svelte:fragment slot="icon">
              <span class="text-gray-900">@</span>
            </svelte:fragment>
          </Input>
          <div class="mt-3">
            <button class="rounded-md text-sm font-semibold bg-primary-s1 px-2 py-1 cursor-pointer hover:bg-primary-s2 transition-colors">Find</button>
            <button class="rounded-md text-sm font-semibold bg-gray-200 text-gray-700 px-2 py-1 cursor-pointer hover:bg-gray-300 transition-colors">Friend request</button>
          </div>
        </form>
      </div>
      <div class="w-full border-primary-hairline border rounded-lg p-2">
        <h2 class="py-1 px-2 mb-1 font-semibold">Friends</h2>
        <ul class="pl-2 overflow-hidden text-sm text-gray-700">
          <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
            <div class="flex flex-row items-start gap-2">
              <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
              <div class="text-on-primary flex flex-col items-start">
                <a href="" class="text-sm hover:underline">mohammedalnahhal</a>
                <span class="text-xs font-normal">94357 pts</span>
              </div>
              <div class="bg-violet-200 text-[#7c5fb6] text-xs rounded-md px-1 py-0.5 font-semibold">
                Rank #9
              </div>
            </div>
          </li>
          <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
            <div class="flex flex-row items-start gap-2">
              <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
              <div class="text-on-primary flex flex-col items-start">
                <a href="" class="text-sm hover:underline">moh3kkks</a>
                <span class="text-xs font-normal">532 pts</span>
              </div>
            </div>
          </li>
          <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
            <div class="flex flex-row items-start gap-2">
              <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
              <div class="text-on-primary flex flex-col items-start">
                <a href="" class="text-sm hover:underline">kingsaleh</a>
                <span class="text-xs font-normal">122 pts</span>
              </div>
            </div>
          </li>
          <li class="whitespace-nowrap text-ellipsis overflow-hidden mb-2">
            <div class="flex flex-row items-start gap-2">
              <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
              <div class="text-on-primary flex flex-col items-start">
                <a href="" class="text-sm hover:underline">fouadkhalid</a>
                <span class="text-xs font-normal">120090 pts</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</div>