<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import type { SubmitFunction } from '@sveltejs/kit';

	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	/* STRUCTURE EDITOR */
	import { RDKitSS } from '$lib/stores/rdkitstore2';
	const RDKitModule = $RDKitSS;

	let jsmeApplet: any;
	let jsmeContainer: HTMLElement;

	onMount(() => {
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	/* VARIABLES */
	type Supplier = {
		id: number;
		supplierName: string;
	};
	type FormResult = {
		success: boolean;
		error: string | null;
	};
	export let supplierList: Supplier[];
	export let form: FormResult;

	// ordering variables
	type phys = string | null;

	let CAS = '';
	let chemicalName: string | null = '';
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
	// API search
	let searching = false;
	let invalidCAS = false;
	let CASfound = false;
	let CASnotFound = false;

	// user input structure
	let structureInfo = false;

	// press order
	let ordering = false;
	let failValidation = false;

	// Validation regxes
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;
	const numbersOnly = /^[0-9]+$/;

	// Units for dropdown select
	const items = [
		{ value: 'mg', name: 'mg' },
		{ value: 'g', name: 'g' },
		{ value: 'mL', name: 'mL' },
		{ value: 'L', name: 'L' }
	];

	/* FUNCTIONS */
	// commonchemistry API CAS search
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
		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${CAS}`;

		// need to use try/catch here? 404 error if CAS isn't in their DB
		const res = await fetch(uri);
		searching = false;

		// found
		if (res.ok) {
			const data = await res.json();
			chemicalName = data.name;
			MW = data.molecularMass;
			inchi = data.inchi;
			smile = data.smile;
			if (data.experimentalProperties) {
				extractPhys(data.experimentalProperties);
			}
			CASfound = true;
		} else {
			// not found, check if has been previously ordered
			const res2 = await checkDBForCas();
			if (res2) {
				chemicalName = res2.chemicalName;
				MW = res2.MW;
				MP = res2.MP;
				BP = res2.BP;
				density = res2.density;
				smile = res2.smile;
				inchi = res2.inchi;
				CASfound = true;
			} else {
				// need to input info manually
				toggleStructureSearch();
				CASnotFound = true;
			}
		}
	};

	// most of all need to erase data in hidden input fields in the case that a second search has taken place
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
		structureInfo = false;
		CASnotFound = false;
		CASfound = false;
		invalidCAS = false;
		failValidation = false;

		if (jsmeContainer.classList.contains('flex')) {
			jsmeContainer.classList.replace('flex', 'hidden');
		}

		if (form?.success) {
			form.success = false;
		}
		if (form?.error) {
			form.error = null;
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

	// CAS not found by commonchem API but need to check if already input into database
	// Move this to +server.ts ...
	// async function checkDBForCas() {
	// 	let { data: chemical } = await supabase.from('chemicals').select().eq('CAS', CAS).maybeSingle();
	// 	if (chemical) {
	// 		return chemical;
	// 	} else {
	// 		return false;
	// 	}
	// }

	async function checkDBForCas() {
		const response = await fetch('/orderChemical', {
			method: 'POST',
			body: JSON.stringify({ CAS }),
			headers: {
				'content-type': 'application/json'
			}
		});

		let { chemical } = await response.json();
		console.log(chemical);
		if (chemical) {
			return chemical;
		} else {
			return false;
		}
	}

	const validateData: SubmitFunction = async (event) => {
		if (!CASRegexPattern.test(CAS)) {
			failValidation = true;
			event.cancel();
		}
		if (!numbersOnly.test(String(amount))) {
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

		ordering = true;
		CASfound = false;

		return async ({ result, update }) => {
			ordering = false;
			structureInfo = false;
			CASnotFound = false;
			CASfound = false;
			invalidCAS = false;
			failValidation = false;

			if (jsmeContainer.classList.contains('flex')) {
				jsmeContainer.classList.replace('flex', 'hidden');
			}
			// result contains: { data: {success: true}, status: 200, type: "success" }
			update();
		};
	};

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

	function generateStructureInfo() {
		smile = jsmeApplet.smiles();
		if (smile) {
			inchi = RDKitModule!.get_mol(smile).get_inchi();
		}
		structureInfo = true;
	}
</script>

<form method="POST" action="?/orderChemical" use:enhance={validateData} class="m-8">
	<Input label="CAS number" name="CAS" type="text" bind:value={CAS} outline required autofocus />

	<div class="flex items-center gap-4 mt-2">
		<Button type="button" on:click={() => getProperties()} outline>SEARCH</Button>

		{#if searching}
			<p class="text-red-500">Searching...</p>
		{/if}
		{#if invalidCAS}
			<p class="text-red-500">Please enter a valid CAS number.</p>
		{/if}
		{#if CASnotFound}
			<p class="text-red-500">No information from this CAS number was obtained.</p>
			<p class="text-red-500">
				<span class="text-complement">Chemical Name</span> will need to be added manually.
			</p>
			<p class="text-red-500">
				<span class="text-complement">Structure</span> and
				<span class="text-complement">Physical Properties</span> may be added manually.
			</p>
		{/if}
		{#if CASfound}
			<p class="text-green-500">Properties have been imported.</p>
		{/if}
		{#if failValidation}
			<p class="text-red-500">
				Please check that all the necessary fields have been entered correctly.
			</p>
		{/if}
	</div>
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
		{#if structureInfo}
			<p class="text-primary">Structure Info Generated.</p>
			<!-- <p class="text-primary">(DEMO: Smile: {smile} Inchi: {inchi})</p> -->
		{/if}
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

	{#if CASnotFound}
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

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}

	{#if ordering}
		<p class="text-red-500">Ordering...</p>
	{/if}

	{#if form?.success}
		<p class="text-green-500">Order Successful.</p>
	{/if}
	<!-- hidden properties: physical / structure -->

	<input name="MW" type="hidden" bind:value={MW} />
	<input name="MP" type="hidden" bind:value={MP} />
	<input name="BP" type="hidden" bind:value={BP} />
	<input name="density" type="hidden" bind:value={density} />

	<input name="inchi" type="hidden" bind:value={inchi} />
	<input name="smile" type="hidden" bind:value={smile} />
</form>
