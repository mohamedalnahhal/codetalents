<script>
	import ExpandableText from "$lib/components/ui/ExpandableText.svelte";
	import Post from "$lib/components/main/Post.svelte";
	import MessageCircleIcon from "$lib/icons/regular/MessageCircleIcon.svelte";
  import ThumbUpIcon from "$lib/icons/regular/ThumbUpIcon.svelte";

</script>
<main class="flex-3 grow">
  <!-- <div class="border-primary-hairline border rounded-lg py-2 px-3 mb-2">
    <div class="flex flex-row items-start gap-2">
      <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
      <div class="text-on-primary flex flex-col items-start">
        <a href="" class="font-semibold text-sm hover:underline">mohammedalnahhal</a>
        <span class="text-xs font-normal">94357 pts</span>
      </div>
      <div class="bg-violet-200 text-[#7c5fb6] text-xs rounded-md px-1 py-0.5 font-semibold">
        Rank #9
      </div>
    </div>
    <textarea class="mx-1 my-2 h-6 resize-none outline-0 w-full dark:text-gray-600" name="" id="" placeholder="Write Post..."></textarea>
    <div class="flex flex-row gap-2 text-sm">
      <button class="cursor-pointer font-semibold text-on-primary bg-primary-s1 py-1 px-2 rounded-md hover:bg-primary-s2 transition-colors">Post</button>
      <button class="flex flex-row gap-1 cursor-pointer font-semibold text-gray-700 bg-gray-200 py-1 px-2 rounded-md hover:bg-gray-300 hover:text-on-primary transition-colors">
        <UploadIcon class="w-4"/>
        Attach
      </button>
    </div>
  </div> -->
  <Post id="io3q11" username="mohammedalnahhal" date={new Date()} text={"Tet et wj "} status={1} points={94357} rank={4} n_like={23} n_dislike={2} n_comment={2}/>
  <div class="shadow border-primary-hairline border rounded-lg py-2 px-3 mb-2">
    <div class="flex flex-row items-start gap-2">
      <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
      <div class="text-on-primary flex flex-col items-start">
        <a href="" class="font-semibold text-sm hover:underline">mohammedalnahhal</a>
        <span class="text-xs font-normal">94357 pts</span>
      </div>
      <div class="bg-violet-200 text-[#7c5fb6] text-xs rounded-md px-1 py-0.5 font-semibold">
        Rank #9
      </div>
      <span class="text-gray-500 text-xs mt-1">yesterday</span>
    </div>
    <p class="mx-1 my-2 dark:text-gray-600">
      Hello,
      <br>
      how is this even <strong>possible</strong> ??
    </p>
    <hr class="text-primary-hairline border-primary-hairline my-2" />
    <div class="flex flex-row gap-1 text-gray-700 text-sm">
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 mb-0.5"/> Like</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 rotate-180 -mb-0.5"/> Dislike</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><MessageCircleIcon class="w-4 -mb-0.5"/>Comment</button>
    </div>
  </div>
  <div class="shadow border-primary-hairline border rounded-lg py-2 px-3 mb-2 dark:text-gray-600">
    <div class="flex flex-row items-start gap-2">
      <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
      <div class="text-on-primary flex flex-col items-start">
        <a href="" class="font-semibold text-sm hover:underline">fouadkhalid</a>
        <span class="text-xs font-normal">120090 pts</span>
      </div>
      <span class="text-gray-500 text-xs mt-1">4 days ago</span>
    </div>
    <ExpandableText>
    <!-- <p class="my-2 mx-1"> -->
    Hello, Codeforces!
    <br>
    <br>
    We are pleased to announce the resumption of the Global Rounds. Thanks to XTX Markets for supporting the initiative! In 2025, we will hold 3 such rounds. The series results will take into account the best 2 participations out of 3.
    <br>
    <br>
    On Thursday, November 6, 2025 at 16:35UTC+2 we will host Codeforces Global Round 30 (Div. 1 + Div. 2).
    <br>
    <br>
    Codeforces Global Round 30 marks the second round in the 2025 series of Codeforces Global Rounds. These rounds are open and rated for everyone.
    <br>
    <br>
    The prizes for this round are as follows:
    <br>
    <br>
    The top 30 participants will receive a t-shirt.
    <br>
    20 t-shirts will be randomly distributed among participants ranked between 31 and 500, inclusive.
    <br>
    The prizes for the 3-round series in 2025:
    <br>
    <br>
    In each round, the top-100 participants get points according to the table.
    <br>
    A participant's final score will be the sum of the points they earned in their 2 highest-placing rounds.
    <br>
    The top 20 participants across the series will receive sweatshirts and placement certificates.
    <br>
    We extend our gratitude to XTX Markets for supporting the global rounds initiative in 2025!
    <br>
    <br>
    The 8 problems were authored and <span class="text-primary-dark-s1 cursor-pointer hover:underline">...More</span>
    <!-- </p> -->
    </ExpandableText>
    <hr class="text-primary-hairline border-primary-hairline my-2" />
    <div class="flex flex-row gap-1 text-gray-700 text-sm">
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 mb-0.5"/> Like</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 rotate-180 -mb-0.5"/> Dislike</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><MessageCircleIcon class="w-4 -mb-0.5"/>Comment</button>
    </div>
  </div>
  <div class="shadow border-primary-hairline border rounded-lg py-2 px-3">
    <div class="flex flex-row items-start gap-2">
      <img class="rounded-full h-8" src="./1749998613683.jpg" alt="">
      <div class="text-on-primary flex flex-col items-start">
        <a href="" class="font-semibold text-sm hover:underline">fouadkhalid</a>
        <span class="text-xs font-normal">120090 pts</span>
      </div>
      <span class="text-gray-500 text-xs mt-1">4 days ago</span>
    </div>
    <p class="my-2 mx-1 dark:text-gray-600">
    Hello, Codeforces!
    <br>
    <br>
    We are pleased to announce the resumption of the Global Rounds. Thanks to XTX Markets for supporting the initiative! In 2025, we will hold 3 such rounds. The series results will take into account the best 2 participations out of 3.
    <br>
    <br>
    On Thursday, November 6, 2025 at 16:35UTC+2 we will host Codeforces Global Round 30 (Div. 1 + Div. 2).
    <br>
    <br>
    Codeforces Global Round 30 marks the second round in the 2025 series of Codeforces Global Rounds. These rounds are open and rated for everyone.
    <br>
    <br>
    The prizes for this round are as follows:
    <br>
    <br>
    The top 30 participants will receive a t-shirt.
    <br>
    20 t-shirts will be randomly distributed among participants ranked between 31 and 500, inclusive.
    <br>
    The prizes for the 3-round series in 2025:
    <br>
    <br>
    In each round, the top-100 participants get points according to the table.
    <br>
    A participant's final score will be the sum of the points they earned in their 2 highest-placing rounds.
    <br>
    The top 20 participants across the series will receive sweatshirts and placement certificates.
    <br>
    We extend our gratitude to XTX Markets for supporting the global rounds initiative in 2025!
    <br>
    <br>
    The 8 problems were authored and <span class="text-primary-dark-s1 cursor-pointer hover:underline">...More</span>
    </p>
    <hr class="text-primary-hairline border-primary-hairline my-2" />
    <div class="flex flex-row gap-1 text-gray-700 text-sm">
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 mb-0.5"/> Like</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><ThumbUpIcon class="w-4 rotate-180 -mb-0.5"/> Dislike</button>
      <button class="flex flex-row gap-1 items-center cursor-pointer rounded-md hover:bg-primary-s1 hover:text-on-primary py-1 px-1.5"><MessageCircleIcon class="w-4 -mb-0.5"/>Comment</button>
    </div>
  </div>
</main>