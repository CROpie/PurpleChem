<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	import { createEventDispatcher } from 'svelte';

	import type { DBOrder, DBLocation, ModifyOrder } from '$lib/types/inventory';
	import type { FetchOutcome, FormResult } from '$lib/types/formTypes';

	import ModifyMessages from './ModifyMessages.svelte';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	/* VARIABLES */
	export let order: DBOrder;
	export let locationsList: DBLocation[];

	let outcome: FetchOutcome = null;

	const dispatch = createEventDispatcher();

	// Validation / messages
	const numbersOnly = /^[0-9]+$/;

	// set the text and value of the custom dropdown (select)
	let currentLocation = 'Choose a storage location.';
	let currentValue: number | null = null;

	console.log(order);
	if (order.location) {
		currentLocation = order.location.locationName;
		currentValue = order.location_id;
	}

	// form variables
	let failValidation = false;
	let waiting = false;

	let form: FormResult = null;

	async function handleSubmit() {
		form = null;
		failValidation = false;
		waiting = false;

		if (!numbersOnly.test(String(order.amount))) {
			failValidation = true;
			return;
		}

		waiting = true;

		console.log(order.id, order.amount, currentValue);

		const response = await ClientAPI.post('/patchamountlocation', null, {
			body: {
				orderID: order.id,
				amount: order.amount,
				locationID: currentValue
			}
		});

		waiting = false;

		outcome = response.outcome;
		const data: ModifyOrder = response.data;

		if (outcome?.success) {
			dispatch('triggerUpdate', data);
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
		<Input
			data-testid="amount"
			bind:value={order.amount}
			name="amount"
			type="number"
			class="text-primary text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
<ModifyMessages {outcome} {waiting} {failValidation} />
