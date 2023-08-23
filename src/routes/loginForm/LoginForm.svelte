<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';

	/* MAJOR COMPONENTS */
	import LoginMessages from './LoginMessages.svelte';

	/* TYPES */
	import type { FetchOutcome } from '$lib/types/global';

	const ClientAPI = $page.data.ClientAPI;

	let userInfo = {
		email: '',
		password: ''
	};

	let messageState = {
		waiting: false,
		outcome: null as FetchOutcome
	};

	async function logIn() {
		messageState.outcome = null;

		if (!userInfo.email || !userInfo.password) {
			return;
		}

		messageState.waiting = true;

		const response = await ClientAPI.post('/login', null, {
			body: { userInfo }
		});

		messageState.waiting = false;

		messageState.outcome = response.outcome;

		// different path for admin?

		if (messageState.outcome?.success) {
			
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
			bind:value={userInfo.email}
			class="mb-3"
			autocomplete="off"
			outline
		/>

		<Input
			data-testid="inputPassword"
			label="Please enter your password."
			type="password"
			bind:value={userInfo.password}
			class="mb-6"
			outline
		/>
		<Button data-testid="button" type="submit" outline class="w-full">Sign In</Button>
	</div>
</form>

<LoginMessages {messageState} />
