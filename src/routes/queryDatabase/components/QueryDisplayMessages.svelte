<script lang="ts">
	/* TYPES */
	import type { QueryMessageState } from '$lib/types/queryDatabase';

	export let messageState: QueryMessageState;
</script>

{#if messageState.searching}
	<p class="text-orange-500">Searching Database..</p>
{/if}
{#if messageState.dbError}
	<p class="text-red-500">Database error..</p>
{/if}
{#if messageState.noHit}
	<p class="text-red-500">No Hits!</p>
{/if}
{#if messageState.noStructure}
	<p class="text-red-500">Please use the editor to draw a structure...</p>
{/if}
{#if messageState.fetchOutcome?.error}
	<p class="text-red-500">{messageState.fetchOutcome.error}</p>
{/if}
