<script lang="ts">
	import Calender from "$lib/components/utils/Calender.svelte";
</script>

<div class="fixed z-40 top-14 h-4 w-full bg-bg"></div>
<div class="max-w-7xl m-auto flex flex-row gap-2 p-4 overflow-clip">
  <slot />
  <aside class="w-3xs shrink-0 flex flex-col gap-2 sticky top-18 h-fit max-h-[calc(100svh-5.5rem)] overflow-y-auto">
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
  </aside>
</div>