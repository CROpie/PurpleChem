<script lang="ts">
	import type { PageData } from '../$types';

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

	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	const tableHead = [
		'orderID',
		'user',
		'chemical',
		'amount',
		'unit',
		'supplier',
		'product number',
		'save',
		'delete'
	];

	type order = {
		id: number;
		userID: { username: string };
		chemicalID: { chemicalName: string };
		amount: number;
		amountUnit: string;
		supplierID: { id: number; supplierName: string };
		supplierPN: string | null;
	};

	type supplier = {
		id: number;
		supplierName: string;
	};

	export let data;
	let { orderList, supplierList }: { orderList: order[]; supplierList: supplier[] } = data;

	type FormResult = {
		success: boolean;
		error: string;
	} | null;
	let form: FormResult = null;
	let updating = false;

	async function handleSave(order: order) {
		updating = true;

		const response = await fetch('/modifyorder', {
			method: 'PUT',
			body: JSON.stringify({ order }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		updating = false;
	}

	async function handleDelete(id: number) {
		updating = true;
		const response = await fetch('/modifyorder', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();

		if (response.ok) {
			// instead of re-running the load function, just update w JS
			orderList = orderList.filter((order) => order.id != id);
		}
		updating = false;
	}
</script>

<Heading tag="h2" class="text-center mt-3">Modify Orders</Heading>
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

{#if orderList && supplierList}
	<div class="mx-8 mt-3">
		<Table hoverable>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each orderList as order (order.id)}
					<TableBodyRow class="odd:bg-primaryLight even:bg-primaryLight border-2 border-primary">
						<TableBodyCell>{order.id}</TableBodyCell>
						<TableBodyCell>{order.userID.username}</TableBodyCell>
						<TableBodyCell>{order.chemicalID.chemicalName}</TableBodyCell>
						<TableBodyCell>
							<Input bind:value={order.amount} class="w-6/12" />
						</TableBodyCell>
						<TableBodyCell>
							<Input bind:value={order.amountUnit} class="w-6/12" />
						</TableBodyCell>
						<TableBodyCell>
							<DropSelect
								class="rounded-lg border-2"
								defaultText={order.supplierID.supplierName}
								bind:value={order.supplierID}
							>
								{#each supplierList as supplier}
									<DropSelectItem value={supplier} label={supplier.supplierName} />
								{:else}
									<DropSelectItem label="No options!" class="bg-neutral text-opNeutral" />
								{/each}
							</DropSelect>
						</TableBodyCell>
						<TableBodyCell>
							<Input bind:value={order.supplierPN} class="w-6/12" />
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleSave(order)}>Save</button>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleDelete(order.id)}>Delete</button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
