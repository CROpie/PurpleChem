<script lang="ts">
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { DBLocation, DBOrder, ModifyOrder } from '$lib/types/inventory';

	// Components
	import LocationSidebar from './LocationSidebar.svelte';
	import InventoryAccordion from './InventoryAccordion.svelte';

	export let locationsList: DBLocation[];
	export let ordersList: DBOrder[];

	let filteredOrdersList = [...ordersList];

	// filter & sort options
	let currentLocation = 'All';
	let selectedLocationID = -1;

	$: selectedLocationID && filterOrdersList();

	const filterOrdersList = () => {
		filteredOrdersList = [...ordersList];

		filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
			return order.isConsumed == false;
		});
		// ALL
		if (selectedLocationID == -1) {
			// do nothing
			// UNSORTED
		} else if (selectedLocationID == -2) {
			filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
				return order.location_id == null;
			});
			// SPECIFIC LOCATION
		} else {
			filteredOrdersList = filteredOrdersList.filter((order: DBOrder) => {
				return order.location_id == selectedLocationID;
			});
		}
		sortOrders();
	};

	function sortOrders() {
		filteredOrdersList = filteredOrdersList.sort((a, b) =>
			a.chemical.chemicalName?.toLowerCase() > b.chemical.chemicalName?.toLowerCase() ? 1 : -1
		);
	}

	// JavaScript client update of DB alterations (via component event dispatches)
	const addLocation = async ({ detail }: { detail: DBLocation }) => {
		const newLocationData = detail;
		locationsList = [...locationsList, newLocationData];
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
		bind:selectedLocationID
		bind:currentLocation
		on:triggerAddLocation={addLocation}
	/>
	<div class="flex-1">
		<Heading tag="h3" class="ml-5 mt-2">{currentLocation}</Heading>
		<InventoryAccordion
			{locationsList}
			{filteredOrdersList}
			on:triggerUpdate={modifyData}
			on:triggerForceStatus={forceStatus}
		/>
	</div>
</div>
