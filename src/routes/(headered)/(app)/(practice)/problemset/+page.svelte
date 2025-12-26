<script lang="ts">
	import { SearchInput } from "$lib";
	import PopoverMenu from "$lib/components/ui/PopoverMenu.svelte";
	import PopoverMenuContent from "$lib/components/ui/PopoverMenuContent.svelte";
	import PopoverMenuItem from "$lib/components/ui/PopoverMenuItem.svelte";
	import Select from "$lib/components/form/Select.svelte";
	import ListIcon from "$lib/icons/regular/ListIcon.svelte";
	import XmarkIcon from "$lib/icons/regular/XmarkIcon.svelte";
	import { tick } from "svelte";

  const tagOptions = [
    { label: "Brute Force", value: "brute force" },
    { label: "Greedy", value: "greedy" },
    { label: "Implementation", value: "implementation" },
    { label: "Dynamic Programming (DP)", value: "dp" },
    { label: "Math", value: "math" },
    { label: "Constructive Algorithms", value: "constructive algorithms" },
    { label: "Bitmasks", value: "bitmasks" },
    { label: "Two Pointers", value: "two pointers" },
    { label: "Divide and Conquer", value: "divide and conquer" },
    { label: "Binary Search", value: "binary search" },
    { label: "Ternary Search", value: "ternary search" },
    { label: "Meet-in-the-Middle", value: "meet-in-the-middle" },

    // Data Structures
    { label: "Data Structures", value: "data structures" },
    { label: "Trees", value: "trees" },
    { label: "Graphs", value: "graphs" },
    { label: "DFS and Similar", value: "dfs and similar" },
    { label: "Shortest Paths", value: "shortest paths" },
    { label: "DSU (Disjoint Set Union)", value: "dsu" },
    { label: "Hashing", value: "hashing" },
    { label: "Strings", value: "strings" },
    { label: "String Suffix Structures", value: "string suffix structures" },
    { label: "Trie", value: "trie" },
    { label: "Stack", value: "stack" },
    { label: "Queue", value: "queue" },
    { label: "Priority Queue", value: "priority queue" },

    // Graph Theory
    { label: "Flows", value: "flows" },
    { label: "Graph Matchings", value: "graph matchings" },

    // Math
    { label: "Number Theory", value: "number theory" },
    { label: "Combinatorics", value: "combinatorics" },
    { label: "Geometry", value: "geometry" },
    { label: "Fast Fourier Transform (FFT)", value: "fft" },

    // Special
    { label: "Games", value: "games" },
    { label: "Interactive", value: "interactive" },
    { label: "Probabilities", value: "probabilities" },
    { label: "Matrices", value: "matrices" },
    { label: "Chinese Remainder Theorem", value: "chinese remainder theorem" },
    { label: "Expression Parsing", value: "expression parsing" },
    { label: "Sortings", value: "sortings" },

    // Misc
    { label: "Challenges", value: "challenges" },
    { label: "Tutorial", value: "tutorial" },
    { label: "Experimental", value: "experimental" }
  ];
  const pointsOptions = [
    {label: "Points < 50",value: "lt50"},
    {label: "Points < 100",value: "lt100"},
    {label: "Points < 150",value: "lt150"},
    {label: "Points >= 150",value: "btq150"}
  ];
  const solveRateOptions = [
    {label: "Solve rate > 90%",value: "bt90"},
    {label: "Solve rate > 75%",value: "bt75"},
    {label: "Solve rate > 50%",value: "bt50"},
    {label: "Solve rate > 25%",value: "bt25"}
  ];

  let tags_value: string[] | null;
  let points_value: string | null;
  let solve_rate_value: string | null;
</script>

<main class="flex-3 grow">
  <div class="mb-3 flex flex-row gap-2 items-center px-2">
    <ListIcon class="w-5" />
    <h1 class="text-2xl font-semibold text-on-primary me-2">Problem Set</h1>
    <PopoverMenu title="Contest" class="px-3! py-1! rounded-full! bg-gray-200! hover:bg-gray-300! text-base! font-normal min-w-24">
      <PopoverMenuContent width="13rem" class="max-h-[60svh] overflow-y-auto">
        <div class="outline-[calc(var(--spacing)*1)] outline-bg sticky top-0 pt-1 px-1 pb-2 border-b border-gray-300 mb-1 bg-bg text-sm">
          <SearchInput id="contest_search_input_8i3d32" name="problem_search" />
        </div>
        <PopoverMenuItem label="implementation" />
        <PopoverMenuItem label="math" />
        <PopoverMenuItem label="greedy" />
        <PopoverMenuItem label="dp" />
        <PopoverMenuItem label="data structures" />
        <PopoverMenuItem label="data structures" />
        <PopoverMenuItem label="brute force" />
        <PopoverMenuItem label="constructive algorithms" />
        <PopoverMenuItem label="graphs" />
        <PopoverMenuItem label="sortings" />
        <PopoverMenuItem label="binary search" />
        <PopoverMenuItem label="dfs and similar" />
        <PopoverMenuItem label="trees" />
        <PopoverMenuItem label="strings" />
        <PopoverMenuItem label="number theory" />
        <PopoverMenuItem label="combinatorics" />
        <PopoverMenuItem label="*special" />
        <PopoverMenuItem label="geometry" />
        <PopoverMenuItem label="bitmasks" />
        <PopoverMenuItem label="two pointers" />
        <PopoverMenuItem label="dsu (disjoint set union)" />
        <PopoverMenuItem label="shortest paths" />
        <PopoverMenuItem label="probabilities" />
        <PopoverMenuItem label="divide and conquer" />
        <PopoverMenuItem label="hashing" />
        <PopoverMenuItem label="games" />
        <PopoverMenuItem label="flows" />
        <PopoverMenuItem label="interactive" />
        <PopoverMenuItem label="matrices" />
        <PopoverMenuItem label="string suffix structures" />
        <PopoverMenuItem label="fft (Fast Fourier Transform)" />
        <PopoverMenuItem label="graph matchings" />
        <PopoverMenuItem label="ternary search" />
        <PopoverMenuItem label="expression parsing" />
        <PopoverMenuItem label="meet-in-the-middle" />
        <PopoverMenuItem label="2-sat" />
        <PopoverMenuItem label="Chinese remainder theorem" />
        <PopoverMenuItem label="schedules" />
      </PopoverMenuContent>
    </PopoverMenu>
  </div>
    <div class="-mb-2 px-2.5 pt-2.5 pb-4.5 rounded-t-xl border border-b-0 border-primary-hairline">
    <form name="problems_filter" action="" class="w-full flex flex-col gap-2 items-start text-sm ">
      <div class="flex flex-row gap-1.5 items-center w-full">
        <div class="pe-2 me-1 border-e border-gray-400">
          <a href="/problem?id=random" class="flex flex-row gap-1 justify-between cursor-pointer p-1 px-2 min-w-24 rounded-lg border-primary-hairline bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors">
            Select Randomly
          </a>
        </div>
        <div class="grow">
          <SearchInput id="problem_search_input_i48dl2" name="problem_search" />
        </div>
        <Select title="Filter Tags" placeholder="Tags" list_width="13rem" name="tags[]" class="min-w-20 {tags_value && tags_value.length?"border-primary-s1 border-2 box-border":""}" bind:value={tags_value} multiple options={tagOptions} />
        <Select title="Filter Points" placeholder="Points" stick_placeholder name="points" class="min-w-20 {points_value? "border-primary-s1 border-2 box-border":""}" bind:value={points_value} options={pointsOptions} />
        <Select title="Filter Solve Rate" placeholder="Solve Rate" stick_placeholder name="solve_rate" class="min-w-20 {solve_rate_value? "border-primary-s1 border-2 box-border":""}" bind:value={solve_rate_value} options={solveRateOptions} />
      </div>
      {#if (tags_value && tags_value.length) || points_value || solve_rate_value}
      <div class="w-full flex flex-row justify-between gap-2 items-end">
        <div class="flex flex-row flex-wrap gap-1">
          {#if tags_value}
          {#each tags_value as value, i}
            <button type="button" on:click={()=>{tags_value=tags_value?.filter((v,index)=>index!==i)??null}} class="badge group">
              {tagOptions.find(o => o.value === value)?.label ?? value}
              <XmarkIcon class="w-4 h-4 rounded-full p-0.5 group-hover:bg-primary-s2/50 transition-colors" />
            </button>
          {/each}
          {/if}
          {#if points_value}
          <button type="button" on:click={()=>{points_value=null}} class="badge group">
            {pointsOptions.find(o => o.value === points_value)?.label ?? points_value}
            <XmarkIcon class="w-4 h-4 rounded-full p-0.5 group-hover:bg-primary-s2/50 transition-colors" />
          </button>
          {/if}
          {#if solve_rate_value}
          <button type="button" on:click={()=>{solve_rate_value=null}} class="badge group">
            {solveRateOptions.find(o => o.value === solve_rate_value)?.label ?? solve_rate_value}
            <XmarkIcon class="w-4 h-4 rounded-full p-0.5 group-hover:bg-primary-s2/50 transition-colors" />
          </button>
          {/if}
        </div>
        <div class="flex flex-row gap-1 shrink-0">
          <button type="reset" on:click={()=>{
            tags_value = null;
            points_value = null;
            solve_rate_value = null;
            tick().then(()=>{
              //@ts-ignore
              document.forms["problems_filter"].submit();
            })
          }} class="cursor-pointer p-1 px-2 min-w-14 rounded-lg border-primary-hairline bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors">Clear</button>
          <button type="submit" class="shrink-0 cursor-pointer text-on-primary bg-primary-s1 py-1 px-2 rounded-lg hover:bg-primary-s2 transition-colors">Apply Filters</button>  
        </div>
      </div>
      {/if}
    </form>
  </div>
  <table class="main-theme w-full">
    <thead class="top-18!">
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Points</th>
        <th>Solve Rate</th>
      </tr>
    </thead>
    <tbody class="[&_td:nth-child(2)_div]:flex [&_td:nth-child(2)_div]:flex-row [&_td:nth-child(2)_div]:flex-wrap [&_td:nth-child(2)_div]:items-center [&_td:nth-child(2)_div]:gap-1">
      <tr>
        <td>35iu3j2w</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Twin Polynomials</a>
          <div>
            <a href="/problemset?tag=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tag=graphs+matchings" class="tag" title="Graph matchings, König's theorem, vertex cover of bipartite graph">graphs matchings</a>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35de63h6</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Subsequence Problem</a>
          <div>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tag=fft" class="tag" title="Fast Fourier transform">fft</a>
          </div>
        </td>
        <td>60 pts</td>
        <td>42.8%</td>
      </tr>
      <tr>
        <td>35k9u2hd</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Points Selection</a>
          <div class="flex flex-row gap-1">
            <a href="/problemset?tag=brute+force" class="tag" title="Brute Force">brute force</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tag=geometry" class="tag" title="Geometry, computational geometry">geometry</a>
            <a href="/problemset?tag=greedy" class="tag" title="Greedy algorithms">greedy</a>
          </div>
        </td>
        <td>40 pts</td>
        <td>65.8%</td>
      </tr>
      <tr>
        <td>35mp4zq1</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Removal of a Sequence (Hard Version)</a>
          <div>
            <a href="/problemset?tags=binary+search" class="tag" title="Binary search">binary search</a>
            <a href="/problemset?tags=constructive+algorithms" class="tag" title="Constructive algorithms">constructive algorithms</a>
            <a href="/problemset?tags=divide+and+conquer" class="tag" title="Divide and Conquer">divide and conquer</a>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=number+theory" class="tag" title="Number theory: Euler function, GCD, divisibility, etc">number theory</a>
            <a href="/problemset?tags=probabilities" class="tag" title="Probabilities, expected values, statistics, random variables, etc">probabilities</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35t7c8rb</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Removal of a Sequence (Easy Version)</a>
          <div>
            <a href="/problemset?tags=binary+search" class="tag" title="Binary search">binary search</a>
            <a href="/problemset?tags=bitmasks" class="tag" title="Bitmasks">bitmasks</a>
            <a href="/problemset?tags=geometry" class="tag" title="Geometry, computational geometry">geometry</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=number+theory" class="tag" title="Number theory: Euler function, GCD, divisibility, etc">number theory</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35vx2mnj</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Range Operation</a>
          <div>
            <a href="/problemset?tags=math" class="rounded-full min-w-10 text-center p-0.5 px-1.5 text-xs bg-gray-200 text-gray-600 font-semibol hover:bg-primary-s1 hover:text-on-primary transition-colorsd" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=two+pointers" class="tag" title="Two pointers">two pointers</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35qf8s4w</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Drifting Away</a>
          <div>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35a9jt0k</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Alice and Bob</a>
          <div>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35h3prlx</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Intercepting Butterflies</a>
          <div>
            <a href="/problemset?tags=bitmasks" class="tag" title="Bitmasks">bitmasks</a>
            <a href="/problemset?tags=constructive+algorithms" class="tag" title="Constructive algorithms">constructive algorithms</a>
            <a href="/problemset?tags=graphs" class="tag" title="Graphs">graphs</a>
            <a href="/problemset?tags=interactive" class="tag" title="Interactive problem">interactive</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35z7c1ue</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Locate</a>
          <div>
            <a href="/problemset?tags=binary+search" class="tag" title="Binary search">binary search</a>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
            <a href="/problemset?tags=constructive+algorithms" class="tag" title="Constructive algorithms">constructive algorithms</a>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
            <a href="/problemset?tags=interactive" class="tag" title="Interactive problem">interactive</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35nq4v5m</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Mukhammadali and the Smooth Array</a>
          <div>
            <a href="/problemset?tags=data+structures" class="tag" title="Heaps, binary search trees, segment trees, hash tables, etc">data structures</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35b2ys9d</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Tree, TREE!!!</a>
          <div>
            <a href="/problemset?tags=dfs+and+similar" class="tag" title="Dfs and similar">dfs and similar</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=trees" class="tag" title="Trees">trees</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35w6tmq8</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Yet Another Array Problem</a>
          <div>
            <a href="/problemset?tag=brute+force" class="tag" title="Brute Force">brute force</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=number+theory" class="tag" title="Number theory: Euler function, GCD, divisibility, etc">number theory</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35cd3kpa</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Your Name</a>
          <div>
            <a href="/problemset?tags=sortings" class="tag" title="Sortings">sortings</a>
            <a href="/problemset?tags=strings" class="tag" title="Prefix- and Z-functions, suffix structures, Knuth-Morris-Pratt algorithm, etc">strings</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35iu3j2w</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Twin Polynomials</a>
          <div>
            <a href="/problemset?tag=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tag=graphs+matchings" class="tag" title="Graph matchings, König's theorem, vertex cover of bipartite graph">graphs matchings</a>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>3de63h6</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Subsequence Problem</a>
          <div>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tag=fft" class="tag" title="Fast Fourier transform">fft</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35k9u2hd</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Points Selection</a>
          <div>
            <a href="/problemset?tag=brute+force" class="tag" title="Brute Force">brute force</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tag=geometry" class="tag" title="Geometry, computational geometry">geometry</a>
            <a href="/problemset?tag=greedy" class="tag" title="Greedy algorithms">greedy</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35vx2mnj</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Range Operation</a>
          <div>
            <a href="/problemset?tags=math" class="rounded-full min-w-10 text-center p-0.5 px-1.5 text-xs bg-gray-200 text-gray-600 font-semibol hover:bg-primary-s1 hover:text-on-primary transition-colorsd" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=two+pointers" class="tag" title="Two pointers">two pointers</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35qf8s4w</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Drifting Away</a>
          <div>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35a9jt0k</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Alice and Bob</a>
          <div>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35h3prlx</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Intercepting Butterflies</a>
          <div>
            <a href="/problemset?tags=bitmasks" class="tag" title="Bitmasks">bitmasks</a>
            <a href="/problemset?tags=constructive+algorithms" class="tag" title="Constructive algorithms">constructive algorithms</a>
            <a href="/problemset?tags=graphs" class="tag" title="Graphs">graphs</a>
            <a href="/problemset?tags=interactive" class="tag" title="Interactive problem">interactive</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35z7c1ue</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Locate</a>
          <div>
            <a href="/problemset?tags=binary+search" class="tag" title="Binary search">binary search</a>
            <a href="/problemset?tag=combinatorics" class="tag" title="Combinatorics">combinatorics</a>
            <a href="/problemset?tags=constructive+algorithms" class="tag" title="Constructive algorithms">constructive algorithms</a>
            <a href="/problemset?tags=greedy" class="tag" title="Greedy algorithms">greedy</a>
            <a href="/problemset?tags=interactive" class="tag" title="Interactive problem">interactive</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35nq4v5m</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Mukhammadali and the Smooth Array</a>
          <div>
            <a href="/problemset?tags=data+structures" class="tag" title="Heaps, binary search trees, segment trees, hash tables, etc">data structures</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35b2ys9d</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Tree, TREE!!!</a>
          <div>
            <a href="/problemset?tags=dfs+and+similar" class="tag" title="Dfs and similar">dfs and similar</a>
            <a href="/problemset?tag=dp" class="tag" title="Dynamic programming">dp</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=trees" class="tag" title="Trees">trees</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35w6tmq8</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Yet Another Array Problem</a>
          <div>
            <a href="/problemset?tag=brute+force" class="tag" title="Brute Force">brute force</a>
            <a href="/problemset?tags=implementation" class="tag" title="Implementation problems, programming technics, simulation">implementation</a>
            <a href="/problemset?tags=math" class="tag" title="Mathematics including integration, differential equations, etc">math</a>
            <a href="/problemset?tags=number+theory" class="tag" title="Number theory: Euler function, GCD, divisibility, etc">number theory</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
      <tr>
        <td>35cd3kpa</td>
        <td>
          <a class="hover:underline" href="/problem?id=35iu3j2w">Your Name</a>
          <div>
            <a href="/problemset?tags=sortings" class="tag" title="Sortings">sortings</a>
            <a href="/problemset?tags=strings" class="tag" title="Prefix- and Z-functions, suffix structures, Knuth-Morris-Pratt algorithm, etc">strings</a>
          </div>
        </td>
        <td>50 pts</td>
        <td>47.4%</td>
      </tr>
    </tbody>
  </table>
</main>


<style>
  table tr td:nth-child(2), table tr th:nth-child(2) {
    text-align: start;
  }
  table tr td:first-child {
    color: var(--color-gray-500);
  }
  table tr td:nth-child(2) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .tag {
    border-radius: calc(infinity * 1px);
    min-width: calc(var(--spacing) * 10);
    text-align: center;
    padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 1.5);
    font-size: var(--text-xs) /* 0.75rem = 12px */;
    line-height: var(--tw-leading, var(--text-xs--line-height) /* calc(1 / 0.75) ≈ 1.3333 */);
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    /* font-weight: var(--font-weight-semibold); */
    transition-property: color, background-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */);
    transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);
  }
  .tag:hover {
    color: var(--color-on-primary);
    background-color: var(--color-primary-s1);
  }

  .badge {
    border-radius: calc(infinity * 1px);
    min-width: calc(var(--spacing) * 10);
    text-align: center;
    padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 2);
    font-size: var(--text-sm) /* 0.75rem = 12px */;
    line-height: var(--tw-leading, var(--text-sm--line-height) /* calc(1 / 0.75) ≈ 1.3333 */);
    background-color: var(--color-under-primary);
    color: var(--color-on-primary);
    border: 1px solid var(--color-primary);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(var(--spacing) * 1);
    cursor: pointer;
    /* font-weight: var(--font-weight-semibold); */
  }
</style>