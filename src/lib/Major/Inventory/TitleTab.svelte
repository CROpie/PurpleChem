<script lang="ts">
	import type { orders } from './orderType';
	export let order: orders;
	// $: console.log('Title: ', order);

	/* STRUCTURE */
	import { RDKitSS } from '$lib/stores/rdkitstore2';

	export let currentSVG;

	function getSVG(smile: string | null) {
		if ($RDKitSS) {
			if (smile) {
				currentSVG = $RDKitSS.get_mol(smile).get_svg();
			}
		}
	}
</script>

<button on:click={() => getSVG(order.chemicalID.smile)}>
	{#if order.statusID.id != 3}
		<button class="break-words">{order.chemicalID.chemicalName} ({order.id})*</button>
	{:else}
		<button class="break-words">{order.chemicalID.chemicalName} ({order.id})</button>
	{/if}
</button>
