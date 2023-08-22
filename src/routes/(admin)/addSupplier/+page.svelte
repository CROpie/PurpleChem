<script lang="ts">
	import { Button } from '$lib/components/button/button';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';

	import type { FetchOutcome } from '$lib/types/global';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	let outcome: FetchOutcome = null;

	let newSupplierName = '';

	let failValidation = false;

	async function createNewSupplier() {
		failValidation = false;
		if (!newSupplierName) {
			failValidation = true;
			return;
		}

		const response = await ClientAPI.post('/addnewsupplier', null, {
			body: { newSupplierName }
		});
		outcome = response.outcome;
		console.log(response);
	}
</script>

<Heading tag="h2" class="text-center mt-3">Create New User</Heading>

<form on:submit|preventDefault={createNewSupplier} class="mx-4">
	<Input label="Supplier Name: " type="text" outline bind:value={newSupplierName} required />
	<Button outline class="w-full mt-4">Submit</Button>
</form>

{#if outcome?.error}
	<p class="text-red-500">{outcome?.error}</p>
{/if}

{#if outcome?.success}
	<p class="text-green-500">Supplier added successfully.</p>
{/if}
{#if failValidation}
	<p class="text-red-500">Please fill out all the fields.</p>
{/if}
