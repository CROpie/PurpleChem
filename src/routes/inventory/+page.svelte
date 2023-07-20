<script lang="ts">
	console.log('page was just refreshed.');

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
	import type { orders, locations } from './orderType';

	export let data: PageData;

	import type { ActionData } from './$types';
	export let form: ActionData;

	// let locationsList: locations[] = data.locationsList;
	// let ordersList: orders[] = data.ordersList;

	// $: ordersList = data.ordersList;
	// let filteredOrdersList: orders[] = ordersList;

	let locationsList: locations[] = data.locationsList;
	let ordersList: orders[] = data.ordersStuff.ordersList;
	let ordersError = data.ordersStuff.orderError;

	$: ordersList = data.ordersStuff.ordersList;
	let filteredOrdersList: orders[] = ordersList;

	let addNew = false;

	// filter ordersList based on which is selected
	let selectedLocationID = -1;
	let currentLocation = 'All';

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
		sortOrders();
	};

	let sortByName = true;
	let sortByDate = false;

	function sortOrders() {
		if (sortByName) {
			filteredOrdersList = filteredOrdersList.sort((a, b) =>
				a.chemicalID.chemicalName > b.chemicalID.chemicalName ? 1 : -1
			);
		} else if (sortByDate) {
			filteredOrdersList = filteredOrdersList.sort((a, b) => (a.id > b.id ? 1 : -1));
		}
	}

	import { onMount } from 'svelte';

	onMount(() => {
		sortOrders();
	});

	// structure

	// possible to put this into layout?
	// maybe save RDKitModule in a store?
	// Yes, successful!
	// async function initRDKit() {
	// 	await initRDKitModule().then(function (instance) {
	// 		RDKitModule = instance;
	// 	});
	// }

	import { RDKitSS } from '$lib/stores/rdkitstore2';
	import { invalidateAll } from '$app/navigation';
	const RDKitModule = $RDKitSS;

	// first itiration generated all the svgs upon opening the page
	// really not necesary though, and slowed things down even with just ~10 entries
	// switched to generating on click (getSVG(smile) runs when a title is clicked

	// function generateSVGs() {
	// 	ordersList.forEach((order) => {
	// 		if (!order.chemicalID.smile) {
	// 			return;
	// 		}
	// 		if (RDKitModule) {
	// 		order.svg = RDKitModule.get_mol(order.chemicalID.smile).get_svg();
	// 		}
	// 	});
	// }

	let currentSVG = '';
	function getSVG(smile: string) {
		if (RDKitModule) {
			currentSVG = RDKitModule.get_mol(smile).get_svg();
		}
	}

	const refreshData = async () => {
		// await invalidate('/inventory');
		// await invalidateAll();
		filterOrdersList();
		sortOrders();
	};
</script>

<!-- {#await initRDKit()}
	Prior to initializing and storing RDKitModule in a store,
	needed to use this await setting to ensure that it had loaded before trying to make svg's
	Don't need to do this anymore since it initializes when the app is opened

	<p>Setting up RDKit</p>
{:then} -->

<!-- {generateSVGs()} -->

{#if ordersError}
	<p class="text-primary">
		Error retrieving data from the database. Please try refreshing the page.
	</p>
{:else}
	<div class="flex">
		<Sidebar class="mt-9" outline>
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem label="All" on:click={() => chooseLocation(-1, 'All')} startSelected />
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
					<SidebarItem label="New" class="text-neutral" on:click={() => (addNew = true)} />
				</SidebarGroup>
			</SidebarWrapper>
			<!-- <Button type="button" on:click={generateSVGs} outline>GENERATE STRUCTURES</Button> -->
		</Sidebar>

		<div class="flex-1">
			<Heading tag="h3">{currentLocation}</Heading>

			<AccordionDouble outline>
				{#each filteredOrdersList as order (order.id)}
					<AccordionItemDouble {order}>
						<button
							slot="title"
							on:click={() => {
								if (order.chemicalID.smile) {
									getSVG(order.chemicalID.smile);
								}
							}}
						>
							<p>{order.chemicalID.chemicalName} ({order.id})</p>
						</button>

						<div slot="content" class="ml-4">
							<Heading tag="h6" class="text-complement">MODIFY</Heading>
							<DetailsTab {order} {locationsList} {form} on:triggerUpdateLocation={refreshData} />
						</div>

						<div slot="edit" class="ml-4">
							<Heading tag="h6" class="text-complement">PROPERTIES</Heading>

							<div class="flex flex-wrap gap-2">
								<div class="border-2 border-primary">
									{@html `${currentSVG}`}
									<!-- {#if order.svg}
										{@html `${order.svg}`}
									{:else}
										<p>NO IMAGE</p>
									{/if} -->
								</div>
								<ul>
									<li>MW: {order.chemicalID.MW}</li>
									<li>BP: {order.chemicalID.BP}</li>
									<li>MP: {order.chemicalID.MP}</li>
									<li>Density: {order.chemicalID.density}</li>
								</ul>

								<ul>
									<li>CAS: {order.chemicalID.CAS}</li>
									<!-- TODO -->
									<li>Supplier:</li>
									<li>Date Ordered:</li>
								</ul>
							</div>
						</div>
					</AccordionItemDouble>
				{:else}
					<p>Empty Inventory!</p>
				{/each}
			</AccordionDouble>
		</div>
	</div>
{/if}
