<script lang="ts">
	export let searching: boolean;
	export let dbError: boolean;
	export let noHit: boolean;
	export let noStructure: boolean;
</script>

{#if searching}
	<p class="text-orange-500">Searching Database..</p>
{/if}
{#if dbError}
	<p class="text-red-500">Database error..</p>
{/if}
{#if noHit}
	<p class="text-red-500">No Hits!</p>
{/if}
{#if noStructure}
	<p class="text-red-500">Error while searching structure...</p>
{/if}
