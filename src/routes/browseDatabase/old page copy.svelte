<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { afterUpdate } from 'svelte';

	export let data;

	$: filteredOrders = data.orders ?? [];

	let sourceData: any[] = [];
	let orderTable: any;

	let pageLoad = false;

	const init = () => {
		sourceData = [];
		filteredOrders?.forEach((entry, index) => {
			let consumed;
			if (entry.isConsumed) {
				consumed = 'yes';
			} else {
				consumed = 'no';
			}
			let tableData = {
				position: index + 1,
				chemical: entry.chemical.chemicalName,
				user: entry.user.userName,
				amount: `${entry.amount} ${entry.amountUnit}`,
				consumed
			};
			sourceData.push(tableData);
		});

		orderTable = {
			// A list of heading labels.
			head: ['Chemical', 'User', 'Amount', 'Consumed?'],
			// The data visibly shown in your table body UI.
			body: tableMapperValues(sourceData, ['chemical', 'user', 'amount', 'consumed']),
			// Optional: The data returned when interactive is enabled and a row is clicked.
			meta: tableMapperValues(sourceData, ['position', 'chemical', 'user', 'amount', 'consumed'])
		};

		pageLoad = true;
	};

	afterUpdate(() => {
		init();
	});

	const clickRow = (event) => {
		console.log(event.detail);
	};

	const hideConsumed = () => {
		filteredOrders = filteredOrders?.filter((order) => order.isConsumed == false);
		init();
	};
</script>

<h1>Database</h1>
<button type="button" on:click={hideConsumed}>Hide Consumed</button>
{#if pageLoad}
	<Table interactive={true} on:selected={clickRow} source={orderTable} />
{/if}

{#each filteredOrders as order}
	<p>{order.amount}</p>
	<p>{order.id}</p>
{/each}
