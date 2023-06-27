<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let CAS = '';
	let chemicalName = '';
	let notFound = false;

	const getProperties = async () => {
		console.log('searching...');
		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${CAS}`;
		const res = await fetch(uri);
		if (!res.ok) {
			notFound = true;
			return;
		}
		const data = await res.json();
		chemicalName = data.name;
	};

	const orderChemical: SubmitFunction = async (event) => {
		// do stg
	};
</script>

<h1>Order Chemical</h1>
<form method="POST" action="?/orderChemical" use:enhance={orderChemical}>
	<div class="label-input-container">
		<label for="CAS"
			>CAS Number
			<input id="CAS" name="CAS" type="text" bind:value={CAS} required />
		</label>
		<button type="button" on:click={() => getProperties()}>FIND</button>
		{#if notFound}
			<p>No information from this CAS number was obtained.</p>
		{/if}
		<label for="chemicalName">Chemical Name</label>
		<input type="text" name="chemicalName" bind:value={chemicalName} />
	</div>

	<div class="label-input-container">
		<label for="amount">Amount</label>
		<input id="amount" name="amount" type="number" required />
	</div>

	<div class="label-input-container">
		<label for="amountUnit">Unit</label>
		<select id="amountUnit" name="amountUnit">
			<option value="g">mg</option>
			<option value="g">g</option>
			<option value="ml">mL</option>
			<option value="ml">L</option>
		</select>
	</div>

	<div class="label-input-container">
		<button type="submit">ORDER CHEMICAL</button>
	</div>
	{#if form?.success}
		<p>Order successful.</p>
	{/if}
</form>
