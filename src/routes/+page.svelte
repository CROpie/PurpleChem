<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';

	import type { PageData } from './$types';

	export let data: PageData;
	let { supabase } = data;

	let email: string;
	let password: string;

	let waiting = false;
	let loginError = false;

	const handleSignIn = async (event: Event) => {
		waiting = true;
		const response = await supabase.auth.signInWithPassword({
			email,
			password
		});
		waiting = false;

		console.log(response.error);
		if (response.error) {
			loginError = true;
		} else {
			console.log('no error so redirecting...');
			window.location.href = '/orderChemical';
		}
	};
</script>

<Heading tag="h2" class="text-center mt-3">Welcome to purplechem.com</Heading>
<!-- don't use form action to log into supabase Auth, rather supabase.auth.signInWithPassword-->
<form class="m-6" on:submit|preventDefault={handleSignIn}>
	<div class="mb-6">
		<Input
			label="Please enter your work email address."
			type="email"
			name="email"
			bind:value={email}
			class="mb-3"
			autocomplete="off"
			outline
		/>

		<Input
			label="Please enter your password."
			type="password"
			name="password"
			bind:value={password}
			class="mb-6"
			outline
		/>
		<Button type="submit" outline class="w-full">Sign In</Button>
	</div>
</form>

{#if waiting}
	<p class="text-red-500">Logging in...</p>
{/if}

{#if loginError}
	<p class="text-red-500">Please check your login credentials.</p>
{/if}

<p class="text-white">one, two, three @ purplechem.com // default</p>
