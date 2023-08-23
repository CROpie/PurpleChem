<script lang="ts">
	import type { FetchOutcome } from '$lib/types/global';
	export let data;
	const { outcome }: { outcome: FetchOutcome } = data;
</script>

<p class="text-primary">Snuck in!</p>

{#if outcome?.error}
	<p class="text-red-500">{outcome.error}</p>
{/if}
{#if outcome?.success}
	<p class="text-green-500">Administrator has been added.</p>
{/if}
