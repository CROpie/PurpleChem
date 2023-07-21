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

	const tableHead = ['email', 'username', 'save'];

	type user = {
		id: number;
		username: string;
		full_name: string;
	};

	export let data;
	let { usersList }: { usersList: user[] } = data;

	type FormResult = {
		success: boolean;
		error: string;
	} | null;
	let form: FormResult = null;
	let updating = false;

	async function handleSave(user: user) {
		updating = true;

		const response = await fetch('/modifyuser', {
			method: 'PUT',
			body: JSON.stringify({ user }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		updating = false;
	}
</script>

<Heading tag="h2" class="text-center mt-3">Modify Username</Heading>
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

{#if usersList}
	<div class="mx-8 mt-3">
		<Table hoverable>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each usersList as user (user.id)}
					<TableBodyRow class="odd:bg-primaryLight even:bg-primaryLight border-2 border-primary">
						<TableBodyCell>{user.full_name}</TableBodyCell>
						<TableBodyCell>
							<Input name={user.id} bind:value={user.username} class="w-6/12" />
						</TableBodyCell>
						<TableBodyCell>
							<!-- <button type="button" on:click={() => handleSave(user.id, user.username)}>Save</button> -->
							<button type="button" on:click={() => handleSave(user)}>Save</button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
