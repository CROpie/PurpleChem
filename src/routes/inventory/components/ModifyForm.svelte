<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	/* MAJOR COMPONENTS */
	import ModifyMessages from './ModifyMessages.svelte';

	/* MODULES */
	import { createEventDispatcher } from 'svelte';

	/* TYPTES */
	import type {
		DBOrder,
		DBLocation,
		ModifyOrder,
		InventoryAccordionMessageState
	} from '$lib/types/inventory';

	const ClientAPI = $page.data.ClientAPI;

	export let order: DBOrder;
	export let locationsList: DBLocation[];

	const dispatch = createEventDispatcher();

	let dropdownLocationID: number | null = null;
	let dropdownLocationName = 'Choose a storage location.';

	let messageState: InventoryAccordionMessageState = {
		fetchOutcome: null,
		failValidation: false,
		waiting: false
	};

	if (order.location) {
		dropdownLocationID = order.location.id;
		dropdownLocationName = order.location.locationName;
	}

	async function handleSubmit() {
		messageState.fetchOutcome = null;
		messageState.failValidation = false;

		const numbersOnly = /^[0-9]+$/;

		if (!numbersOnly.test(String(order.amount))) {
			messageState.failValidation = true;
			return;
		}

		messageState.waiting = true;

		const response = await ClientAPI.post('/patchamountlocation', null, {
			body: {
				orderID: order.id,
				amount: order.amount,
				locationID: dropdownLocationID
			}
		});

		messageState.waiting = false;

		messageState.fetchOutcome = response.outcome;
		const data: ModifyOrder = response.data;

		if (messageState.fetchOutcome?.success) {
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
			defaultText={dropdownLocationName}
			bind:value={dropdownLocationID}
		>
			{#each locationsList as location (location?.id)}
				<DropSelectItem value={location.id} label={location.locationName} />
			{:else}
				<DropSelectItem label="No Locations!" />
			{/each}
		</DropSelect>
	</div>
	<div>
		<Button type="submit" outline class="border-none text-2xl">✓</Button>
	</div>
</form>
<ModifyMessages {messageState} />
