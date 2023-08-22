<script lang="ts">
	/* MINOR COMPONENTS */
	import Heading from '$lib/components/typography/Heading.svelte';

	/* MAJOR COMPONENTS */
	import LocationSidebar from './LocationSidebar.svelte';
	import InventoryAccordion from './InventoryAccordion.svelte';

	/* TYPES */
	import type { DBLocation, DBOrder, ModifyOrder } from '$lib/types/inventory';

	export let locationsList: DBLocation[];
	export let ordersList: DBOrder[];

	let filteredOrdersList = [...ordersList];

	// filter & sort options
	let selectedLocation: DBLocation = {
		id: -1,
		locationName: 'All'
	};

	$: selectedLocation && filterOrdersList();

	const filterOrdersList = () => {
		filteredOrdersList = [...ordersList];

		filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
			return order.isConsumed == false;
		});
		// ALL
		if (selectedLocation.id == -1) {
			// do nothing
			// UNSORTED
		} else if (selectedLocation.id == -2) {
			filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
				return order.location_id == null;
			});
			// SPECIFIC LOCATION
		} else {
			filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
				return order.location_id == selectedLocation.id;
			});
		}
		sortOrders();
	};

	function sortOrders() {
		filteredOrdersList = filteredOrdersList.sort((a, b) =>
			a.chemical.chemicalName!.toLowerCase() > b.chemical.chemicalName!.toLowerCase() ? 1 : -1
		);
	}

	// JavaScript client update of DB alterations (via component event dispatches)
	const addLocation = async ({ detail }: { detail: DBLocation }) => {
		const newLocationData = detail;
		locationsList = [...locationsList, newLocationData];
	};

	const deleteLocation = async ({ detail }: { detail: DBLocation }) => {
		const locationToDelete = detail;
		locationsList = locationsList.filter((location) => location.id != locationToDelete.id);
		// locationsList = [...locationsList];
	};

	const modifyData = async ({ detail }: { detail: ModifyOrder }) => {
		const modifiedData = detail;

		const oldOrder = ordersList.find((order) => {
			return order.id == modifiedData.id;
		});

		if (!oldOrder) {
			console.log('something went wrong...');
			return;
		}

		oldOrder.amount = modifiedData.amount;
		if (oldOrder.amount == 0) {
			oldOrder.isConsumed = true;
		}
		oldOrder.location = modifiedData.location;
		modifiedData.location ? (oldOrder.location_id = modifiedData.location.id) : null;

		ordersList = [...ordersList];

		filterOrdersList();
	};

	const forceStatus = ({ detail }: { detail: { order_id: number } }) => {
		ordersList.find((order) => {
			if (order.id == detail.order_id) {
				order.status = 'received';
			}
		});
		ordersList = [...ordersList];

		filterOrdersList();
	};
</script>

<div class="flex flex-wrap">
	<LocationSidebar
		{locationsList}
		bind:selectedLocation
		on:triggerAddLocation={addLocation}
		on:triggerDeleteLocation={deleteLocation}
	/>
	<div class="flex-1">
		<Heading tag="h3" class="ml-5 mt-2">{selectedLocation.locationName}</Heading>
		<InventoryAccordion
			{locationsList}
			{filteredOrdersList}
			on:triggerUpdate={modifyData}
			on:triggerForceStatus={forceStatus}
		/>
	</div>
</div>
