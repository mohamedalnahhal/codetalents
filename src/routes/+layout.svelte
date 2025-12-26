<script>
	import { fly } from "svelte/transition";
	import { errors, removeError } from "../stores/errors";
	import ErrorBadge from "$lib/components/ui/ErrorBadge.svelte";

</script>

<slot />

<div class="fixed bottom-4 end-4 space-y-2 z-50">
  {#each $errors as err (err.id)}
    <div 
      transition:fly={{ x: 200, duration: 200 }}
      onintroend={() => setTimeout(() => removeError(err.id), 3000)}
    >
      <ErrorBadge class="bg-red-600 text-white" closable>{err.message}</ErrorBadge>
    </div>
  {/each}
</div>