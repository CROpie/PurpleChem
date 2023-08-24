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

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	const tableHead = ['id', 'supplier name', 'save', 'delete'];

	type supplier = {
		id: number;
		supplierName: string;
	};

	export let data;
	let { suppliersList }: { suppliersList: supplier[] } = data;

	let updating = false;
	let outcome: FetchOutcome = null;

	async function handleSave(supplier: supplier) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/patchsupplier', {
			body: {
				supplier
			}
		});
		updating = false;
		outcome = response.outcome;
	}

	async function handleDelete(supplier: supplier) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/deletesupplier', {
			body: {
				id: supplier.id
			}
		});
		updating = false;
		outcome = response.outcome;
		suppliersList = suppliersList.filter((entry) => entry.id != supplier.id);
	}
</script>

<div class="fixed top-14 bg-opNeutral z-10 w-full">
	<Heading tag="h2" class="text-center mt-3">Modify Supplier</Heading>
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

{#if suppliersList}
	<div class="mx-8 mt-24">
		<Table outline>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each suppliersList as supplier (supplier.id)}
					<TableBodyRow>
						<TableBodyCell>{supplier.id}</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={supplier.supplierName}
								class="w-full hover:text-neutral hover:border-complement"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleSave(supplier)}> Save </button>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleDelete(supplier)}> Delete </button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
