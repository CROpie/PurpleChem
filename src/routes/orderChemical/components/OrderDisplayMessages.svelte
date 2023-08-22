<script lang="ts">
	/* TYPES */
	import type { OrderChemMessageState } from '$lib/types/orderChemical';

	export let messageState: OrderChemMessageState;
</script>

{#if messageState.failValidation}
	<p class="text-red-500">
		Please check that all the necessary fields have been entered correctly.
	</p>
{/if}
{#if messageState.failStructure}
	<p class="text-red-500">Please generate the structure info before placing the order.</p>
{/if}
{#if messageState.failAmount}
	<p class="text-red-500">Please enter a whole number amount.</p>
{/if}
{#if messageState.failAmountUnit}
	<p class="text-red-500">Please select a unit.</p>
{/if}
{#if messageState.failSupplierID}
	<p class="text-red-500">Please select a supplier.</p>
{/if}
{#if messageState.ordering}
	<p class="text-orange-500">Ordering...</p>
{/if}
{#if messageState.fetchOutcome?.success}
	<p class="text-green-500">Order successful.</p>
{/if}
{#if messageState.fetchOutcome?.error}
	<p class="text-orange-500">{messageState.fetchOutcome.error}</p>
{/if}
