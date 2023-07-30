<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	import type { orders, locations } from './orderType';

	/* VARIABLES */
	export let order: orders;
	export let locationsList: locations[];

	const dispatch = createEventDispatcher();

	// Validation / messages
	const numbersOnly = /^[0-9]+$/;

	// set the text and value of the custom dropdown (select)
	let currentLocation = 'Choose a storage location.';
	let currentValue: number | null = null;

	if (order.locationID) {
		currentLocation = order.locationID.locationName;
		currentValue = order.locationID.id;
	}

	// form variables
	let failValidation = false;
	let waiting = false;

	type FormResult = {
		success: boolean;
		error: string | null;
	} | null;

	let form: FormResult = null;

	async function handleSubmit() {
		form = null;
		failValidation = false;
		waiting = false;

		let orderID = order.id;
		let locationID = currentValue;
		let amount = order.amount;

		if (!numbersOnly.test(String(order.amount))) {
			failValidation = true;
			return;
		}
		waiting = true;

		const response = await fetch('http://localhost:5173/inventory', {
			method: 'PUT',
			body: JSON.stringify({ orderID, locationID, amount }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		waiting = false;

		if (form?.success) {
			await invalidateAll();

			console.log('dispatch trigger');
			dispatch('triggerUpdate');
		}
	}
</script>

<!-- need to fix formating for small screen sizes -->
<form
	class="flex gap-5 flex-wrap items-center justify-center mt-2"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex items-center justify-start gap-1">
		<p>Remaining:</p>
		{order.amount}
		<Input
			data-testid="amount"
			bind:value={order.amount}
			name="amount"
			type="number"
			class="text-primary text-end"
			outline
		/>
		<p>{order.amountUnit}</p>
	</div>

	<div class="flex justify-start items-center gap-1 md:flex-nowrap flex-wrap">
		<p class="block whitespace-nowrap">Change Location:</p>

		<DropSelect
			name="locationID"
			class="sm:w-64 w-36 border-2 rounded-lg"
			outline
			popClass="w-36"
			defaultText={currentLocation}
			bind:value={currentValue}
		>
			{#each locationsList as location (location?.id)}
				<DropSelectItem value={location?.id} label={location?.locationName} />
			{:else}
				<DropSelectItem label="No Locations!" />
			{/each}
		</DropSelect>

		<!-- <input type="hidden" name="orderID" value={order.id} /> -->
	</div>
	<div>
		<Button type="submit" outline class="border-none text-2xl">✓</Button>
	</div>
</form>
{#if failValidation}
	<p class="text-red-500">Please enter an integer in the 'remaining' field.</p>
{/if}
{#if waiting}
	<p class="text-red-500">Saving...</p>
{/if}
{#if form?.success}
	<p class="text-green-500">Saved.</p>
{/if}
{#if form?.error}
	<p class="text-red-500">{form.error}</p>
{/if}
