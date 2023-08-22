<script lang="ts">
	import type { InventoryAccordionMessageState } from '$lib/types/inventory';

	export let messageState: InventoryAccordionMessageState;
</script>

{#if messageState.failValidation}
	<p class="text-red-500">Please enter an integer in the 'remaining' field.</p>
{/if}
{#if messageState.waiting}
	<p class="text-red-500">Saving...</p>
{/if}
{#if messageState.fetchOutcome?.success}
	<p class="text-green-500">Saved.</p>
{/if}
{#if messageState.fetchOutcome?.error}
	<p class="text-red-500">{messageState.fetchOutcome.error}</p>
{/if}
