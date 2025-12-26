<script lang="ts">
	import Input from "../form/Input.svelte";

  let { class: className }:{ class?: string } = $props();

  let email = $state("");
  let submitted = $state(false);

  function submitForm(e: Event){
    e.preventDefault();
    if (!email) return;
    submitted = true;

    // Simulating request delay
    setTimeout(() => {
      email = "";
    }, 1000);
  }
</script>

<div class="bg-gray-100 px-10 pb-12 pt-10 {className ?? ""}">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-2xl font-semibold mb-6 sm:text-nowrap">Join Our Newsletter</h2>
    <p class="opacity-90 mb-8 text-lg">
      Receive regular updates on upcoming contests, coding guides, and platform updates.
    </p>

    {#if !submitted}
      <form
        onsubmit={submitForm}
        class="flex flex-col sm:not-md:flex-row items-center gap-4 w-full justify-center"
      >
        <Input
          id="newsletter_email_input_03dsds"
          type="email"
          placeholder="Enter your email"
          bind:value={email}
          class="px-4 py-3 bg-bg! sm:not-md:w-80 lg:min-w-80"
        />

        <button
          type="submit"
          class="px-6 py-3 max-sm:w-full md:w-full rounded-full text-nowrap bg-gray-300 text-gray-700 font-semibold cursor-pointer hover:opacity-90 transition-colors"
        >
          Join Now
        </button>
      </form>
    {:else}
      <div class="bg-white/20 p-4 rounded-xl text-lg font-medium">
        🎉 You're subscribed! Thanks for joining Codetalents!
      </div>
    {/if}
  </div>
</div>
