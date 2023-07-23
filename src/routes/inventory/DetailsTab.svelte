<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	import type { order, location } from './orderType';

	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	/* VARIABLES */
	export let order: order;
	export let locationsList: location[];
	export let form: ActionData;

	const dispatch = createEventDispatcher();

	// Validation / messages
	const numbersOnly = /^[0-9]+$/;
	let failValidation = false;
	let saving = false;

	// ser the text and value of the custom dropdown (select)
	let currentLocation: string | null = null;
	let currentValue: number | null = null;

	if (order.locationID) {
		currentLocation = order.locationID.locationName;
		currentValue = order.locationID.id;
	} else {
		currentLocation = 'Choose a storage location.';
	}

	const validateData: SubmitFunction = ({ cancel }) => {
		failValidation = false;
		if (!numbersOnly.test(order.amount)) {
			failValidation = true;
			cancel();
			return;
		}
		saving = true;
		return async ({ update }) => {
			saving = false;
			// await update()
			// update() had some problems (cleared amount field?), using invalidateAll() instead

			await invalidateAll();
			// runs filterOrdersList() to update to the new location
			dispatch('triggerUpdateLocation');
		};
	};
</script>

<!-- need to fix formating for small screen sizes -->
<form method="POST" action="?/updateData" class="flex gap-5 flex-wrap" use:enhance={validateData}>
	<div class="flex items-center justify-start w-64 gap-1">
		<p>Remaining:</p>
		<Input
			bind:value={order.amount}
			name="amount"
			type="text"
			class="text-primary text-end"
			outline
		/>
		<!-- <input bind:value={order.amount} name="amount" type="text" class="text-primary text-end" /> -->
		<p>{order.amountUnit}</p>
	</div>

	<div class="flex justify-start w-64 items-center gap-1">
		<p class="block whitespace-nowrap">{'Change Location: '}</p>

		<DropSelect
			name="locationID"
			class="w-64 border-2 rounded-lg"
			outline
			defaultText={currentLocation}
			bind:value={currentValue}
		>
			{#each locationsList as location (location?.id)}
				<DropSelectItem value={location?.id} label={location?.locationName} />
			{:else}
				<DropSelectItem label="No Locations!" />
			{/each}
		</DropSelect>

		<Button type="submit" outline class="border-none text-2xl">✓</Button>
		<input type="hidden" name="orderID" value={order.id} />
	</div>
</form>
{#if failValidation}
	<p class="text-red-500">Please enter an integer in the 'remaining' field.</p>
{/if}
{#if saving}
	<p class="text-red-500">Saving...</p>
{/if}
{#if form?.error}
	<p class="text-red-500">{form.error}</p>
{/if}
