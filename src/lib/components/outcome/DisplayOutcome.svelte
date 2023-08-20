<script lang="ts">
	import type { FetchOutcome } from '$lib/apiClient/types';
	export let outcome: FetchOutcome;
	export let successMessage = 'Task completed successfully.';
</script>

{#if outcome?.error}
	<p class="text-red-500">{outcome?.error}</p>
{/if}

{#if outcome?.success}
	<p class="text-green-500">{successMessage}</p>
{/if}
