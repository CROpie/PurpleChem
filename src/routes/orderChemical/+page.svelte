<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	import { Heading } from '$lib/components/typography/Typo';
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	export let form: ActionData;

	type phys = string | null;

	let CAS = '';
	let chemicalName = '';
	let amount: number | null = null;
	let supplierPN: string | null = null;

	// dropdown items for validation
	let supplierID: number | null = null;
	let amountUnit: string | null = null;

	// physical properties
	let MW: phys = null;
	let MP: phys = null;
	let BP: phys = null;
	let density: phys = null;

	// stucture
	let inchi: string | null;
	let smile: string | null;

	// variables relating to error/progress messages

	let searching = false;
	let ordering = false;

	let notFound = false;
	let found = false;
	let invalidCAS = false;
	let failValidation = false;

	export let data: PageData;
	const { supabase, supplierList } = data;

	// Validation regxes
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;
	const numbersOnly = /^[0-9]+$/;

	const getProperties = async () => {
		if (!CAS) {
			return;
		}

		if (!CASRegexPattern.test(CAS)) {
			invalidCAS = true;
			return;
		}
		resetAll();
		searching = true;
		console.log('searching commonchemistry: ', CAS);
		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${CAS}`;

		// need to use try/catch here? 404 error if CAS isn't in their DB
		const res = await fetch(uri);
		searching = false;

		if (res.ok) {
			const data = await res.json();
			chemicalName = data.name;
			MW = data.molecularMass;
			inchi = data.inchi;
			smile = data.smile;
			if (data.experimentalProperties) {
				extractPhys(data.experimentalProperties);
			}
			found = true;
		} else {
			const res2 = await checkDBForCas();
			if (!res2) {
				toggleStructureSearch();
				notFound = true;
				return;
			}
		}
	};

	function resetAll() {
		chemicalName = '';
		amount = null;
		supplierPN = null;

		// phys
		MW = null;
		MP = null;
		BP = null;
		density = null;

		// stucture
		inchi = null;
		smile = null;

		// messages
		notFound = false;
		found = false;
		invalidCAS = false;
		failValidation = false;

		if (jsmeContainer.classList.contains('flex')) {
			jsmeContainer.classList.replace('flex', 'hidden');
		}

		if (form?.success) {
			form.success = false;
		}
		if (form?.error) {
			form.error = false;
		}
	}

	function extractPhys(propertyArray: any[]) {
		propertyArray.forEach((item) => {
			if (item.name == 'Boiling Point') {
				BP = item.property;
			}
			if (item.name == 'Melting Point') {
				MP = item.property;
			}
			if (item.name == 'Density') {
				density = item.property;
			}
		});
	}

	async function checkDBForCas() {
		// let chemical = await supabase
		let { data: chemical } = await supabase.from('chemicals').select().eq('CAS', CAS).maybeSingle();
		if (chemical) {
			console.log(chemical);
			chemicalName = chemical.chemicalName;
			MW = chemical.MW;
			MP = chemical.MP;
			BP = chemical.BP;
			density = chemical.density;
			smile = chemical.smile;
			inchi = chemical.inchi;
			return true;
		} else {
			return false;
		}
	}

	const validateData: SubmitFunction = async (event) => {
		console.log(CAS);
		if (!CASRegexPattern.test(CAS)) {
			failValidation = true;
			event.cancel();
		}
		if (!numbersOnly.test(amount)) {
			failValidation = true;
			event.cancel();
		}
		if (!supplierID) {
			failValidation = true;
			event.cancel();
		}
		if (!amountUnit) {
			failValidation = true;
			event.cancel();
		}

		// event.cancel();

		ordering = true;
		found = false;

		// including return async () => {} means that the page doesn't get refreshed?? and form.messages don't get displayed??
		// ** need to include update()
		return async ({ result, update }) => {
			ordering = false;
			// result contains: { data: {success: true}, status: 200, type: "success" }
			update();
		};
	};

	// Select Items
	const items = [
		{ value: 'mg', name: 'mg' },
		{ value: 'g', name: 'g' },
		{ value: 'mL', name: 'mL' },
		{ value: 'L', name: 'L' }
	];

	// input structure
	import { RDKitSS } from '$lib/stores/rdkitstore2';
	const RDKitModule = $RDKitSS;

	let jsmeApplet: any;
	let jsmeContainer: HTMLElement | null;

	onMount(() => {
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	function toggleStructureSearch() {
		if (!jsmeContainer) {
			console.log('something has gone wrong with jsme.');
		} else {
			if (jsmeContainer.classList.contains('hidden')) {
				jsmeContainer.classList.replace('hidden', 'flex');
			} else if (jsmeContainer.classList.contains('flex')) {
				jsmeContainer.classList.replace('flex', 'hidden');
			}
		}
	}
	// temp variables just to check that it's working correctly
	let smileDisplay = '';
	let inchiDisplay = '';

	function generateStructureInfo() {
		smile = jsmeApplet.smiles();
		smileDisplay = smile;
		if (smile) {
			inchi = RDKitModule!.get_mol(smile).get_inchi();
			inchiDisplay = inchi;
		}
	}
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>
<form method="POST" action="?/orderChemical" use:enhance={validateData} class="m-8">
	<Input label="CAS number" name="CAS" type="text" bind:value={CAS} outline required />

	<Button type="button" on:click={() => getProperties()} outline class="mt-2">SEARCH</Button>

	{#if searching}
		<p class="text-red-500">Searching...</p>
	{/if}
	{#if invalidCAS}
		<p class="text-red-500">Please enter a valid CAS number.</p>
	{/if}
	{#if notFound}
		<p class="text-red-500">No information from this CAS number was obtained.</p>
		<p class="text-red-500">
			<span class="text-complement">Chemical Name</span> will need to be added manually.
		</p>
		<p class="text-red-500">
			<span class="text-complement">Structure</span> and
			<span class="text-complement">Physical Properties</span> may be added manually.
		</p>
	{/if}
	{#if found}
		<p class="text-green-500">Properties have been imported.</p>
	{/if}
	{#if failValidation}
		<p class="text-red-500">
			Please check that all the necessary fields have been entered correctly.
		</p>
	{/if}

	<Input
		label="Chemical Name"
		name="chemicalName"
		type="text"
		bind:value={chemicalName}
		outline
		required
	/>

	<div bind:this={jsmeContainer} class="hidden flex-col">
		<div class="text-primary">Chemical Structure</div>
		<div id="jsme_container" />
		<Button type="button" outline class="w-96" on:click={generateStructureInfo}
			>Generate Structure Info</Button
		>
		<p class="text-primary">Smile: {smileDisplay} Inchi: {inchiDisplay}</p>
	</div>

	<div class="flex">
		<Input
			label="Amount"
			name="amount"
			type="text"
			required
			divClass="w-9/12"
			bind:value={amount}
			outline
		/>
		<DropSelect
			name="amountUnit"
			outline
			label="Unit"
			class="rounded-lg border-2"
			divClass="w-3/12"
			bind:value={amountUnit}
		>
			{#each items as item}
				<DropSelectItem value={item.value} label={item.name} />
			{:else}
				<DropSelectItem label="No options!" class="bg-neutral text-opNeutral" />
			{/each}
		</DropSelect>
	</div>

	<div class="flex">
		<DropSelect
			label="Supplier"
			name="supplierID"
			outline
			class="rounded-lg border-2"
			bind:value={supplierID}
		>
			{#each supplierList as supplier}
				<DropSelectItem value={supplier.id} label={supplier.supplierName} />
			{:else}
				<DropSelectItem label="No options!" class="bg-neutral text-opNeutral" />
			{/each}
		</DropSelect>
		<Input
			label="Product Code"
			name="supplierPN"
			type="text"
			outline
			bind:value={supplierPN}
			required
		/>
	</div>

	{#if notFound}
		<div class="flex">
			<Input
				label="Molecular Weight (g/mol)"
				type="text"
				divClass="w-3/12"
				outline
				bind:value={MW}
			/>
			<Input label="Melting Point (°C)" type="text" divClass="w-3/12" outline bind:value={MP} />
			<Input label="Boiling Point (°C)" type="text" divClass="w-3/12" outline bind:value={BP} />
			<Input label="Density (g/mL)" type="text" divClass="w-3/12" outline bind:value={density} />
		</div>
	{/if}

	<Button type="submit" outline class="w-full mt-8">ORDER CHEMICAL</Button>

	{#if ordering}
		<p class="text-red-500">Ordering...</p>
	{/if}
	{#if form?.success}
		<p class="text-green-500">Order successful.</p>
	{:else if form?.error}
		<p class="text-red-500">Something went wrong...</p>
	{:else if form?.supabaseError}
		<p class="text-red-500">
			Problem with Supabase fetch for some reason. Try to order again, it will probably work this
			time.
		</p>
	{/if}
	<!-- hidden properties -->

	<input name="MW" type="hidden" bind:value={MW} />
	<input name="MP" type="hidden" bind:value={MP} />
	<input name="BP" type="hidden" bind:value={BP} />
	<input name="density" type="hidden" bind:value={density} />

	<input name="inchi" type="hidden" bind:value={inchi} />
	<input name="smile" type="hidden" bind:value={smile} />
</form>
