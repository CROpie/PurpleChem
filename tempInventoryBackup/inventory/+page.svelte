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
	import Button from '$lib/components/button/Button.svelte';
	import DetailsTab from './DetailsTab.svelte';
	import Input from '$lib/components/form/Input.svelte';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import { clickOutside } from '$lib/components/dropdown/clickOutside';

	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	import type { orders, locations } from './orderType';

	export let form: ActionData;

	/* STRUCTURE */
	import { RDKitSS } from '$lib/stores/rdkitstore2';
	const RDKitModule = $RDKitSS;
	let currentSVG = '';

	/* VARIABLES */
	export let data: PageData;

	let ordersList: orders[] = data.ordersList;
	$: ordersList = data.ordersList;
	let filteredOrdersList: orders[] = ordersList;

	let locationsList: locations[] = data.locationsList;
	$: locationsList = data.locationsList;

	// filter & sort options
	let selectedLocationID = -1;
	let currentLocation = 'All';

	let sortByName = true;
	let sortByDate = false;

	let addNew = false;

	/* FUNCTIONS */
	onMount(() => {
		sortOrders();
	});

	// Sidebar
	function newLocationClickHandler() {
		addNew = true;
		form = null;
	}

	function addNewLocation() {
		addNew = false;
	}

	const chooseLocation = (locationID: number, locationName: string) => {
		addNew = false;
		selectedLocationID = locationID;
		currentLocation = locationName;
		filterOrdersList();
	};

	const filterOrdersList = () => {
		if (selectedLocationID == -1) {
			filteredOrdersList = ordersList;
		} else if (selectedLocationID == -2) {
			filteredOrdersList = ordersList.filter((order: orders) => {
				return order.locationID == null;
			});
		} else {
			filteredOrdersList = ordersList.filter((order: orders) => {
				return order.locationID?.id == selectedLocationID;
			});
		}
		sortOrders();
	};

	function sortOrders() {
		if (sortByName) {
			filteredOrdersList = filteredOrdersList.sort((a, b) =>
				a.chemicalID.chemicalName > b.chemicalID.chemicalName ? 1 : -1
			);
		} else if (sortByDate) {
			filteredOrdersList = filteredOrdersList.sort((a, b) => (a.id > b.id ? 1 : -1));
		}
	}

	function getSVG(smile: string) {
		if (RDKitModule) {
			currentSVG = RDKitModule.get_mol(smile).get_svg();
		}
	}

	// used from DetailsTab when updating data
	const refreshData = async () => {
		filterOrdersList();
		sortOrders();
	};

	// used when forcing order.status -> received
	const forceStatus: SubmitFunction = async () => {
		return async ({ update }) => {
			await update();
			refreshData();
		};
	};
</script>

{#if !ordersList || !locationsList}
	<p class="text-primary">
		Error retrieving data from the database. Please try refreshing the page.
	</p>
{:else}
	<div class="flex flex-wrap">
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
						<form method="POST" action="?/addLocation" use:enhance={addNewLocation}>
							<Input type="text" name="newLocation" class="w-full" outline autofocus />
						</form>
					{/if}
				</SidebarGroup>
				<SidebarGroup border>
					<SidebarItem label="New" class="text-neutral" on:click={newLocationClickHandler} />
				</SidebarGroup>
			</SidebarWrapper>
			<!-- <Button type="button" on:click={generateSVGs} outline>GENERATE STRUCTURES</Button> -->
		</Sidebar>

		<div class="flex-1">
			<Heading tag="h3">{currentLocation}</Heading>

			<AccordionDouble outline>
				{#each filteredOrdersList as order (order.id)}
					<AccordionItemDouble {order} class="text-sm sm:text-lg">
						<button
							slot="title"
							on:click={() => {
								addNew = false;
								if (order.chemicalID.smile) {
									getSVG(order.chemicalID.smile);
								} else {
									currentSVG = '';
								}
							}}
						>
							{#if order.statusID.id != 3}
								<p class="break-words">{order.chemicalID.chemicalName} ({order.id})*</p>
							{:else}
								<p class="break-words">{order.chemicalID.chemicalName} ({order.id})</p>
							{/if}
						</button>

						<div slot="content" class="ml-4">
							<Heading tag="h6" class="text-complement">MODIFY</Heading>
							{#if order.statusID.id == 1 || order.statusID.id == 2}
								<p class="text-primary">
									Chemical is yet to arrive. Order Status: <span class="text-complement"
										>{order.statusID.statusValue}</span
									>.
								</p>

								<form method="POST" action="?/forceStatus" use:enhance={forceStatus}>
									<input type="hidden" name="orderID" value={order.id} />
									<Button outline type="submit">Demo: Force status = received</Button>
								</form>
							{:else}
								<DetailsTab {order} {locationsList} {form} on:triggerUpdateLocation={refreshData} />
							{/if}
						</div>

						<div slot="edit" class="ml-4">
							<Heading tag="h6" class="text-complement">PROPERTIES</Heading>

							<div class="flex flex-wrap gap-2">
								<div class="border-2 border-primary">
									{@html `${currentSVG}`}
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
					<p class="text-primary">There's nothing here!</p>
				{/each}
			</AccordionDouble>
		</div>
	</div>
{/if}
{#if form?.error}
	<p class="text-red-500">{form.error}</p>
{/if}
