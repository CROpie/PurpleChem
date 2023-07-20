<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	//import Input from '/home/chris/repos/PurpleChem/node_modules/flowbite-svelte/dist/forms/Input.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	import type { order, location } from './orderType';
	export let order: order;
	export let locationsList: location[];
	import type { ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	export let form: ActionData;

	let currentLocation: string | null = null;
	let currentValue: number | null = null;
	if (order.locationID) {
		currentLocation = order.locationID.locationName;
		currentValue = order.locationID.id;
	} else {
		currentLocation = 'Choose a storage location.';
	}

	const numbersOnly = /^[0-9]+$/;
	let failValidation = false;
	let saving = false;

	// trigger a dispatch on save data to ensure that it updates
	// (otherwise requires alt-f4 before the location change is registered on the page.)
	const dispatch = createEventDispatcher();

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
			await update();

			// update() moves the chemical without a hard reload
			// it was clearing the 'remaining' input field, but that was perhaps because of a bug in my <Input/> component?
			// tried to figure out the cause, then it just stared working with no changes -_-

			// using invalidateAll() works just fine here (without dispatch).
			// need to run filteredOrdersList() so that eg if looking at bench, something moving from bench will disappear
			// for that, need to dispatch.

			// await invalidateAll();
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
	<p class="text-red-500">There was a problem with the database. Please try again...</p>
{/if}
