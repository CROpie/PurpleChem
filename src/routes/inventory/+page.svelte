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
	import type { order, location } from './orderType';

	import { afterUpdate } from 'svelte';

	let svgString = '';

	export let data: PageData;

	// https://flaviocopes.com/typescript-object-destructuring/
	const { locationsList, ordersList }: { locationsList: location[]; ordersList: order[] } = data;
	// $: console.log(ordersList, locationsList);

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
			filteredOrdersList = ordersList.filter((order: order) => {
				return order.locationID?.id == selectedLocationID;
			});
		}
		// console.log(filteredOrdersList);
	};

	afterUpdate(() => {
		filterOrdersList();
	});
</script>

{#await ordersList}
	<p>Loading</p>
{:then}
	<div class="flex">
		<Sidebar class="mt-9">
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
		<div class="flex-1">
			<Heading tag="h3">{currentLocation}</Heading>

			<AccordionDouble>
				{#each filteredOrdersList as order (order.id)}
					<AccordionItemDouble {order} bind:svgString>
						<svelte:fragment slot="title">
							<p>{order.chemicalID.chemicalName} ({order.id})</p>
						</svelte:fragment>

						<svelte:fragment slot="content">
							<DetailsTab {order} {locationsList} />
						</svelte:fragment>

						<svelte:fragment slot="edit">
							<Heading tag="h6" class="dark:text-black">PROPERTIES</Heading>

							<div class="flex gap-2">
								<div class="border-2 border-primaryA-600">
									{@html `${svgString}`}
								</div>
								<ul>
									<li>MW: {order.chemicalID.MW}</li>
									<li>BP: {order.chemicalID.BP}</li>
									<li>MP: {order.chemicalID.MP}</li>
									<li>Density: {order.chemicalID.density}</li>
								</ul>
							</div>
							<ul>
								<li>CAS: {order.chemicalID.CAS}</li>
								<!-- TODO -->
								<li>Supplier:</li>
								<li>Date Ordered:</li>
							</ul>
						</svelte:fragment>
					</AccordionItemDouble>
				{:else}
					<p>Empty Inventory!</p>
				{/each}
			</AccordionDouble>
		</div>
	</div>
{/await}
