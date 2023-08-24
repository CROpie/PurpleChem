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
	import type { Chemical } from '$lib/types/admin.ts';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	const tableHead = ['id', 'CAS', 'chemical name', 'MW', 'MP', 'BP', 'density', 'save', 'delete'];

	export let data;
	let { chemicalsList }: { chemicalsList: Chemical[] } = data;

	let updating = false;
	let outcome: FetchOutcome = null;

	async function handleSave(chemical: Chemical) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/patchchemical', {
			body: {
				chemical
			}
		});
		updating = false;
		outcome = response.outcome;
	}

	async function handleDelete(chemical: Chemical) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/deletechemical', {
			body: {
				id: chemical.id
			}
		});
		updating = false;
		outcome = response.outcome;
		chemicalsList = chemicalsList.filter((entry) => entry.id != chemical.id);
	}
</script>

<div class="fixed top-14 bg-opNeutral z-10 w-full">
	<Heading tag="h2" class="text-center mt-3">Modify Chemical</Heading>
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

{#if chemicalsList}
	<div class="mx-8 mt-24">
		<Table outline>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each chemicalsList as chemical (chemical.id)}
					<TableBodyRow>
						<TableBodyCell>{chemical.id}</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.CAS}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.chemicalName}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.MW}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.MP}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.BP}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Input
								bind:value={chemical.density}
								class="w-full hover:text-neutral hover:border-complement text-sm"
								outline
							/>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleSave(chemical)}> Save </button>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleDelete(chemical)}> Delete </button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
