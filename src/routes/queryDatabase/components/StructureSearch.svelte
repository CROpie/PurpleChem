<script lang="ts">
	/* MINOR COMPONENTS */
	import { Button } from '$lib/components/button/button';

	/* MODUELE IMPORTS */
	import { RDKitSS } from '$lib/stores/rdkitstore';
	import { onMount } from 'svelte';

	/* TYPES */
	import type { QueryInfo, QueryMessageState } from '$lib/types/queryDatabase';

	let jsmeApplet: any;

	export let queryInfo: QueryInfo;
	export let messageState: QueryMessageState;

	onMount(() => {
		// @ts-ignore
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	function queryDatabaseInchi() {
		queryInfo.Inchi = getInchi();
		console.log(queryInfo.Inchi);
		if (!queryInfo.Inchi) {
			messageState.noStructure = true;
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
