<script lang="ts">
	import { Button } from '$lib/components/button/button';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { FetchOutcome } from '$lib/types/global';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	let outcome: FetchOutcome = null;

	let newUsername = '';
	let newPassword = '';
	let role = '';
	let fullName = '';
	let failValidation = false;
	let failRole = false;

	async function createNewUser() {
		failValidation = false;

		if (!newUsername || !newPassword || !fullName) {
			failValidation = true;
			return;
		}
		if (!(role.toLowerCase() == 'admin' || role.toLowerCase() == 'user')) {
			failRole = true;
			return;
		}

		const response = await ClientAPI.post('/adduser', {
			body: { newUsername, newPassword, fullName, role }
		});
		outcome = response.outcome;
		console.log(response);
	}
</script>

<Heading tag="h2" class="text-center mt-3">Create New User</Heading>

<form on:submit|preventDefault={createNewUser} class="mx-4">
	<Input
		label="Email address of new user: "
		type="email"
		outline
		bind:value={newUsername}
		required
	/>
	<Input label="Password: " type="password" outline bind:value={newPassword} required />
	<Input label="Full name " type="text" outline bind:value={fullName} required />
	<Input label="Admin or User: " type="text" outline bind:value={role} required />
	<Button outline class="w-full mt-2">Submit</Button>
</form>

{#if outcome?.error}
	<p class="text-red-500">{outcome?.error}</p>
{/if}

{#if outcome?.success}
	<p class="text-green-500">User added successfully.</p>
{/if}
{#if failValidation}
	<p class="text-red-500">Please fill out all the fields.</p>
{/if}
{#if failRole}
	<p class="text-red-500">Please enter Admin or User for the role.</p>
{/if}
<!--


	

<form method="POST" action="?/addUser" use:enhance={addUser}>
	<Input
		label="Name of new user: "
		type="text"
		outline
		bind:value={username}
		name="username"
		required
	/>
	<Input
		label="E-mail address of new user: "
		type="email"
		outline
		bind:value={email}
		name="email"
		required
	/>
	<Button>Add User</Button>
</form>

-->
