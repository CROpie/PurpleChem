<!-- <script lang="ts">
	export let data;
	console.log(data);
</script> -->

<script lang="ts">
	import { onMount } from 'svelte';

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

	import type { DBOrder } from '$lib/types/inventory';
	import type { FetchOutcome } from '$lib/types/formTypes.js';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	export let data;

	const { ordersList }: { ordersList: DBOrder[] } = data;

	let outcome: FetchOutcome = null;

	let updating = false;

	const tableHead = ['id', 'username', 'chemical', 'UPDATE STATUS (click)'];

	let filteredOrdersList = [...ordersList];

	const updateStatus = async (order: DBOrder) => {
		outcome = null;
		let newStatus = '';
		if (order.status == 'submitted') {
			newStatus = 'ordered';
		} else if (order.status == 'ordered') {
			newStatus = 'received';
		} else if (order.status == 'received') {
			newStatus = 'submitted';
		}
		updating = true;
		const response = await ClientAPI.post('/patchstatus', null, {
			body: {
				id: order.id,
				status: newStatus
			}
		});
		updating = false;

		outcome = response.outcome;
		if (outcome?.success) {
			order.status = newStatus;
			filteredOrdersList = [...filteredOrdersList];
		}
	};

	function filterByStatus(key: string) {
		filteredOrdersList = [...ordersList];
		if (key == 'all') {
			// do nothing
		} else {
			filteredOrdersList = ordersList.filter((order) => order.status == key);
		}
	}
</script>

{#if ordersList}
	<div class="fixed top-14 bg-opNeutral z-10 w-full">
		<Heading tag="h2" class="text-center mt-3">Modify Status</Heading>
		<div class="h-8 ml-4 text-center">
			{#if updating}
				<p class="text-red-500">Updating...</p>
			{/if}
			{#if outcome?.success}
				<p class="text-green-500">Updated.</p>
			{/if}
			{#if outcome?.error}
				<p class="text-red-500">{outcome.error}</p>
			{/if}
		</div>

		<div class="flex gap-2 pb-4 mx-8">
			<Button on:click={() => filterByStatus('all')}>Display All</Button>
			<Button outline on:click={() => filterByStatus('submitted')}>Display Submitted</Button>
			<Button outline on:click={() => filterByStatus('ordered')}>Display Ordered</Button>
			<Button outline on:click={() => filterByStatus('received')}>Display Received</Button>
		</div>
	</div>
	<form>
		<div class="mx-8 mt-36">
			<Table outline>
				<TableHead>
					{#each tableHead as heading}
						<TableHeadCell>{heading}</TableHeadCell>
					{/each}
				</TableHead>
				<TableBody class="cursor-pointer">
					{#each filteredOrdersList as order (order.id)}
						<TableBodyRow>
							<TableBodyCell>{order.id}</TableBodyCell>
							<TableBodyCell>{order.user.full_name}</TableBodyCell>
							<TableBodyCell>{order.chemical.chemicalName}</TableBodyCell>
							{#if order.status == 'submitted'}
								<TableBodyCell on:click={() => updateStatus(order)}>Submitted</TableBodyCell>
							{:else if order.status == 'ordered'}
								<TableBodyCell on:click={() => updateStatus(order)}>Ordered</TableBodyCell>
							{:else if order.status == 'received'}
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
