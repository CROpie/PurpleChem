<script lang="ts">
	import type { FetchOutcome } from '$lib/types/formTypes';

	export let failValidation: boolean;
	export let failStructure: boolean;
	export let failAmount: boolean;
	export let failAmountUnit: boolean;
	export let failSupplierID: boolean;
	export let ordering: boolean;
	export let outcome: FetchOutcome;
</script>

{#if failValidation}
	<p class="text-red-500">
		Please check that all the necessary fields have been entered correctly.
	</p>
{/if}
{#if failStructure}
	<p class="text-red-500">Please generate the structure info before placing the order.</p>
{/if}
{#if failAmount}
	<p class="text-red-500">Please enter a whole number amount.</p>
{/if}
{#if failAmountUnit}
	<p class="text-red-500">Please select a unit.</p>
{/if}
{#if failSupplierID}
	<p class="text-red-500">Please select a supplier.</p>
{/if}
{#if ordering}
	<p class="text-orange-500">Ordering...</p>
{/if}
{#if outcome?.success}
	<p class="text-green-500">Order successful.</p>
{/if}
{#if outcome?.error}
	<p class="text-orange-500">{outcome.error}</p>
{/if}
