<script lang="ts">
	import type { DBOrder } from '$lib/types/inventory';
	export let order: DBOrder;

	/* STRUCTURE */
	import { RDKitSS } from '$lib/stores/rdkitstore';

	export let currentSVG;

	function getSVG(smile: string | null) {
		if ($RDKitSS) {
			if (smile) {
				currentSVG = $RDKitSS.get_mol(smile).get_svg();
			}
		}
	}
</script>

<button on:click={() => getSVG(order.chemical.smile)}>
	{#if order.status != 'received'}
		<button class="break-words">{order.chemical.chemicalName} ({order.id})*</button>
	{:else}
		<button class="break-words">{order.chemical.chemicalName} ({order.id})</button>
	{/if}
</button>
