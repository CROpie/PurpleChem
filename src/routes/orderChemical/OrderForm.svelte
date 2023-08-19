<script lang="ts">
	import { enhance } from '$app/forms';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { FetchOutcome } from '$lib/types/formTypes';

	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	// import FetchResult from '$lib/components/FetchResult.svelte';
	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	/* STRUCTURE EDITOR */
	import { RDKitSS } from '$lib/stores/rdkitstore';

	let jsmeApplet: any;
	let jsmeContainer: HTMLElement;
	let afterCASContainer: HTMLElement;

	/* VARIABLES */
	type Supplier = {
		id: number;
		supplierName: string;
	};

	let outcome: FetchOutcome = null;

	export let supplierList: Supplier[];

	// ordering variables
	type phys = string | null;

	let CAS = '';
	let chemicalName: string | null = '';
	let amount: number | null = null;
	let supplierPN: string | null = null;

	// dropdown items for validation
	let supplier_id: number | null = null;
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
	let manualStructure = false;

	// for pressing order
	let ordering = false;
	let failValidation = false;
	let failStructure = false;
	let failAmount = false;
	let failSupplierID = false;
	let failAmountUnit = false;

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
		const response = await fetch(uri);
		searching = false;

		// found
		if (response.ok) {
			const data = await response.json();
			console.log('data: ', data);
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
				manualStructure = true;
			}
		}

		if (afterCASContainer.classList.contains('hidden')) {
			afterCASContainer.classList.replace('hidden', 'block');
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
		CASnotFound = false;
		CASfound = false;
		invalidCAS = false;
		failValidation = false;
		failStructure = false;

		if (jsmeContainer.classList.contains('flex')) {
			jsmeContainer.classList.replace('flex', 'hidden');
		}

		if (afterCASContainer.classList.contains('block')) {
			afterCASContainer.classList.replace('block', 'hidden');
		}

		// if (form?.success) {
		// 	form.success = false;
		// }
		// if (form?.error) {
		// 	form.error = null;
		// }
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

	function resetValidation() {
		failValidation = false;
		failStructure = false;
		failAmount = false;
		failSupplierID = false;
		failAmountUnit = false;
	}

	const validateData: SubmitFunction = async ({ cancel }) => {
		resetValidation();
		if (!CASRegexPattern.test(CAS)) {
			failValidation = true;
		}
		if (!numbersOnly.test(String(amount))) {
			failAmount = true;
		}
		if (!supplier_id) {
			failSupplierID = true;
		}
		if (!amountUnit) {
			failAmountUnit = true;
		}

		// make the user generate a structure if one wasn't obtained from CAS
		if (manualStructure) {
			CASnotFound = false;
			if (!inchi) {
				failStructure = true;
			}
		}

		ordering = true;

		if (failValidation || failStructure || failAmount || failSupplierID || failAmountUnit) {
			ordering = false;
			cancel();
			return;
		}

		CASfound = false;

		return async ({ result, update }) => {
			ordering = false;
			CASnotFound = false;
			CASfound = false;
			invalidCAS = false;
			failValidation = false;
			failStructure = false;
			manualStructure = false;

			if (jsmeContainer.classList.contains('flex')) {
				jsmeContainer.classList.replace('flex', 'hidden');
			}
			// result contains: { data: {success: true}, status: 200, type: "success" }
			update();
		};
	};

	function toggleStructureSearch() {
		if (!jsmeApplet) {
			jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
		}

		if (jsmeContainer.classList.contains('hidden')) {
			jsmeContainer.classList.replace('hidden', 'flex');
		} else if (jsmeContainer.classList.contains('flex')) {
			jsmeContainer.classList.replace('flex', 'hidden');
		}
	}

	function generateStructureInfo() {
		failStructure = false;
		smile = jsmeApplet.smiles();
		if (smile) {
			inchi = $RDKitSS!.get_mol(smile).get_inchi();
			console.log('inchi generated: ', inchi);
		}
	}

	async function orderChemical() {
		const response = await ClientAPI.post('/orderchemical', null, {
			body: {
				CAS,
				chemicalName,
				MW,
				MP,
				BP,
				density,
				smile,
				inchi,
				supplier_id,
				amount,
				amountUnit,
				supplierPN
			}
		});
		outcome = response.outcome;
		const data = response.data;
		console.log('+page.svelte: ', data, outcome);
	}
</script>

<form on:submit|preventDefault={orderChemical} class="m-8">
	<Input
		label="CAS number [eg 6674-22-2]"
		name="CAS"
		type="text"
		data-testID="CASInput"
		bind:value={CAS}
		outline
		required
		autofocus
	/>

	<div class="flex items-center gap-4 mt-2">
		<Button type="button" on:click={() => getProperties()} outline>SEARCH</Button>

		{#if searching}
			<p class="text-orange-500">Searching...</p>
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
			<p class="text-green-500">
				Success: physical and structural properties have been imported automatically.
			</p>
		{/if}
	</div>
	<div bind:this={afterCASContainer} class="hidden">
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
			<Button type="button" on:click={generateStructureInfo} class="w-96" outline
				>Generate Structure Info</Button
			>
			{#if inchi}
				<p class="text-green-500">Structure has been stored as a string.</p>
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
				bind:value={supplier_id}
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

		<!-- hidden properties from CAS search -->
		<input name="MW" type="hidden" bind:value={MW} placeholder="MW" />
		<input name="MP" type="hidden" bind:value={MP} placeholder="MP" />
		<input name="BP" type="hidden" bind:value={BP} placeholder="BP" />
		<input name="density" type="hidden" bind:value={density} placeholder="density" />

		<input name="inchi" type="hidden" bind:value={inchi} placeholder="inchi" />
		<input name="smile" type="hidden" bind:value={smile} placeholder="smile" />

		<Button type="submit" outline class="w-full mt-8">ORDER CHEMICAL</Button>

		<!-- validation messages -->
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
		<!-- form messages -->
		{#if ordering}
			<p class="text-orange-500">Ordering...</p>
		{/if}
		<!-- {#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-green-500">Order Successful.</p>
		{/if} -->
	</div>
</form>
