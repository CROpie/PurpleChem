<script lang="ts">
	import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem
	} from '$lib/components/sidebar/sidebarAll';
	import Input from '$lib/components/form/Input.svelte';

	import type { locations } from '$lib/types/orderType';
	import type { FormResult } from '$lib/types/formTypes';
	import { createEventDispatcher } from 'svelte';

	import type { FetchOutcome } from '$lib/types/formTypes';

	import LocationMessages from './LocationMessages.svelte';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI';

	const TestClient = new ClientSideApiClient();

	// variables
	export let locationsList: locations[];

	// bound to Inventory.svelte
	export let selectedLocationID;
	export let currentLocation;

	// form submission
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

	let outcome: FetchOutcome = null;

	async function handleSubmit() {
		if (!newLocation) {
			return;
		}
		waiting = true;
		const response = await TestClient.post('/addnewlocation', null, {
			body: { newLocation }
		});
		waiting = false;

		addNew = false;

		outcome = response.outcome;
		const newLocationData = response.data;

		if (outcome?.success) {
			dispatch('triggerAddLocation', newLocationData);
		}
	}
</script>

<Sidebar class="mt-12 w-full sm:w-64" outline>
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
	<LocationMessages bind:outcome bind:waiting />
</Sidebar>
