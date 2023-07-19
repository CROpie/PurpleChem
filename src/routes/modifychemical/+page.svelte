<script lang="ts">
	import type { PageData } from '../$types';
	import { invalidateAll } from '$app/navigation';

	/* 
    Display table of orders
    Doesn't need to be the entire thing, just order, user, chemicalname, status
    Select all or click name to add, then press (status -> ordered) or (status -> received)
    */

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

	const tableHead = ['CAS', 'name', 'MW', 'MP', 'BP', 'density', 'save', 'delete'];
	let creating = false;
	let isUpdated = false;
	let buttonPressed: string | null = null;

	export let data: PageData;

	let { data: chemicalList } = data;
	$: chemicalList;

	async function handleSave(chemical) {
		console.log(chemical);

		const response = await fetch('/modifychemical', {
			method: 'PUT',
			body: JSON.stringify({ chemical }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		console.log(response, res);
	}

	async function handleDelete(id) {
		const response = await fetch('/modifychemical', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		if (response.ok) {
			// not sucessful in auto updating after delete
			// console.log('refresh page?');
			// invalidateAll();
			// chemicalList = chemicalList;
			// invalidateAll();
			chemicalList = chemicalList.filter((chemical) => chemical.id != id); // works
		}
	}
</script>

<Heading tag="h2" class="text-center mt-3">Modify Chemical Data</Heading>
{#if isUpdated}
	<p class="text-primary">Updated username.</p>
{/if}
{#if creating}
	<p class="text-primary">Updating...</p>
{/if}

<div class="mx-8 mt-3">
	<Table hoverable>
		<TableHead>
			{#each tableHead as heading}
				<TableHeadCell>{heading}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each chemicalList as chemical (chemical.id)}
				<TableBodyRow class="odd:bg-primaryLight even:bg-primaryLight border-2 border-primary">
					<TableBodyCell>{chemical.CAS}</TableBodyCell>
					<TableBodyCell>
						<Input bind:value={chemical.chemicalName} />
					</TableBodyCell>
					<TableBodyCell>
						<Input bind:value={chemical.MW} class="w-6/12" />
					</TableBodyCell>
					<TableBodyCell>
						<Input bind:value={chemical.MP} class="w-6/12" />
					</TableBodyCell>
					<TableBodyCell>
						<Input bind:value={chemical.BP} class="w-6/12" />
					</TableBodyCell>
					<TableBodyCell>
						<Input bind:value={chemical.density} class="w-6/12" />
					</TableBodyCell>
					<TableBodyCell>
						<button type="button" on:click={() => handleSave(chemical)}>Save</button>
					</TableBodyCell>
					<TableBodyCell>
						<button type="button" on:click={() => handleDelete(chemical.id)}>Delete</button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
