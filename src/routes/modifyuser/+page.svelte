<script lang="ts">
	import type { PageData } from '../$types';
	import { enhance } from '$app/forms';

	/* 
    Display table of orders
    Doesn't need to be the entire thing, just order, user, chemicalname, status
    Select all or click name to add, then press (status -> ordered) or (status -> received)
    */

	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';
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
	let creating = false;
	let isUpdated = false;
	let buttonPressed: string | null = null;

	export let data: PageData;

	let { data: usersList, supabase } = data;
	$: usersList;

	// modify on +page.svelte using JS only
	async function modifyUser(id: string, username: string) {
		isUpdated = false;
		const { data, error } = await supabase.from('profiles').update({ username }).eq('id', id);
		if (error) {
			console.log(error);
		} else {
			isUpdated = true;
		}
	}

	// modify on +page.server.ts using one form for the entire page
	// = will send the entire page worth of {name, value} pairs
	async function formModify(event) {
		creating = true;
		event.formData.append('currentID', buttonPressed);
		buttonPressed = null;

		// for some reason, username is blank after the refresh, but ID is still present ??
		return async ({ update }) => {
			await update();
			creating = false;
			usersList = usersList;
		};
	}

	// modify on +server.ts
	// can have +server.ts in the same folder, but can't use './' because it thinks that that is /routes
	// therefore need to have './currentfolder'
	// async function handleSave(id: string, username: string) {
	// 	console.log(id, username);
	// 	const response = await fetch('/modifyuser', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ id, username }),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});

	// 	const res = await response.json();
	// 	console.log(response, res);
	// }

	async function handleSave(user) {
		console.log(user);

		const response = await fetch('/modifyuser', {
			method: 'POST',
			body: JSON.stringify({ user }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		console.log(response, res);
	}
</script>

<Heading tag="h2" class="text-center mt-3">Modify Username</Heading>
{#if isUpdated}
	<p class="text-primary">Updated username.</p>
{/if}
{#if creating}
	<p class="text-primary">Updating...</p>
{/if}

<!-- <form method="POST" action="?/changeUsername">
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
						<TableBodyCell>{user.id}</TableBodyCell>
						<TableBodyCell>
							<Input name="username" bind:value={user.username} />
						</TableBodyCell>
						<TableBodyCell>
							<button type="button" on:click={() => modifyUser(user.id, user.username)}>Save</button
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</form> -->

<!-- <form method="POST" action="?/changeUsername" use:enhance={formModify}>
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
							{user.username}
							<Input name={user.id} bind:value={user.username} class="w-6/12" />
						</TableBodyCell>
						<TableBodyCell>
							<button on:click={() => (buttonPressed = user.id)} type="submit">Save</button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</form> -->

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
