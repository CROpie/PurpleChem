<script lang="ts">
	import type { PageData } from '../$types';

	/* 
    Display table of orders
    Doesn't need to be the entire thing, just order, user, chemicalname, status
    Select all or click name to add, then press (status -> ordered) or (status -> received)
    */

	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '$lib/components/table/TableAll';

	const tableHead = ['id', 'username', 'chemicalName', 'statusID'];

	export let data: PageData;

	let { data: ordersList, supabase } = data;

	let filteredOrdersList = ordersList;
	let updating = false;

	let filterSetting = 0; // default to display all

	// SORTING BY CLICKING THE TABLE HEADING
	let sortKey = 'id'; // default sort key
	let sortDirection = 1; // default sort direction (ascending)

	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = -sortDirection;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
		filteredOrdersList = filteredOrdersList.sort((a, b) =>
			a[sortKey] > b[sortKey] ? -sortDirection : sortDirection
		);
	};

	function filterByStatus(status: number) {
		if (status == 0) {
			filteredOrdersList = ordersList;
			filterSetting = 0;
			return;
		}
		filteredOrdersList = ordersList.filter((order) => order.statusID == status);
		filterSetting = status;
	}

	async function updateStatus(order) {
		updating = true;
		order.statusID++;
		let newStatusID = order.statusID;

		if (newStatusID == 4) {
			newStatusID = 1;
		}

		const { data, error } = await supabase
			.from('orders')
			.update({ statusID: newStatusID })
			.eq('id', order.id);

		if (error) {
			console.log(error);
			updating = false;
			return;
		} else {
			order.statusID = newStatusID;
			filterByStatus(filterSetting);
			updating = false;
		}
	}
</script>

{#await filteredOrdersList then}
	{sortTable('id')}
{/await}

<Heading tag="h2" class="text-center mt-3">Modify Status</Heading>
<Button on:click={() => filterByStatus(0)}>Display All</Button>
<Button on:click={() => filterByStatus(1)}>Display Submitted</Button>
<Button on:click={() => filterByStatus(2)}>Display Ordered</Button>
<Button on:click={() => filterByStatus(3)}>Display Received</Button>
{#if updating}
	<p class="text-red-500">Updating..</p>
{/if}
<form method="POST" action="./updateStatus">
	<div class="mx-8 mt-3">
		<Table hoverable color="primary" striped>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell on:click={() => sortTable(heading)}>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody class="cursor-pointer">
				{#each filteredOrdersList as order (order.id)}
					<TableBodyRow>
						<TableBodyCell>{order.id}</TableBodyCell>
						<TableBodyCell>{order.userID.username}</TableBodyCell>
						<TableBodyCell>{order.chemicalID.chemicalName}</TableBodyCell>
						{#if order.statusID == 1}
							<TableBodyCell on:click={() => updateStatus(order)}>Submitted</TableBodyCell>
						{:else if order.statusID == 2}
							<TableBodyCell on:click={() => updateStatus(order)}>Ordered</TableBodyCell>
						{:else if order.statusID == 3}
							<TableBodyCell on:click={() => updateStatus(order)}>Received</TableBodyCell>
						{/if}
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</form>
