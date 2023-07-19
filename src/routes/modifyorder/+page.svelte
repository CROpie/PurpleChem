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
	let creating = false;
	let isUpdated = false;
	let buttonPressed: string | null = null;

	export let data: PageData;

	let { data: orderList, supplierList } = data;

	async function handleSave(order) {
		const response = await fetch('/modifyorder', {
			method: 'PUT',
			body: JSON.stringify({ order }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		console.log(response, res);
	}

	async function handleDelete(id) {
		const response = await fetch('/modifyorder', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		if (response.ok) {
			orderList = orderList.filter((order) => order.id != id); // works
		}
	}
</script>

<Heading tag="h2" class="text-center mt-3">Modify Orders</Heading>
{#if isUpdated}
	<p class="text-primary">Updated username.</p>
{/if}
{#if creating}
	<p class="text-primary">Updating...</p>
{/if}

<!-- <div class="mx-8 mt-3">
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
						<Input bind:value={order.supplierID.supplierName} class="w-6/12" />
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
</div> -->

<!-- 
	For some strange reason, can't start defaultText as the actual value on the dropdown

		defaultText={order.supplierID.supplierName}
		bind:value={order.supplierID.id}

		<DropSelectItem value={supplier.id}

	it makes it require two clicks to change the displayed correct text after clicking an 'option'
	even though the change is registered
	having defaultText='string' is fine though..

	SOLVED!
	defaultText={order.supplierID.supplierName}
	bind:value={order.supplierID}

	<DropSelectItem value={supplier}

	The problem was that passing supplier.id meant that only order.supplierID.id changed.
	Clicking twice meant that on re-render, the correct name was present.default

	So to solve, passed the supplier object rather than just the id property
-->

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
