<script lang="ts">
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import type { FetchOutcome } from '$lib/types/formTypes';

	import LoginMessages from './LoginMessages.svelte';

	import PurpleChemClientAPI from '$lib/apiClient/PurpleChemClientAPI';
	const ClientAPI = new PurpleChemClientAPI();

	let email = '';
	let password = '';

	let waiting = false;

	let outcome: FetchOutcome = null;

	async function logIn() {
		outcome = null;

		if (!email || !password) {
			return;
		}

		waiting = true;

		const response = await ClientAPI.post('/login', null, {
			body: { email, password }
		});

		waiting = false;

		outcome = response.outcome;

		// different path for admin?

		if (outcome?.success) {
			window.location.href = '/inventory';
		}
	}
</script>

<form class="m-6" on:submit|preventDefault={logIn}>
	<div class="mb-6">
		<Input
			data-testid="inputEmail"
			label="Please enter your work email address."
			type="email"
			bind:value={email}
			class="mb-3"
			autocomplete="off"
			outline
		/>

		<Input
			data-testid="inputPassword"
			label="Please enter your password."
			type="password"
			bind:value={password}
			class="mb-6"
			outline
		/>
		<Button data-testid="button" type="submit" outline class="w-full">Sign In</Button>
	</div>
</form>

<LoginMessages {waiting} {outcome} />
