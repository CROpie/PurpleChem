<script lang="ts">
	import type { FetchOutcome } from '$lib/types/formTypes';

	export let waiting: boolean;
	export let outcome: FetchOutcome;
</script>

{#if waiting}
	<p class="text-red-500">Connecting to server...</p>
{/if}
{#if outcome?.error}
	<p class="text-red-500">{outcome.error}</p>
{/if}
{#if outcome?.success}
	<p class="text-complement">New Location Added</p>
{/if}
