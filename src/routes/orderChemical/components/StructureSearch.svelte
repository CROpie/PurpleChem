<script lang="ts">
	/* MINOR COMPONENTS */
	import { Button } from '$lib/components/button/button';
	import type { ChemicalInfo } from '$lib/types/orderChemical';

	/* MODULES */
	import { RDKitSS } from '$lib/stores/rdkitstore';
	import { onMount } from 'svelte';

	export let chemicalInfo: ChemicalInfo;

	let jsmeApplet: any;

	onMount(() => {
		// @ts-ignore
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	function generateStructureInfo() {
		chemicalInfo.smile = jsmeApplet.smiles();
		if (chemicalInfo.smile) {
			chemicalInfo.inchi = $RDKitSS!.get_mol(chemicalInfo.smile).get_inchi();
		}
	}
</script>

<div class="flex-col">
	<div class="text-primary">Chemical Structure</div>
	<div id="jsme_container" />
	<Button type="button" on:click={generateStructureInfo} class="w-96" outline
		>Generate Structure Info</Button
	>
	{#if chemicalInfo.inchi}
		<p class="text-green-500">Structure has been stored as a string.</p>
	{/if}
</div>
