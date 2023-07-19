<script lang="ts">
	import { Button } from '$lib/components/button/button';
	import Input from '$lib/components/form/Input.svelte';
	import { enhance } from '$app/forms';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from '../$types.js';

	export let data;
	let { supabase } = data;

	export let form: ActionData;

	let email = '';
	let username: string | null = null;

	/*

	Putting options: { data: { username: "nick" } } here added {"username":"nick"} to raw_user_meta_data in Auth/users

			const { data, error } = await supabase.auth.signUp({
			email,
			password: 'default',
			options: {
				data: {
					username
					// age: 29,
					// role: 'admin'
				}
			}
		});

		*/

	// for some stupid reason, using supabase.auth.signUp automatically changes the session to the newly created user
	// therefore loging out of admin
	const addUser: SubmitFunction = async ({ formData, cancel }) => {
		// const { data, error } = await supabase.auth.signUp({
		// 	email,
		// 	password: 'default'
		// });
		// if (error) {
		// 	console.log(error);
		// 	cancel();
		// } else {
		// 	console.log(data);
		// 	formData.append('userID', data.user.id);
		// 	console.log('sending to server...');
		// }
		console.log('sending to sever...');
	};
	$: console.log(username);
</script>

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

{#if form?.success}
	<p class="text-green-500">User Added.</p>
{:else if form?.error}
	<p class="text-red-500">Something went wrong...</p>
{/if}
