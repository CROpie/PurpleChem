<script lang="ts">
	import LocationSidebar from './LocationSidebar.svelte';
	import InventoryAccordion from './InventoryAccordion.svelte';

	import Heading from '$lib/components/typography/Heading.svelte';

	import type { orders, locations } from './orderType';

	export let locationsList: locations[];
	export let ordersList: orders[];
	let filteredOrdersList: orders[] = ordersList;
	$: filteredOrdersList = ordersList;

	// filter & sort options
	let selectedLocationID = -1;

	let currentLocation = 'All';

	$: selectedLocationID && refreshData();

	let sortByName = true;
	let sortByDate = false;

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

	const refreshData = async () => {
		filterOrdersList();
		sortOrders();
	};
</script>

<div class="flex flex-wrap">
	<LocationSidebar {locationsList} bind:selectedLocationID bind:currentLocation />
	<div class="flex-1">
		<Heading tag="h3">{currentLocation}</Heading>
		<InventoryAccordion
			{locationsList}
			{filteredOrdersList}
			on:triggerUpdateLocation={refreshData}
		/>
	</div>
</div>
