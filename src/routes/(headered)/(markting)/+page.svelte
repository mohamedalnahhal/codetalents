<script lang="ts">
	import { browser } from "$app/environment";
	import NewsletterSignup from "$lib/components/main/NewsletterSignup.svelte";
	import Tooltip from "$lib/components/ui/Tooltip.svelte";
	import CodeSnippet from "$lib/components/utils/CodeSnippet.svelte";
	import Countdown from "$lib/components/utils/Countdown.svelte";
	import FAQAccordion from "$lib/components/utils/FAQAccordion.svelte";
	import ChevronDoubleDownIcon from "$lib/icons/regular/ChevronDoubleDownIcon.svelte";
	import CrownIcon from "$lib/icons/regular/CrownIcon.svelte";
	import InfoCircleIcon from "$lib/icons/regular/InfoCircleIcon.svelte";
	import { easeInOutSine } from "$lib/utils/easing";
	import gsap from "gsap";
  import SplitText from "gsap/SplitText";
	import { onMount } from "svelte";
	import Swiper from "swiper";
  import { EffectCards, Autoplay } from 'swiper/modules';
  import "swiper/swiper-bundle.css";
	import BookIcon from "$lib/icons/regular/BookIcon.svelte";
	import { ScrollView } from "$lib";
	import TrendIcon from "$lib/icons/regular/TrendIcon.svelte";
	import BrainIcon from "$lib/icons/computed/BrainIcon.svelte";
	import UserGroupIcon from "$lib/icons/regular/UserGroupIcon.svelte";
	import TrophyIcon from "$lib/icons/regular/TrophyIcon.svelte";

  let swiperEl: HTMLDivElement;
  let codes: string[] =  $state([`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int N;
    if (!(cin >> N)) return 0;
    string S;
    cin >> S;
    
    string a = "mti";
    string b = "mit";
    
    auto minCost = [&](const string &pat) {
        int best = INT_MAX;
        for (int offset = 0; offset < 3; ++offset) {
            int cost = 0;
            for (int i = 0; i < N; ++i) {
                char expected = pat[(i + offset) % 3];
                if (S[i] != expected) ++cost;
            }
            best = min(best, cost);
        }
        return best;
    };
    
    int costA = minCost(a);
    int costB = minCost(b);
    
    if (costA == costB) {
        cout << "FAKE\\n";
    } else if (costA < costB) {
        cout << "mti " << costA << "\\n";
    } else {
        cout << "mit " << costB << "\\n";
    }
    
    return 0;
}`,`#include <bits/stdc++.h>
using namespace std;
    
int main () {

  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int t;
  cin >> t;

  while(t--){
    int n;
    cin >> n;

    long long ans = 0;
    int cnt[2] = {1, 0};
    int pref = 0;

    for (int i = 0; i < n; ++i) {
      int a;
      cin >> a;

      pref ^= (a & 1);
      ans += cnt[pref];
      cnt[pref]++;

    }

    cout << ans << "\\n";
  }

  return 0;
}`,`#include <bits/stdc++.h>
using namespace std;

int n, k;
string s;
vector<string> pats;

bool dfs(int idx, int mask) {
    if (mask == (1<<k)-1) return true;
    for (int i = 0; i < k; ++i) {
        if (!(mask & (1<<i))) {
            size_t pos = s.find(pats[i], idx);
            if (pos != string::npos) {
                if (dfs(pos + pats[i].size(), mask | (1<<i)))
                    return true;
            }
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n >> k;
    cin >> s;
    pats.resize(k);
    for (int i = 0; i < k; ++i) cin >> pats[i];

    cout << (dfs(0, 0) ? "YES\\n" : "NO\\n");
}`]);

  let stats = $state({problems: 50, users: 100, contests: 15})

  onMount(()=>{
    if(browser){
      const swipingDelay = 2000;
      const swiper = new Swiper(swiperEl, {
        modules: [EffectCards, Autoplay],
        effect: "cards",
        autoplay: {delay: swipingDelay},
        slidesPerGroup: 1,
        slidesPerView: 1,
        grabCursor: true
      });
      let tempCode: string | undefined = undefined;
      function animateTypingByLines(i: number, pi: number, {
        charDuration = 1600,
        easing = easeInOutSine
      } = {}) {

        if(tempCode) codes[pi] = tempCode;
        tempCode = codes[i];
        const lines = tempCode.split("\n");
        let currentLine = 0;
        // editor.setValue(""); // clear editor instantly

        function animateLine() {
          const line = lines[currentLine];
          const totalChars = line.length;
          const startTime = performance.now();

          function frame(now: number) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / charDuration);
            const eased = easing(t);

            // const visibleChars = Math.floor(totalChars * eased);
            // const typedPart = line.slice(0, visibleChars);

            // const finalText =
            //   lines.slice(0, currentLine).join("\n") +
            //   (currentLine > 0 ? "\n" : "") +
            //   typedPart;
            
            const visibleLines = Math.floor(lines.length * eased);
            const finalText = lines.slice(0, visibleLines).join("\n") +
              (visibleLines > 0 ? "\n" : "");

            codes[i] = finalText;
            // editor.setValue(finalText, -1); // -1 keeps cursor at end

            if (t < 1) {
              requestAnimationFrame(frame);
            }
            // else {
            //   currentLine++;

            //   if (currentLine < lines.length) {
            //     setTimeout(animateLine, lineDelay);
            //   }
            // }
          }

          requestAnimationFrame(frame);
        }

        animateLine();
      }
      animateTypingByLines(0, 0);
      swiper.on("slideChange", (s)=>{animateTypingByLines(s.realIndex, s.previousIndex);})

      let split = SplitText.create(".hero", { type: "words", wordsClass: "word" });
      //@ts-ignore
      document.querySelector(".hero").style.setProperty("--total", split.words.length);
      split.words.forEach((el, index) => {
        //@ts-ignore
        el.style.setProperty("--i", index);
      });

      gsap.from(split.words, {
        opacity: 0,
        duration: 1,
        ease: "sine.inout",
        stagger: 0.1,
      });

      gsap.from(stats, {
        problems: 0,
        users: 0,
        contests: 0,
        duration: 1,
        ease: "sine.in"
      });
    }
  })

  const tagOptions = [
    { label: "Brute Force", value: "brute force" },
    { label: "Greedy", value: "greedy" },
    { label: "Implementation", value: "implementation" },
    { label: "Dynamic Programming (DP)", value: "dp" },
    { label: "Math", value: "math" },
    { label: "Constructive Algorithms", value: "constructive algorithms" },

    // Data Structures
    { label: "Data Structures", value: "data structures" },
    { label: "Trees", value: "trees" },
    { label: "Graphs", value: "graphs" },
    { label: "DFS and Similar", value: "dfs and similar" },
    { label: "Shortest Paths", value: "shortest paths" },
    { label: "DSU (Disjoint Set Union)", value: "dsu" },

    // Graph Theory
    { label: "Flows", value: "flows" },
    { label: "Graph Matchings", value: "graph matchings" },

    // Math
    { label: "Number Theory", value: "number theory" },
    { label: "Combinatorics", value: "combinatorics" },
    { label: "Geometry", value: "geometry" },
    { label: "Fast Fourier Transform (FFT)", value: "fft" },

    // Special
    { label: "Interactive", value: "interactive" },
    { label: "Probabilities", value: "probabilities" },
    { label: "Matrices", value: "matrices" },
    { label: "Chinese Remainder Theorem", value: "chinese remainder theorem" },

    // Misc
    { label: "Challenges", value: "challenges" },
  ];
</script>

<section class="min-h-max min-[1100px]:h-[calc(100svh-4.5rem)] max-h-180 py-6 px-8 m-auto max-w-7xl flex gap-4 flex-row items-stretch justify-center overflow-hidden">
  <div class="flex flex-col gap-8 sm:justify-between min-h-max h-full pb-2">
    <div>
      <div class="flex flex-col gap-2">
        <div class="w-full text-2xl">
          <span class="dark:text-on-primary text-primary-dark-s1">★★★</span>
          <div class="inline-block w-[calc(100%-3.5em)] border-t-2 dark:border-primary-hairline border-primary-hairline my-2"></div>
        </div>
        <div>
          <h1 class="hero text-4xl dark:text-txt-primary sm:text-5xl [&>.word]:[--progress:calc(var(--i)/var(--total))] 
              dark:[&>.word]:text-[rgb(calc(73+(22*var(--progress))),calc(192-(23*var(--progress))),calc(100+(30*var(--progress))))]!
              [&>.word]:text-[rgb(calc(3+(35*var(--progress))),calc(46+(33*var(--progress))),calc(21+(36*var(--progress))))] font-bold pb-2">First, solve the problem. Then, write the code.</h1>
          <p class="text-lg text-gray-600">- John Johnson</p>
        </div>
        <div class="w-full text-end text-2xl">
          <span class="inline-block w-[calc(100%-3.5em)] border-t-2 dark:border-primary-hairline border-primary-hairline my-2"></span>
          <span class="dark:text-on-primary text-primary-dark-s1">★★★</span>
        </div>
      </div>
      <h2 class="text-lg text-gray-600 mb-6">Improve your problem-solving skills & compete with other <span class="font-semibold whitespace-nowrap">☆ Talents ☆</span> here.</h2>
      <a href="/signup" class="rounded-full font-semibold w-fit text-lg bg-primary-s1 hover:bg-primary-s2 px-5 py-2 cursor-pointer transition-colors">Sign Up & Start Solving</a>
      <div class="flex flex-row gap-1 mt-6 text-gray-500">
        <ChevronDoubleDownIcon class="w-6 animate-bounce"/>
        <span>Scroll down</span>
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold text-gray-600 mb-2">Statstics</h2>
      <div class="flex flex-row gap-2">
        <div class="text-gray-700 bg-gray-200 px-3 py-2 text-lg rounded-xl">
          <span class="font-semibold">{Math.floor(stats.problems)}+</span> Problems
        </div>
        <div class="text-gray-700 bg-gray-200 px-3 py-2 text-lg rounded-xl">
          <span class="font-semibold">{Math.floor(stats.users)}+</span> User
        </div>
        <div class="text-gray-700 bg-gray-200 px-3 py-2 text-lg rounded-xl">
          <span class="font-semibold">{Math.floor(stats.contests)}+</span> Contest
        </div>
      </div>
    </div>
  </div>
  <div aria-hidden="true" class="shrink flex flex-col gap-4 h-full min-h-128 w-lg py-2 mx-14 max-[1100px]:hidden">
    <div bind:this={swiperEl} class="swiper h-full w-lg">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <CodeSnippet class="h-full shadow-xl" fontSize={17} bind:code={codes[0]} />
        </div>
        <div class="swiper-slide">
          <CodeSnippet class="h-full" fontSize={17} bind:code={codes[1]} />
        </div>
        <div class="swiper-slide">
          <CodeSnippet class="h-full" fontSize={17} bind:code={codes[2]} />
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-500">
      <span>User submissions</span>
      <Tooltip placement="right" delay={200}>
        <div slot="content">Note: every time you reload this page, 3 random <strong>public</strong> submissions show here</div>
        <InfoCircleIcon class="w-4 cursor-pointer" />
      </Tooltip>
    </div>
  </div>
</section>

<section class="max-w-7xl m-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-8 py-4 [&>div]:rounded-xl [&>div]:border [&>div]:border-primary-hairline [&>div]:p-4 [&_h2]:text-xl [&_h2]:mb-1 [&_h2]:font-semibold [&_h2]:text-on-primary">
  <div>
    <h2>
      <TrophyIcon class="inline-block w-7 me-0.5 mb-1" />
      Competitive Programming
    </h2>
    <p>Compete in timed coding contests designed to test your problem-solving skills under real competition pressure.</p>
  </div>
  <div>
    <h2>
      <BrainIcon class="inline-block w-7 me-0.5 mb-1" />
      Practice & Learning
    </h2>
    <p>Solve curated problems by difficulty and topic, learn from editorial solutions, and improve step by step.</p>
  </div>
  <div>
    <h2>
      <TrendIcon class="inline-block w-7 me-0.5 mb-1" />
      Track Your Progress
    </h2>
    <p>Monitor your rating, contest performance, and problem-solving history as you grow over time.</p>
  </div>
  <div>
    <h2>
      <UserGroupIcon class="inline-block w-7 me-0.5 mb-1" />
      Join Community
    </h2>
    <p>Discuss solutions, share ideas, and learn from other talents in a collaborative coding community.</p>
  </div>
</section>

<section class="max-w-7xl m-auto px-8 py-6 lg:mt-8">
  <h2 class="text-2xl font-semibold text-on-primary mb-6">Upcoming / Ongoing Contests</h2>
  <div class="flex flex-row gap-8 items-stretch">
    <ScrollView wrapperClass="rounded-lg" direction="row">
      <table class="main-theme not-sticky w-full [&_th]:py-1.5! [&_td]:py-2! [&_td]:whitespace-nowrap [&_td]:text-ellipsis grow text-base border-primary-hairline border rounded-lg [&_td:nth-child(1)]:text-start! [&_td:nth-child(2)]:text-start!">
        <thead>
          <tr>
            <th class="text-start!">Name</th>
            <th class="text-start!">Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-500">
            <td>Final Setting You Contest</td>
            <td>Ends at 11/12 9:00pm</td>
            <td class="animate-pulse-primary font-semibold">Ongoing</td>
          </tr>
          <tr class="text-gray-500">
            <td>Final Setting You Contest</td>
            <td>Ends at 11/12 9:00pm</td>
            <td class="animate-pulse-primary font-semibold">Ongoing</td>
          </tr>
          <tr class="text-gray-500">
            <td>Final Setting You Contest</td>
            <td>Ends at 11/12 9:00pm</td>
            <td class="animate-pulse-primary font-semibold">Ongoing</td>
          </tr>
          <tr class="[&>td]:bg-primary/20!">
            <td>Final Setting You Contest</td>
            <td>Starts at 11/12 9:00pm</td>
            <td>Upcoming</td>
          </tr>
          <tr>
            <td>Final Setting You Contest</td>
            <td>Starts at 11/12 9:00pm</td>
            <td>Upcoming</td>
          </tr>
          <tr>
            <td>Final Setting You Contest</td>
            <td>Starts at 11/12 9:00pm</td>
            <td>Upcoming</td>
          </tr>
          <tr>
            <td>Final Setting You Contest</td>
            <td>Starts at 11/12 9:00pm</td>
            <td>Upcoming</td>
          </tr>
        </tbody>
      </table>
    </ScrollView>
    <div class="flex flex-col justify-between items-center h-full max-lg:hidden">
      <p class="text-3xl text-center font-bold -rotate-2 my-4 text-on-primary">
        Don't missout
        <br>
        <span class="text-xl font-semibold text-gray-700">Next contest will start after...</span>
      </p>
      <Countdown target={new Date("12/12/2025")} />
      <p class="mt-8 text-nowrap mb-4 text-lg text-gray-700">You can practice contests after they finished</p>
      <button class="rounded-full px-5 py-2 text-lg font-semibold bg-gray-200 hover:bg-primary-s1 transition-colors cursor-pointer">Start Practicing Contests</button>
    </div>
  </div>
</section>

<section class="max-w-7xl m-auto px-8 py-6 lg:mt-12 lg:mb-8 md:mb-2">
  <div class="
      grid
      grid-cols-1
      lg:grid-cols-[auto_1fr_1fr]
      gap-8 w-full">
    <div class="lg:w-min order-1">
      <h2 class="text-2xl text-center lg:text-nowrap font-semibold text-on-primary mb-3">Discover Our Top <span class="whitespace-nowrap">☆ <span class="font-bold">Talents</span> ☆</span></h2>
      <p class="text-lg text-center text-gray-700">Rise your rating and become on the leaderboard by joining more contests.</p>
    </div>
    <div class="flex flex-col gap-6 max-lg:mx-6 justify-between h-max shrink order-3 lg:order-3 lg:row-span-1 self-end">
      <div class="p-3 flex flex-col gap-3 rounded-xl bg-under-primary border-primary border">
        <p class="font-semibold">Weekly Rising Talent</p>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-2 items-center">
            <img class="rounded-full h-7 w-7" src="./1749998613683.jpg" alt="avatar">
            <a href="" class="hover:underline text-on-primary!">Yosef Khalid</a>
          </div>
          <p class="text-txt-primary font-semibold">+892 pts</p>
        </div>
      </div>
      <button class="rounded-full px-5 py-2 text-lg font-semibold bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">See Full Leaderboard</button>
    </div>
    <table class="order-2 lg:order-2 lg:col-span-2 lg:row-span-2 main-theme not-sticky text-base mx-4
    [&_th]:py-1.5! [&_td]:py-2!
    max-xl:lg:[&_th:nth-child(4)]:hidden max-xl:lg:[&_td:nth-child(4)]:hidden
    [&_td:nth-child(2)]:text-start!
    max-md:hidden xl:ms-12
    border-primary-hairline border rounded-lg">
      <thead class="text-base!">
        <tr class="[&>th]:pb-5!">
          <th>Rank</th>
          <th class="text-start!">User</th>
          <th>Rating</th>
          <th>This Month</th>
          <th>Contests</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-bg scale-105 z-10 -translate-y-3 shadow-xl outline outline-[#F2C94C]">
          <td>
            <span class="font-bold text-green-500 me-1">↑</span>
            <span class="bg-[#ffeaa9] text-[#c19409] dark:bg-[#F2C94C30] dark:text-[#F2C94C] font-semibold px-4 py-0.5 rounded-full">#1</span>
          </td>
          <td>
            <div class="flex flex-row items-center gap-2">
              <CrownIcon class="w-5 shrink-0 text-[#F2C94C] fill-[#F2C94C]"/>
              <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
              <a href="" class="hover:underline">Ahmed Farid</a>
            </div>
          </td>
          <td>72353</td>
          <td>+525</td>
          <td>42</td>
          <td>98%</td>
        </tr>
        <tr class="bg-gray-200 scale-[103%] -translate-y-1.5 shadow-lg">
          <td class="border-s border-primary-hairline">
            <span class="font-bold text-red-500 me-1">↓</span>
            <span class="bg-gray-300 text-gray-500 dark:text-gray-600 font-semibold px-4 py-0.5 rounded-full">#2</span>
          </td>
          <td>
            <div class="flex flex-row items-center gap-2">
              <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
              <a href="" class="hover:underline">Ziad Ali</a>
            </div>
          </td>
          <td>68630</td>
          <td>+423</td>
          <td>38</td>
          <td class="border-e! border-primary-hairline!">97%</td>
        </tr>
        <tr class="bg-bg outline-[#D29B6E]">
          <td>
            <span class="font-bold text-green-500 me-1">↑</span>
            <span class="bg-[#eadacc] text-[#b37441] dark:bg-[#b374412e] font-semibold px-4 py-0.5 rounded-full">#3</span>
          </td>
          <td>
            <div class="flex flex-row items-center gap-2">
              <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
              <a href="" class="hover:underline">Lama Qassam</a>
            </div>
          </td>
          <td>62043</td>
          <td>+525</td>
          <td>38</td>
          <td>98%</td>
        </tr>
        <tr>
          <td>
            <span class="font-bold text-red-500 me-1">↓</span>
            #4
          </td>
          <td>
            <div class="flex flex-row items-center gap-2">
              <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
              <a href="" class="hover:underline">Mohammed Alnady</a>
            </div>
          </td>
          <td>61839</td>
          <td>+525</td>
          <td>41</td>
          <td>98%</td>
        </tr>
        <tr>
          <td>
            <span class="font-bold text-green-500 me-1">↑</span>
            #5
          </td>
          <td>
            <div class="flex flex-row items-center gap-2">
              <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
              <a href="" class="hover:underline">Khalid Ibrahim</a>
            </div>
          </td>
          <td>59320</td>
          <td>+525</td>
          <td>35</td>
          <td>98%</td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-col items-center order-2 mx-4 md:hidden">
      <div class="w-full z-10 flex flex-row flex-wrap items-center justify-between gap-2 py-3 px-6 rounded-lg outline outline-[#F2C94C] bg-bg scale-105 shadow-lg">
        <div class="flex flex-row items-center gap-2">
          <CrownIcon class="w-5 shrink-0 text-[#F2C94C] fill-[#F2C94C]"/>
          <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
          <a href="" class="hover:underline">Ahmed Farid</a>
        </div>
        <p class="text-[#c19409] dark:text-[#F2C94C] not-dark:font-semibold text-sm">72k pts</p>
      </div>
      <div class="w-full flex flex-row flex-wrap items-center justify-between gap-2 py-3 px-6 rounded-lg bg-bg scale-[103%] translate-y-0.5 shadow-lg outline outline-primary-hairline">
        <div class="flex flex-row items-center gap-2">
          <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
          <a href="" class="hover:underline">Ziad Ali</a>
        </div>
        <p class="text-sm">68.6k pts</p>
      </div>
      <div class="w-full flex flex-row flex-wrap items-center justify-between gap-2 py-3 px-6 rounded-lg outline outline-primary-hairline">
        <div class="flex flex-row items-center gap-2">
          <img class="rounded-full h-8 w-8" src="./1749998613683.jpg" alt="avatar">
          <a href="" class="hover:underline">Lama Qassam</a>
        </div>
        <p class="text-sm">62k pts</p>
      </div>
    </div>
  </div>
</section>

<section class="max-w-7xl m-auto px-8 py-6">
  <h2 class="text-2xl text-center font-semibold text-on-primary mb-6">Various Problem Tags</h2>
  <div class="flex flex-row flex-wrap gap-2 items-stretch justify-center w-fit mb-6 m-auto">
    {#each tagOptions as tag}
      <a href="" class="bg-gray-200 hover:bg-gray-300 hover:underline transition-colors text-gray-600 font-semibold rounded-full px-6 py-2">{tag.label}</a>
    {/each}
  </div>
  <p class="text-center text-lg">And many more...</p>
</section>

<section class="bg-gray-100 px-8 py-12 my-6">
  <div class="max-w-7xl m-auto">
    <h2 class="text-2xl sm:text-3xl text-center font-semibold text-on-primary mb-2">Ready to Become a Coding <span class="font-semibold whitespace-nowrap">☆ Talent ☆</span></h2>
    <p class="text-lg text-center text-gray-600 mb-6">Join thousands of coders already improving every day</p>
    <button class="rounded-full block m-auto px-8 py-2 text-lg font-semibold bg-primary-s1 hover:bg-primary-s2 transition-colors cursor-pointer">Sign Up Now</button>
  </div>
</section>

<section class="max-w-7xl m-auto px-8 py-6">
  <div class="flex flex-row flex-wrap gap-2 items-center mb-6 ms-2">
    <h2 class="text-2xl font-semibold text-on-primary">
      <BookIcon class="inline-block w-8" />
      Resources to Learn Problem-Solving
    </h2>
    <Tooltip>
      <p class="bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500/60 ps-2 pe-1.5 py-0.5 rounded-full text-sm font-normal cursor-pointer">Demo <InfoCircleIcon class="w-4 inline-block mb-0.75" /></p>
      <svelte:fragment slot="content">
        <span class="font-normal">These are not real articles, they are just for demonstration</span>
      </svelte:fragment>
    </Tooltip></div>
  <div class="flex flex-row max-md:flex-wrap gap-3">
    <div class="flex flex-col gap-6 justify-between p-4 w-fit rounded-xl border-primary-hairline border">
      <div>
        <h3 class="text-xl font-semibold mb-4">How to Improve Your Problem-Solving Speed</h3>
        <p class="dark:text-gray-600">Learn practical techniques to think faster during contests, reduce debugging time, and solve problems more efficiently.</p>
      </div>
      <a href="/" class="rounded-full block w-fit px-4 py-1.5 bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">Read More →</a>
    </div>
    <div class="flex flex-col gap-6 justify-between p-4 w-fit rounded-xl border-primary-hairline border">
      <div>
        <h3 class="text-xl font-semibold mb-4">Mastering Dynamic Programming: A Beginner-Friendly Guide</h3>
        <p class="dark:text-gray-600">Break down dynamic programming concepts with real examples, visual tables, and step-by-step approaches used in top competitions.</p>
      </div>
      <a href="/" class="rounded-full block w-fit px-4 py-1.5 bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">Read More →</a>
    </div>
    <div class="flex flex-col gap-6 justify-between p-4 w-fit rounded-xl border-primary-hairline border">
      <div>
        <h3 class="text-xl font-semibold mb-4">Top Mistakes Competitive Programmers Make</h3>
        <p class="dark:text-gray-600">Discover common pitfalls that lead to failed submissions and learn how to avoid them during time-limited competitions.</p>
      </div>
      <a href="/" class="rounded-full block w-fit px-4 py-1.5 bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">Read More →</a>
    </div>
  </div>
</section>

<div class="max-w-7xl flex flex-col md:flex-row gap-10 m-auto px-8 py-8 my-12">
  <section class="w-full flex-2">
    <div class="-mt-8">
      <h2 class="text-2xl font-semibold text-on-primary">FAQ</h2>
      <FAQAccordion items={[
        {
          question: "Do I need prior coding experience?",
          answer:
            "Not at all! Codetalents provides beginner-friendly problems that help you start easily and improve gradually."
        },
        {
          question: "How is my coding rating calculated?",
          answer:
            "Your rating increases based on your performance in contests compared to other participants. Higher placements reward more rating points."
        },
        {
          question: "Are contests free to participate in?",
          answer:
            "Yes! All contests on CodeTalents are completely free to join."
        },
        {
          question: "Can I practice outside of contest time?",
          answer:
            "Yes, all problems remain available in the practice area after contests end."
        },
        {
          question: "How do I view rankings?",
          answer:
            "Rankings appear on the contest page and on a global leaderboard updated live."
        },
        {
          question: "Can I submit solutions multiple times?",
          answer:
            "Yes—You may submit multiple solutions until the contest ends."
        },
        {
          question: "Which programming languages are supported?",
          answer:
            "Currently: C++, Python, and Java. More languages are being added soon."
        }
      ]}/>
    </div>
  </section>
  
  <section class="shrink-0 flex-1">
    <NewsletterSignup class="rounded-2xl" />
  </section>
</div>

<!-- <section class="bg-gray-100 px-8 py-6 my-6">
  <div class="max-w-7xl m-auto">

  </div>
</section> -->

<footer class="w-full bg-code-surface-2 dark:bg-[#161916] text-white pt-12 [&_a]:underline">
  <div class="max-w-7xl mx-auto px-12 grid grid-cols-1 sm:grid-cols-3 gap-12">

    <!-- Brand -->
    <div>
      <div>
        <img class="h-16 mb-2" src="./imgs/logo-dark.png" alt="" srcset="">
        <h3 class="text-2xl font-semibold text-white tracking-wide mb-3">CodeTalents</h3>
      </div>
      <p class="text-sm opacity-80 leading-relaxed">
        A competitive programming platform to learn, improve, and compete with global talent.
      </p>
    </div>

    <!-- Quick Links -->
    <div>
      <h4 class="font-semibold text-white mb-2">Quick Links</h4>

      <ul class="space-y-1 text-sm">
        <li><a href="#" class="hover:text-white">Practice Problems</a></li>
        <li><a href="#" class="hover:text-white">Upcoming Contests</a></li>
        <li><a href="#" class="hover:text-white">Leaderboard</a></li>
        <li><a href="#" class="hover:text-white">FAQ</a></li>
      </ul>
    </div>

    <!-- Social & Contact -->
    <div>
      <h4 class="font-semibold text-white mb-2">Contact</h4>
      <ul class="space-y-1 text-sm opacity-90">
        <li>Email: support@codetalents.dev</li>
        <li>Twitter: @codetalents</li>
        <li>Instagram: @codetalents</li>
      </ul>
    </div>

  </div>

  <div class="py-2 mt-10 bg-code-surface-1 dark:bg-[#101210] text-center text-sm opacity-70">
    © {new Date().getFullYear()} CodeTalents — All rights reserved
  </div>
</footer>