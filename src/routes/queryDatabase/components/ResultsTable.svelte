<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '$lib/components/table/TableAll';
	import { Button } from '$lib/components/button/button';

	type QueryData = {
		id: number;
		amount: number | string;
		amountUnit?: string;
		isConsumed: boolean | string;
		orderDate: string;
		status: string;
		supplierPN: string | null;
		fullname: string;
		CAS: string;
		chemicalName: string;
		supplierName: string;
	};

	export let allQueryOrders: QueryData[];
	$: allQueryOrders && displayWithConsumed();

	let queryOrders: QueryData[] = [];

	const tableHead = [
		'chemicalName',
		'CAS',
		'fullname',
		'amount',
		'isConsumed',
		'supplierName',
		'status',
		'orderDate'
	];

	let showingConsumed = true;

	// Table sorting
	let sortKey = 'chemicalName'; // default sort key
	let sortDirection = 1; // default sort direction (ascending)

	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = -sortDirection;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
		queryOrders = queryOrders.sort((a, b) =>
			// @ts-ignore
			a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? -sortDirection : sortDirection
		);
	};

	const displayWithConsumed = () => {
		showingConsumed = true;
		queryOrders = allQueryOrders;
		sortDirection = 1;
		sortTable('chemicalName');
	};

	const displayWithoutConsumed = () => {
		showingConsumed = false;
		queryOrders = allQueryOrders?.filter((order) => order.isConsumed == 'no');
		sortDirection = 1;
		sortTable('chemicalName');
	};
</script>

{#if showingConsumed}
	<Button type="button" outline on:click={displayWithoutConsumed}>Hide Consumed</Button>
{:else}
	<Button type="button" outline on:click={displayWithConsumed}>Show Consumed</Button>
{/if}

<div class="mt-4">
	<Table hoverable color="primary" striped>
		<TableHead>
			{#each tableHead as heading}
				<TableHeadCell on:click={() => sortTable(heading)}>{heading}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each queryOrders as order}
				<TableBodyRow>
					{#each tableHead as heading}
						<TableBodyCell>{order[heading]}</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
