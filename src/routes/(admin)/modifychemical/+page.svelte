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

	import { onMount } from 'svelte';

	const tableHead = ['CAS', 'name', 'MW', 'MP', 'BP', 'density', 'save', 'delete'];

	type chemical = {
		id: number;
		chemicalName: string;
		CAS: string;
		MW: string | null;
		MP: string | null;
		BP: string | null;
		density: string | null;
	};

	export let data;
	let { chemicalList }: { chemicalList: chemical[] } = data;

	type FormResult = {
		success: boolean;
		error: string;
	} | null;

	let form: FormResult = null;
	let updating = false;

	async function handleSave(chemical: chemical) {
		updating = true;
		form = null;

		const response = await fetch('/modifychemical', {
			method: 'PUT',
			body: JSON.stringify({ chemical }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		updating = false;
	}

	async function handleDelete(id: number) {
		updating = true;
		form = null;

		const response = await fetch('/modifychemical', {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();

		if (response.ok) {
			// invalidateAll();
			// for invalidateAll() to work, need to add $: chemicalList = data.chemicalList
			chemicalList = chemicalList.filter((chemical) => chemical.id != id); // works
		}
		updating = false;
	}

	onMount(() => {
		sortOrders();
	});

	function sortOrders() {
		chemicalList = chemicalList.sort((a, b) => (a.chemicalName > b.chemicalName ? 1 : -1));
	}
</script>

<!-- <div class="mb-4"> -->
<!-- <div class="overflow-scroll pb-16"> -->

<div class="fixed top-14 bg-opNeutral z-10 w-full">
	<Heading tag="h2" class="text-center mt-3">Modify Chemical Data</Heading>
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
</div>

{#if chemicalList}
	<div class="mx-8 mt-24">
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
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}

<!-- working one -->
<!-- <div
	class="text-center text-complement bg-opNeutral border-2 border-primary fixed inset-x-0 bottom-0 p-4 text-lg"
>
	{#if updating}
		<p class="text-red-500">Updating...</p>
	{:else if form?.success}
		<p class="text-green-500">Updated.</p>
	{:else if form?.error}
		<p class="text-red-500">{form.error}</p>
	{:else}
		<p class="text-primary">Ready</p>
	{/if}
</div> -->
