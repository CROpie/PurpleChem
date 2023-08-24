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

	const tableHead = ['id', 'username', 'full_name', 'save', 'delete'];

	type user = {
		id: number;
		username: string;
		full_name: string;
	};

	export let data;
	let { usersList }: { usersList: user[] } = data;

	let updating = false;
	let outcome: FetchOutcome = null;

	async function handleSave(user: user) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/patchuser', {
			body: {
				user
			}
		});
		updating = false;
		outcome = response.outcome;
	}

	async function handleDelete(user: user) {
		outcome = null;
		updating = true;
		const response = await ClientAPI.post('/deleteuser', {
			body: {
				id: user.id
			}
		});
		updating = false;
		outcome = response.outcome;
		usersList = usersList.filter((entry) => entry.id != user.id);
	}
</script>

<div class="fixed top-14 bg-opNeutral z-10 w-full">
	<Heading tag="h2" class="text-center mt-3">Modify Username</Heading>
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

{#if usersList}
	<div class="mx-8 mt-24">
		<Table outline>
			<TableHead>
				{#each tableHead as heading}
					<TableHeadCell>{heading}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each usersList as user (user.id)}
					<TableBodyRow>
						<TableBodyCell>{user.id}</TableBodyCell>
						<TableBodyCell>{user.username}</TableBodyCell>
						<TableBodyCell>
							<Input
								outline
								bind:value={user.full_name}
								class="w-6/12 hover:text-neutral hover:border-complement"
							/>
						</TableBodyCell>
						<TableBodyCell>
							<!-- <button type="button" on:click={() => handleSave(user.id, user.username)}>Save</button> -->
							<button type="button" on:click={() => handleSave(user)}> Save </button>
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => handleDelete(user)}> Delete </button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-primary">something went wrong: data not pulled form server.</p>
{/if}
