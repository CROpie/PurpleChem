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
	export let data;

	//$: filteredOrders = data.orders ?? [];
	let searchMethod = '';
	let searchTerm = '';
	let searchTermUser = '';

	const hideConsumed = () => {
		filteredOrders = filteredOrders?.filter((order) => order.isConsumed == false);
	};

	// works, but maybe users as dropdown instead?
	// some way to display which methods of searching you want to use?
	$: filteredOrders = data.orders
		?.filter(
			(item) => item.chemical.chemicalName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
		.filter(
			(item) => item.user.userName.toLowerCase().indexOf(searchTermUser.toLowerCase()) !== -1
		);
</script>

<Heading tag="h2" class="text-center mt-3">Search Database</Heading>

<div class="mx-8 mt-3">
	<div class="flex justify-end mb-3">
		<Button type="button" on:click={hideConsumed}>Hide Consumed</Button>
	</div>

	<Search bind:inputValue={searchTerm} placeholder="Search by chemical name" />
	<Search bind:inputValue={searchTermUser} placeholder="Search by user" />

	<Table shadow hoverable bind:inputValue={searchTerm} striped color="primary">
		<TableHead>
			<TableHeadCell>Chemical</TableHeadCell>
			<TableHeadCell>User</TableHeadCell>
			<TableHeadCell>Amount</TableHeadCell>
			<TableHeadCell>Consumed</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each filteredOrders as order}
				<TableBodyRow>
					<TableBodyCell>{order.chemical.chemicalName}</TableBodyCell>
					<TableBodyCell>{order.user.userName}</TableBodyCell>
					<TableBodyCell>{order.amount} {order.amountUnit}</TableBodyCell>
					<TableBodyCell>{order.isConsumed}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
