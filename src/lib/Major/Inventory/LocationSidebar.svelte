<script lang="ts">
	import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem
	} from '$lib/components/sidebar/sidebarAll';
	import Input from '$lib/components/form/Input.svelte';

	import type { locations } from './orderType';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	// variables
	export let locationsList: locations[];

	// bound to Inventory.svelte
	export let selectedLocationID;
	export let currentLocation;

	console.log(window.location);

	// form submission
	type FormResult = {
		success: boolean;
		error: string | null;
	} | null;

	let form: FormResult = null;
	let newLocationData: locations;

	let newLocation: string | null = null;
	let waiting = false;
	let addNew = false;

	const dispatch = createEventDispatcher();

	// functions

	function newLocationClickHandler() {
		// bug: clicking 'New' causes 'selected' to disappear from All (or whatever it was on).
		// the selectedLocationID doesn't change, so the displayed orders doesn't change. Just the hightlight on the text.
		addNew = true;
		form = null;
	}

	const chooseLocation = (locationID: number, locationName: string) => {
		addNew = false;
		selectedLocationID = locationID;
		currentLocation = locationName;
	};

	async function handleSubmit() {
		form = null;
		addNew = false;
		waiting = false;

		if (!newLocation) {
			return;
		}

		waiting = true;
		const origin = window.location.origin;
		const response = await fetch(`${origin}/inventory`, {
			method: 'POST',
			body: JSON.stringify({ newLocation }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const jsonResponse = await response.json();
		form = jsonResponse.form;
		newLocationData = jsonResponse.newLocationData;

		waiting = false;
		if (!form?.success) {
			return;
		}
		if (form?.success) {
			dispatch('triggerAddLocation', newLocationData);
		}
	}
</script>

<Sidebar class="mt-9 w-full sm:w-64" outline>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="All" on:click={() => chooseLocation(-1, 'All')} startSelected />
			<SidebarItem label="Unsorted" on:click={() => chooseLocation(-2, 'Unsorted')} />
		</SidebarGroup>
		<SidebarGroup border>
			{#each locationsList as location (location.id)}
				<SidebarItem
					label={location.locationName}
					on:click={() => chooseLocation(location.id, location.locationName)}
				/>
			{:else}
				<SidebarItem label="" />
			{/each}

			{#if addNew}
				<form on:submit|preventDefault={handleSubmit}>
					<Input
						type="text"
						name="newLocation"
						class="w-full"
						bind:value={newLocation}
						outline
						autofocus
					/>
				</form>
			{/if}
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarItem label="New" class="text-neutral" on:click={newLocationClickHandler} />
		</SidebarGroup>
	</SidebarWrapper>
	{#if waiting}
		<p class="text-red-500">Connecting to server...</p>
	{/if}
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	{#if form?.success}
		<p class="text-complement">New Location Added</p>
	{/if}
</Sidebar>
