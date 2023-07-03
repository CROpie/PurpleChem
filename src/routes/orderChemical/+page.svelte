<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import { Heading } from '$lib/components/typography/Typo';
	import { Input } from '$lib/components/form/Input';
	import { Button } from '$lib/components/button/button';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let CAS = '';
	let chemicalName = '';
	$: notFound = false;

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
		chemicalName = data.name;
		notFound = false;
	};

	const orderChemical: SubmitFunction = async (event) => {
		// do stg
	};
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>
<form method="POST" action="?/orderChemical" use:enhance={orderChemical} class="m-8">
	<Input label="CAS number" name="CAS" type="text" bind:value={CAS} required />

	<Button type="button" on:click={() => getProperties()} outline class="mt-2">SEARCH</Button>

	{#if notFound}
		<p class="text-red-500">No information from this CAS number was obtained.</p>
	{/if}

	<Input label="Chemical Name" name="chemicalName" type="text" bind:value={chemicalName} />

	<Input label="Amount" name="amount" type="text" required />

	<Select label="Unit" name="amountUnit" class="dark:bg-black mb-3">
		<option value="g">mg</option>
		<option value="g">g</option>
		<option value="ml">mL</option>
		<option value="ml">L</option>
	</Select>

	<Button type="submit" outline class="w-full">ORDER CHEMICAL</Button>

	{#if form?.success}
		<p class="text-green-500">Order successful.</p>
	{/if}
</form>
