<script lang="ts">
	/* TYPES */
	import type { FetchOutcome } from '$lib/types/formTypes';

	export let messageState: { waiting: boolean; outcome: FetchOutcome };
</script>

{#if messageState.waiting}
	<p class="text-orange-500">Connecting to server...</p>
{/if}

{#if messageState.outcome?.error}
	<p class="text-red-500">{messageState.outcome.error}</p>
{/if}

{#if messageState.outcome?.success}
	<p class="text-green-500">Redirecting..</p>
{/if}
