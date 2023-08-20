<script lang="ts">
	import type { FetchOutcome } from '$lib/types/formTypes';

	export let waiting: boolean;
	export let outcome: FetchOutcome;
	export let failValidation: boolean;
</script>

{#if failValidation}
	<p class="text-red-500">Please enter an integer in the 'remaining' field.</p>
{/if}
{#if waiting}
	<p class="text-red-500">Saving...</p>
{/if}
{#if outcome?.success}
	<p class="text-green-500">Saved.</p>
{/if}
{#if outcome?.error}
	<p class="text-red-500">{outcome.error}</p>
{/if}
