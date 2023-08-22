<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem
	} from '$lib/components/sidebar/sidebarAll';
	import Input from '$lib/components/form/Input.svelte';

	/* MAJOR COMPONENTS */
	import LocationMessages from './LocationMessages.svelte';

	/* MODULES */
	import { createEventDispatcher } from 'svelte';

	/*TYPES */
	import type {
		InventorySidebarMessageState,
		InventorySidebarComponentState,
		LocationInput,
		Location
	} from '$lib/types/inventory';

	export let locationsList: Location[];
	export let selectedLocation: Location;

	const ClientAPI = $page.data.ClientAPI;

	let locationInput: LocationInput = {
		locationName: null
	};

	let messageState: InventorySidebarMessageState = {
		fetchOutcome: null,
		waiting: false
	};

	let componentState: InventorySidebarComponentState = {
		addNew: false
	};

	const dispatch = createEventDispatcher();

	function newLocationClickHandler() {
		// bug: clicking 'New' causes 'selected' to disappear from All (or whatever it was on).
		// the selectedLocationID doesn't change, so the displayed orders doesn't change. Just the hightlight on the text.
		componentState.addNew = true;
	}

	async function deleteLocationClickHandler() {
		messageState.fetchOutcome = null;
		messageState.waiting = true;

		const response = await ClientAPI.post('/deletelocation', null, {
			body: { selectedLocationID: selectedLocation.id }
		});
		messageState.waiting = false;
		messageState.fetchOutcome = response.outcome;

		if (messageState.fetchOutcome?.success) {
			dispatch('triggerDeleteLocation', {
				id: selectedLocation.id,
				locationName: selectedLocation.locationName
			});
			selectedLocation.id = -1;
			selectedLocation.locationName = 'All';
		}
	}

	const chooseLocation = (location: Location) => {
		componentState.addNew = false;
		selectedLocation = location;
		messageState.fetchOutcome = null;
	};

	async function handleSubmitNew() {
		if (!locationInput.locationName) {
			return;
		}
		messageState.waiting = true;
		const response = await ClientAPI.post('/addnewlocation', null, {
			body: { newLocation: locationInput.locationName }
		});
		messageState.waiting = false;

		componentState.addNew = false;

		messageState.fetchOutcome = response.outcome;
		const newLocationData: Location = response.data;

		if (messageState.fetchOutcome?.success) {
			dispatch('triggerAddLocation', newLocationData);
		}
	}
</script>

<Sidebar class="mt-12 w-full sm:w-64" outline>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem
				label="All"
				on:click={() => chooseLocation({ id: -1, locationName: 'All' })}
				startSelected
			/>
			<SidebarItem
				label="Unsorted"
				on:click={() => chooseLocation({ id: -2, locationName: 'Unsorted' })}
			/>
		</SidebarGroup>
		<SidebarGroup border>
			{#each locationsList as location (location.id)}
				<SidebarItem label={location.locationName} on:click={() => chooseLocation(location)} />
			{:else}
				<SidebarItem label="" />
			{/each}

			{#if componentState.addNew}
				<form on:submit|preventDefault={handleSubmitNew}>
					<Input
						type="text"
						name="newLocation"
						class="w-full"
						bind:value={locationInput.locationName}
						outline
						autofocus
					/>
				</form>
			{/if}
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarItem label="New" class="text-neutral" on:click={newLocationClickHandler} />
			{#if selectedLocation.id > 0}
				<SidebarItem
					label="Delete Selected"
					class="text-primaryLight"
					on:click={deleteLocationClickHandler}
				/>
			{/if}
		</SidebarGroup>
	</SidebarWrapper>
	<LocationMessages bind:messageState />
</Sidebar>
