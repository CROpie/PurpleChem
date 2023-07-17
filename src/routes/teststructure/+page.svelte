<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { JSMol, RDKitModule } from '$lib/rdkitTypes';

	import type { PageData } from '../queryStructure/$types';
	export let data: PageData;
	let { supabase } = data;

	let jsmeApplet: any;
	let RDKitModule: RDKitModule;
	let canvas: HTMLCanvasElement;
	let isInchi = false;
	let showCanvas = false;
	let isData = false;

	onMount(() => {
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');

		initRDKitModule().then(function (instance) {
			RDKitModule = instance;
		});
	});
	let inchi: any;
	let getData: any;
	$: inchi;
	$: getData;

	const getSmiles = () => {
		const smiles = jsmeApplet.smiles();
		// first turn it into a "JSMol" object (no relation to molfile?), then into an inchi
		// JSMol have lots of functions: https://docs.rdkitjs.com/interfaces/JSMol.html
		// also due to typing can see them here

		// don't strictly need to type JSMol because RDKitModule is typed
		let JSMol: JSMol = RDKitModule.get_mol(smiles);
		inchi = RDKitModule.get_mol(smiles).get_inchi();
		isInchi = true;
		showCanvas = true;
		JSMol.draw_to_canvas(canvas, 200, 200);
		let svg = JSMol.get_svg();
		console.log(svg);
	};

	const queryDatabase = async () => {
		let { data: newData } = await supabase
			.from('ordersview')
			.select('chemicalName')
			.eq('inchi', inchi);
		getData = newData;
		isData = true;
	};

	const test = () => {
		let JSMol: JSMol = RDKitModule.get_mol('InChI=1S/C7H8/c1-7-5-3-2-4-6-7/h2-6H,1H3');
		console.log('JSMol: ', JSMol);
		JSMol.draw_to_canvas(canvas, 200, 200);
	};
</script>

<svelte:head>
	<script src="/node_modules/jsme-editor/jsme.nocache.js"></script>
	<script src="/node_modules/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
</svelte:head>

<div id="jsme_container" />
<Button on:click={getSmiles}>Show Inchi/Structure</Button>
{#if isInchi}
	<Heading tag="h3">{inchi}</Heading>

	<Button on:click={queryDatabase}>View Orders</Button>
{/if}

<Button on:click={test}>Test</Button>

<canvas bind:this={canvas} width="200" height="200" />

{#if isData}
	<pre class="text-white">
	{JSON.stringify(getData, null, 2)}
</pre>
{/if}
<!--
<form method="POST" action="?/searchStructure">
	<input type="hidden" name="smiles" bind:value={smiles} />
</form>

DIPEA
smile N(C(C)C)C(C)C
canonical N(C(C)C)C(C)C
jsme CCN(C(C)C)C(C)C
-->
