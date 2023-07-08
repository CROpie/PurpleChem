<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import { Select } from '$lib/components/form/formAll';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	export let form: ActionData;

	type phys = string | null;

	let CAS = '';
	let chemicalName = '';

	// physical properties
	let MW: phys = null;
	let MP: phys = null;
	let BP: phys = null;
	let density: phys = null;

	// stucture
	let smiles: string | null;

	$: notFound = false;

	export let data: PageData;
	const { supplierList } = data;

	const getProperties = async () => {
		console.log('searching: ', CAS);
		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${CAS}`;
		const res = await fetch(uri);
		if (!res.ok) {
			notFound = true;
			console.log('nope');
			return;
		}
		const data = await res.json();
		console.log(data);
		chemicalName = data.name;
		MW = data.molecularMass;
		smiles = data.smile;
		if (data.experimentalProperties) {
			extractPhys(data.experimentalProperties);
		}
		notFound = false;
	};

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

	const orderChemical: SubmitFunction = async (event) => {
		// do stg
	};

	// Select Items
	const items = [
		{ value: 'mg', name: 'mg' },
		{ value: 'g', name: 'g' },
		{ value: 'mL', name: 'mL' },
		{ value: 'L', name: 'L' }
	];
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>
<form method="POST" action="?/orderChemical" use:enhance={orderChemical} class="m-8">
	<Input label="CAS number" name="CAS" type="text" bind:value={CAS} required />

	<Button type="button" on:click={() => getProperties()} outline class="mt-2">SEARCH</Button>

	{#if notFound}
		<p class="text-red-500">No information from this CAS number was obtained.</p>
	{/if}

	<Input label="Chemical Name" name="chemicalName" type="text" bind:value={chemicalName} />

	<div class="flex">
		<Input label="Amount" name="amount" type="text" required divClass="w-9/12" />
		<Select label="Unit" name="amountUnit" class="" {items} divClass="w-3/12" />
	</div>

	<div class="flex">
		<Select label="Supplier" name="supplierID" class="">
			{#each supplierList as supplier}
				<option value={supplier.id}>{supplier.supplierName}</option>
			{:else}
				<!-- -->
			{/each}
		</Select>
		<Input label="Product Code" name="supplierPN" type="text" />
	</div>

	<Button type="submit" outline class="w-full mt-8">ORDER CHEMICAL</Button>

	{#if form?.success}
		<p class="text-green-500">Order successful.</p>
	{:else if form?.error}
		<p class="text-red-500">Something went wrong...</p>
	{/if}
	<!-- hidden properties -->
	<input name="MW" type="hidden" bind:value={MW} />
	<input name="MP" type="hidden" bind:value={MP} />
	<input name="BP" type="hidden" bind:value={BP} />
	<input name="density" type="hidden" bind:value={density} />
	<input name="smiles" type="hidden" bind:value={smiles} />
</form>
