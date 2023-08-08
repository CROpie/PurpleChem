<script lang="ts">
	import LocationSidebar from './LocationSidebar.svelte';
	import InventoryAccordion from './InventoryAccordion.svelte';

	import Heading from '$lib/components/typography/Heading.svelte';

	import type { orders, locations } from '$lib/types/orderType';

	export let locationsList: locations[];
	export let ordersList: orders[];
	$: ordersList;
	let filteredOrdersList: orders[] = ordersList;
	$: filteredOrdersList;

	// filter & sort options
	let selectedLocationID = -1;

	let currentLocation = 'All';

	$: selectedLocationID && filterOrdersList();

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
				a.chemicalID.chemicalName?.toLowerCase() > b.chemicalID.chemicalName.toLowerCase() ? 1 : -1
			);
		} else if (sortByDate) {
			filteredOrdersList = filteredOrdersList.sort((a, b) => (a.id > b.id ? 1 : -1));
		}
	}

	// const refreshData = async () => {
	// 	console.log('refreshing');
	// 	filterOrdersList();
	// };

	const addLocation = async ({ detail }) => {
		const newLocationData: locations = detail;
		locationsList = [...locationsList, newLocationData];
	};

	const modifyData = async ({ detail }) => {
		const modifiedData = detail;

		ordersList.forEach((order) => {
			if (order.id == modifiedData.orderID) {
				order.amount = Number(modifiedData.amount);
				order.statusID = modifiedData.statusID;
				order.locationID = modifiedData.locationID;
			}
		});

		filterOrdersList();
	};
</script>

<div class="flex flex-wrap">
	<LocationSidebar
		{locationsList}
		bind:selectedLocationID
		bind:currentLocation
		on:triggerAddLocation={addLocation}
	/>
	<div class="flex-1">
		<Heading tag="h3" class="ml-5 mt-2">{currentLocation}</Heading>
		<InventoryAccordion {locationsList} {filteredOrdersList} on:triggerUpdate={modifyData} />
	</div>
</div>
