<script lang="ts">
	import { Button } from '$lib/components/button/button';

	/* STRUCTURE EDITOR */
	import { RDKitSS } from '$lib/stores/rdkitstore';
	import { onMount } from 'svelte';

	let jsmeApplet: any;

	export let queryInchi: string | null;
	export let noStructure: boolean;

	onMount(() => {
		// @ts-ignore
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	function queryDatabaseInchi() {
		queryInchi = getInchi();
		console.log(queryInchi);
		if (!queryInchi) {
			noStructure = true;
			return;
		}
	}
	function getInchi() {
		const smiles = jsmeApplet.smiles();
		let inchi = '';
		if (smiles) {
			inchi = $RDKitSS!.get_mol(smiles).get_inchi();
		}
		return inchi;
	}
</script>

<div class="mb-4" id="jsme_container" />
<Button type="button" outline on:click={queryDatabaseInchi}>STRUCTURE SEARCH</Button>
