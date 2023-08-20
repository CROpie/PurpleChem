<script lang="ts">
	import type { FetchOutcome } from '$lib/apiClient/types';
	export let loadOutcome: FetchOutcome;
</script>

{#if loadOutcome?.error}
	<p class="text-red-500">{loadOutcome?.error}</p>
{/if}
