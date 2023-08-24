<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import Input from '$lib/components/form/Input.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '$lib/components/table/TableAll';

	import type { FetchOutcome } from '$lib/types/formTypes';
	import type { DBOrder } from '$lib/types/inventory.js';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	const tableHead = [
		'id',
		'chemical',
		'full name',
		'amount',
		'amountUnit',
		'supplierPN',
		'save',
		'delete'
	];

	export let data;
	let { ordersList }: { ordersList: DBOrder[] } = data;

	let updating = false;
	let outcome: FetchOutcome = null;

	async function handleSave(order: DBOrder) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/patchorder', {
			body: {
				order
			}
		});
		console.log(response);
		updating = false;
		outcome = response.outcome;
	}

	async function handleDelete(order: DBOrder) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/deleteorder', {
			body: {
				id: order.id
			}
		});
		updating = false;
		outcome = response.outcome;
		ordersList = ordersList.filter((entry) => entry.id != order.id);
	}
</script>

<div class="fixed top-14 bg-opNeutral z-10 w-full">
	<Heading tag="h2" class="text-center mt-3">Modify Order</Heading>
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
</div>

{#if ordersList}
	<div class="mx-8 mt-24">
		<Table outline>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each ordersList as order (order.id)}
					<TableBodyRow>
						<TableBodyCell>{order.id}</TableBodyCell>
						<TableBodyCell>{order.chemical.chemicalName}</TableBodyCell>
						<TableBodyCell>{order.user.full_name}</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={order.amount}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={order.amountUnit}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={order.supplierPN}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleSave(order)}> Save </button>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleDelete(order)}> Delete </button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
