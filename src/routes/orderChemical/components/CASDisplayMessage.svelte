<script lang="ts">
	/* TYPES */
	import type { SearchCASMessageState } from '$lib/types/orderChemical';

	export let messageState: SearchCASMessageState;
</script>

{#if messageState.searchingCAS}
	<p class="text-orange-500">Searching...</p>
{/if}
{#if messageState.invalidCAS}
	<p class="text-red-500">Please enter a valid CAS number.</p>
{/if}
{#if messageState.CASnotFound}
	<p class="text-red-500">No information from this CAS number was obtained.</p>
	<p class="text-red-500">
		<span class="text-complement">Chemical Name</span> will need to be added manually.
	</p>
	<p class="text-red-500">
		<span class="text-complement">Structure</span> and
		<span class="text-complement">Physical Properties</span> may be added manually.
	</p>
{/if}
{#if messageState.chemNameNotFound}
	<p class="text-red-500">No information from this chemical name was obtained.</p>
	<p class="text-red-500">
		<span class="text-complement">CAS rn</span> will need to be added manually.
	</p>
	<p class="text-red-500">
		<span class="text-complement">Structure</span> and
		<span class="text-complement">Physical Properties</span> may be added manually.
	</p>
{/if}
{#if messageState.CASfound}
	<p class="text-green-500">
		Success: physical and structural properties have been imported automatically.
	</p>
{/if}
{#if messageState.fetchOutcome?.error}
	<p class="text-red-500">{messageState.fetchOutcome.error}</p>
{/if}
