<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem
	} from '$lib/components/sidebar/sidebarAll';

	import {
		AccordionDouble,
		AccordionItemDouble
	} from '$lib/components/Accordion2/accordionDoubleAll';

	import DetailsTab from './DetailsTab.svelte';

	import type { PageData } from './$types';

	import { afterUpdate } from 'svelte';

	export let data: PageData;
	const { locationsList, ordersList } = data;

	let addNew = false;

	let currentLocation = 'All';

	// filter ordersList based on which is selected
	let selectedLocationID = -1;
	let filteredOrdersList = ordersList;

	const chooseLocation = (locationID: number, locationName: string) => {
		selectedLocationID = locationID;
		currentLocation = locationName;
		filterOrdersList();
	};

	const filterOrdersList = () => {
		if (selectedLocationID == -1) {
			filteredOrdersList = ordersList;
		} else {
			filteredOrdersList = ordersList.filter((order) => {
				return order.locationID.id == selectedLocationID;
			});
		}
	};

	afterUpdate(() => {
		filterOrdersList();
	});
</script>

{#await ordersList}
	<p>Loading</p>
{:then}
	<div class="flex">
		<Sidebar>
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem label="All" on:click={() => chooseLocation(-1, 'All')} />
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
						<form method="POST" action="?/addLocation">
							<input type="text" name="newLocation" class="w-full" />
						</form>
					{/if}
				</SidebarGroup>
				<SidebarGroup border>
					<SidebarItem label="New" class="dark:text-green-500" on:click={() => (addNew = true)} />
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
		<div class="border-2 dark:border-primaryB-300 flex-1">
			<Heading tag="h3">{currentLocation}</Heading>
			<AccordionDouble>
				{#each filteredOrdersList as order}
					<AccordionItemDouble>
						<svelte:fragment slot="title">
							<div class="flex">
								<p>{order.chemicalID.chemicalName}</p>
								<p>{order.chemicalID.id}</p>
							</div>
						</svelte:fragment>
						<div slot="content" class="flex flex-col">
							<DetailsTab {order} {locationsList} />
						</div>
						<svelte:fragment slot="edit">
							{order.CAS}
						</svelte:fragment>
					</AccordionItemDouble>
				{:else}
					<p>Empty Inventory!</p>
				{/each}
			</AccordionDouble>
		</div>
	</div>
{/await}
