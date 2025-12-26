<script>
	import ChevronDownIcon from "$lib/icons/regular/ChevronDownIcon.svelte";
	import ListIcon from "$lib/icons/regular/ListIcon.svelte";
	import SearchIcon from "$lib/icons/regular/SearchIcon.svelte";

</script>
<style>
  table tr td:nth-child(2), table tr th:nth-child(2) {
    text-align: start;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<main class="flex-3 grow">
  <div class="mb-3 flex flex-row gap-2 items-center px-2">
    <ListIcon class="w-5" />
    <h1 class="text-2xl font-semibold text-on-primary me-2">Contests</h1>
    <button class="flex flex-row gap-2 justify-between px-3 cursor-pointer py-1 rounded-full bg-gray-200 min-w-24 text-center">
      Contest
      <ChevronDownIcon class="w-4 text-gray-500" />
    </button>
  </div>
  <div class="flex flex-row gap-1.5 items-center text-sm -mb-2 px-2.5 pt-2.5 pb-4.5 rounded-t-xl border border-b-0 border-primary-hairline">
    <div class="pe-2 me-1 border-e border-gray-400">
      <button class="flex flex-row gap-1 justify-between cursor-pointer p-1 px-2 min-w-24 rounded-lg border-primary-hairline bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors">
        Select Randomly
      </button>
    </div>
    <div class="relative grow">
      <label for="problem_search_input_i48dl2" class="text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2">
        <SearchIcon class="w-3.5" />
      </label>
      <input id="problem_search_input_i48dl2" class="pr-3 pl-8 py-1 w-full bg-gray-100 focus:bg-under-primary outline focus:outline-2 outline-primary-hairline rounded-lg focus:outline-primary-s2 placeholder:text-gray-400" placeholder="search" name="problem_search" type="search" />
    </div>
    <button class="flex flex-row gap-1 justify-between px-3 py-1 cursor-pointer rounded-lg bg-gray-200 text-gray-600 min-w-24 text-center">
      Tags
      <ChevronDownIcon class="w-4 text-gray-500" />
    </button>
    <button class="flex flex-row gap-1 justify-between px-3 py-1 cursor-pointer rounded-lg bg-gray-200 text-gray-600 min-w-24 text-center">
      Points
      <ChevronDownIcon class="w-4 text-gray-500" />
    </button>
    <button class="flex flex-row gap-1 justify-between px-3 py-1 cursor-pointer rounded-lg bg-gray-200 text-gray-600 min-w-24 text-center">
      Solve Rate
      <ChevronDownIcon class="w-4 text-gray-500" />
    </button>
  </div>
  <table class="w-full">
    <thead class="bg-primary-s1 text-on-primary text-sm shadow-md">
      <tr>
        <th class="text-start font-semibold border-on-primary!">#</th>
        <th class="text-start font-semibold border-on-primary!">Name</th>
        <th class="text-start font-semibold border-on-primary!">Points</th>
        <th class="text-start font-semibold border-on-primary!">Solve Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td class="flex flex-row gap-2 items-center">
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
          <div class="flex flex-row gap-1">
            <div class="rounded-full min-w-10 text-center p-0.5 px-1.5 text-xs bg-amber-500/20 text-amber-600 font-semibold">Graphs</div>
            <div class="rounded-full min-w-10 text-center p-0.5 px-1.5 text-xs bg-teal-500/20 text-teal-600 font-semibold">DP</div>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">C. Twin Polynomials</a>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
    </tbody>
  </table>
</main>