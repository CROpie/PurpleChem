<script lang="ts">
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

	import Search from '$lib/components/Search.svelte';

	import type { PageData } from './$types';

	// Custom Types
	interface OrderData {
		id: string;
		chemicalName: string | null | undefined;
		user: string | null | undefined;
		amount: number | null;
		amountUnit: string | null;
		isConsumed: boolean;
	}

	export let data: PageData;
	let { supabase } = data;

	let queryOrders: OrderData[] = [];
	let queryChemicalName = '';

	const hideConsumed = () => {
		queryOrders = queryOrders?.filter((order) => order.isConsumed == false);
	};

	// for some reason, chemical!inner is essential to get this to work
	// should be a way to chain ilikes, but not sure exactly how.
	// maybe easier just using SQL than trying to figure out the supabase API??
	const queryDatabase = async () => {
		let { data, error } = await supabase
			.from('order')
			.select(
				`id, chemical!inner ( chemicalName ), user!inner ( userName ), amount, amountUnit, isConsumed`
			)
			.ilike('chemical.chemicalName', `%${queryChemicalName}%`);

		queryOrders = [];
		data?.forEach((order) => {
			const currentOrder = {
				id: order.id,
				chemicalName: order.chemical?.chemicalName,
				user: order.user?.userName,
				amount: order.amount,
				amountUnit: order.amountUnit,
				isConsumed: order.isConsumed
			};
			queryOrders.push(currentOrder);
		});
		sortTable('chemicalName');
	};

	// SORTING BY CLICKING THE TABLE HEADING
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
			a[sortKey] > b[sortKey] ? -sortDirection : sortDirection
		);
	};
</script>

<Heading tag="h2" class="text-center mt-3">Search Database</Heading>

<div class="mx-8 mt-3">
	<form class="flex-1" on:submit={queryDatabase}>
		<Search bind:inputValue={queryChemicalName} placeholder="Chemical Name" />
	</form>

	<div class="flex mb-3">
		<Button type="button" on:click={hideConsumed}>Hide Consumed</Button>
	</div>

	<Table hoverable color="primary" striped>
		<TableHead>
			<TableHeadCell on:click={() => sortTable('chemicalName')}>Chemical</TableHeadCell>
			<TableHeadCell on:click={() => sortTable('user')}>User</TableHeadCell>
			<TableHeadCell on:click={() => sortTable('amount')}>Amount</TableHeadCell>
			<TableHeadCell on:click={() => sortTable('isConsumed')}>Consumed</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each queryOrders as order (order.id)}
				<TableBodyRow>
					<TableBodyCell>{order.chemicalName}</TableBodyCell>
					<TableBodyCell>{order.user}</TableBodyCell>
					<TableBodyCell>{order.amount} {order.amountUnit}</TableBodyCell>
					<TableBodyCell>{order.isConsumed}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
