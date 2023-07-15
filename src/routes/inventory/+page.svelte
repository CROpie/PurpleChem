<script lang="ts">
	import { onMount } from 'svelte';
	import { Heading } from '$lib/components/typography/Typo';
	import Button from '$lib/components/button/Button.svelte';
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
	let RDKitModule: RDKitModule;
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

	// structure

	// possible to put this into layout?
	// maybe save RDKitModule in a store?
	async function initRDKit() {
		await initRDKitModule().then(function (instance) {
			RDKitModule = instance;
		});
	}

	function generateSVGs() {
		ordersList.forEach((order) => {
			if (!order.chemicalID.smile) {
				return;
			}
			order.svg = RDKitModule.get_mol(order.chemicalID.smile).get_svg();
		});
	}
</script>

{#await initRDKit()}
	<p>Setting up RDKit</p>
{:then}
	{#await ordersList}
		<p>Loading</p>
	{:then}
		{generateSVGs()}
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
							<svelte:fragment slot="title">
								<p>{order.chemicalID.chemicalName} ({order.id})</p>
							</svelte:fragment>

							<div slot="content" class="ml-4">
								<Heading tag="h6" class="text-complement">MODIFY</Heading>
								<DetailsTab {order} {locationsList} />
							</div>

							<div slot="edit" class="ml-4">
								<Heading tag="h6" class="text-complement">PROPERTIES</Heading>

								<div class="flex gap-2">
									<div class="border-2 border-primary">
										{#if order.svg}
											{@html `${order.svg}`}
										{:else}
											<p>NO IMAGE</p>
										{/if}
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
							</div>
						</AccordionItemDouble>
					{:else}
						<p>Empty Inventory!</p>
					{/each}
				</AccordionDouble>
			</div>
		</div>
	{/await}
{/await}
