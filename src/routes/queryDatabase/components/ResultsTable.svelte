<script lang="ts">
	/* MINOR COMPONENTS */
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '$lib/components/table/TableAll';
	import { Button } from '$lib/components/button/button';

	/* TYPES */
	import type { QueryData } from '$lib/types/queryDatabase';

	export let allQueryOrders: QueryData[];

	$: allQueryOrders && displayWithConsumed();

	let filteredQueryOrders: QueryData[] = allQueryOrders ? allQueryOrders : [];

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

	// Consumed chemical toggle
	let showConsumed = true;

	// Table sorting defaults
	let sortKey = 'chemicalName';
	let sortDirection = 1;

	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = -sortDirection;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
		filteredQueryOrders = filteredQueryOrders.sort((a, b) =>
			// @ts-ignore
			a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? -sortDirection : sortDirection
		);
	};

	const displayWithConsumed = () => {
		showConsumed = true;
		filteredQueryOrders = allQueryOrders;
		sortDirection = 1;
		sortTable('chemicalName');
	};

	const displayWithoutConsumed = () => {
		showConsumed = false;
		filteredQueryOrders = allQueryOrders?.filter((order) => order.isConsumed == 'no');
		sortDirection = 1;
		sortTable('chemicalName');
	};
</script>

{#if showConsumed}
	<Button type="button" outline on:click={displayWithoutConsumed}>Hide Consumed</Button>
{:else}
	<Button type="button" outline on:click={displayWithConsumed}>Show Consumed</Button>
{/if}

<div class="mt-4">
	<Table hoverable color="primary" outline>
		<TableHead>
			{#each tableHead as heading}
				<TableHeadCell on:click={() => sortTable(heading)}>{heading}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each filteredQueryOrders as order}
				<TableBodyRow>
					{#each tableHead as heading}
						<TableBodyCell>{order[heading]}</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
