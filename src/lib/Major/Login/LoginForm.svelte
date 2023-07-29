<script lang="ts">
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';
	import { enhance } from '$app/forms';

	type LoginFormResult = {
		success: boolean;
		error: string | null;
		admin: boolean | null;
	} | null;

	let email: string;
	let password: string;

	let waiting = false;
	// let isError = false;
	// let isSuccess = false;

	let form: LoginFormResult = null;

	// export let form: FormResult;

	// formAction version
	// const handleSubmit = async (event) => {
	// 	form = null;
	// 	if (!email || !password) {
	// 		return;
	// 	}
	// 	waiting = true;
	// 	return async ({ result, update }) => {
	// 		waiting = false;
	// 		form.success = true;
	// 		// form = result.data;
	// 		// console.log(result);
	// 		// await update();
	// 	};
	// };

	// Manual JS fetch version
	const handleSubmit = async () => {
		form = null;
		if (!email || !password) {
			return;
		}

		waiting = true;
		const response = await fetch('http://localhost:5173/', {
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
			window.location.href = '/orderChemical';
		}
	};
</script>

<!-- <form class="m-6" method="POST" action="http://localhost:5173/?/login" use:enhance={handleSubmit}> -->
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
		<p class="text-red-500">Connecting to server...</p>
	{/if}
	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
	{#if form?.success}
		<p class="text-green-500">Redirecting..</p>
	{/if}
</div>

<!-- <div data-testid="message">
	{#if waiting}
		<p class="text-red-500">Logging in...</p>
	{/if}
	{#if isError}
		<p class="text-red-500">{form.error}</p>
	{/if}
	{#if isSuccess}
		<p class="text-green-500">Redirecting..</p>
	{/if}
</div> -->
