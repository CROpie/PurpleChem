<script lang="ts">
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import type { FormResultLogin } from '$lib/types/formTypes';

	let email: string;
	let password: string;

	let waiting = false;

	let form: FormResultLogin = null;

	const handleSubmit = async () => {
		form = null;
		if (!email || !password) {
			return;
		}

		waiting = true;
		const baseUrl = window.location.href;
		const response = await fetch(`${baseUrl}`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'content-type': 'application/json'
			}
		});

		form = await response.json();
		waiting = false;
		if (!form?.success) {
			return;
		}
		if (form.admin) {
			window.location.href = '/admin';
		} else {
			window.location.href = '/inventory';
		}
	};
</script>

<form class="m-6" on:submit|preventDefault={handleSubmit}>
	<div class="mb-6">
		<Input
			data-testid="inputEmail"
			label="Please enter your work email address."
			type="email"
			name="email"
			bind:value={email}
			class="mb-3"
			autocomplete="off"
			outline
		/>

		<Input
			data-testid="inputPassword"
			label="Please enter your password."
			type="password"
			name="password"
			bind:value={password}
			class="mb-6"
			outline
		/>
		<Button data-testid="button" type="submit" outline class="w-full">Sign In</Button>
	</div>
</form>

<div data-testid="message">
	{#if waiting}
		<p class="text-orange-500">Connecting to server...</p>
	{/if}
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	{#if form?.success}
		<p class="text-green-500">Redirecting..</p>
	{/if}
</div>
