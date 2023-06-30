<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch
	} from 'flowbite-svelte';

	export let data;

	//$: filteredOrders = data.orders ?? [];
	let searchTerm = '';

	const hideConsumed = () => {
		filteredOrders = filteredOrders?.filter((order) => order.isConsumed == false);
	};

	$: filteredOrders = data.orders.filter(
		(item) => item.chemical.chemicalName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<h1>Database</h1>
<button type="button" on:click={hideConsumed}>Hide Consumed</button>
<TableSearch placeholder="Search by chemical name" hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>Chemical</TableHeadCell>
		<TableHeadCell>User</TableHeadCell>
		<TableHeadCell>Amount</TableHeadCell>
		<TableHeadCell>Consumed</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each filteredOrders as order}
			<TableBodyRow>
				<TableBodyCell>{order.chemical.chemicalName}</TableBodyCell>
				<TableBodyCell>{order.user.userName}</TableBodyCell>
				<TableBodyCell>{order.amount} {order.amountUnit}</TableBodyCell>
				<TableBodyCell>{order.isConsumed}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
