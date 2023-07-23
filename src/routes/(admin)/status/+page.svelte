<script lang="ts">
	import type { PageData } from '../$types';

	import { onMount } from 'svelte';

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

	export let data: PageData;
	let { ordersList } = data;

	type FormResult = {
		success: boolean;
		error: string;
	} | null;
	let form: FormResult = null;
	let updating = false;

	const tableHead = ['id', 'username', 'chemicalName', 'statusID'];

	let filteredOrdersList = ordersList;

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
		form = null;
		updating = true;
		order.statusID++;

		if (order.statusID == 4) {
			order.statusID = 1;
		}

		const response = await fetch('/status', {
			method: 'PUT',
			body: JSON.stringify({ order }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		updating = false;

		if (form?.success) {
			filterByStatus(filterSetting);
		}
	}

	onMount(() => {
		sortTable('id');
	});
</script>

{#if ordersList}
	<div class="fixed top-14 bg-opNeutral z-10 w-full">
		<Heading tag="h2" class="text-center mt-3">Modify Status</Heading>
		<div class="h-8 ml-4 text-center">
			{#if updating}
				<p class="text-red-500">Updating...</p>
			{/if}
			{#if form?.success}
				<p class="text-green-500">Updated.</p>
			{/if}
			{#if form?.error}
				<p class="text-red-500">{form.error}</p>
			{/if}
		</div>

		<div class="flex gap-2 pb-4">
			<Button on:click={() => filterByStatus(0)}>Display All</Button>
			<Button on:click={() => filterByStatus(1)}>Display Submitted</Button>
			<Button on:click={() => filterByStatus(2)}>Display Ordered</Button>
			<Button on:click={() => filterByStatus(3)}>Display Received</Button>
		</div>
	</div>
	<form method="POST" action="./updateStatus">
		<div class="mx-8 mt-36">
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
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
