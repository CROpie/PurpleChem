<script lang="ts">
	import type { InventorySidebarMessageState } from '$lib/types/inventory';

	export let messageState: InventorySidebarMessageState;
</script>

{#if messageState.waiting}
	<p class="text-red-500">Connecting to server...</p>
{/if}
{#if messageState.fetchOutcome?.error}
	<p class="text-red-500">{messageState.fetchOutcome.error}</p>
{/if}
{#if messageState.fetchOutcome?.success}
	<p class="text-green-500">Task completed sucessfully</p>
{/if}
