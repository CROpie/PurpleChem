<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { supabase } = data;

	let email: string;
	let password: string;
	let loginError: boolean = false;

	const handleSignIn = async (event: Event) => {
		const response = await supabase.auth.signInWithPassword({
			email,
			password
		});

		console.log(response.error);
		if (response.error) {
			loginError = true;
		} else {
			console.log('no error so redirecting...');
			window.location.href = '/menu';
		}
	};
</script>

<h1>Welcome to purplechem.com</h1>

<!-- don't use form action to log into supabase Auth, rather supabase.auth.signInWithPassword-->
<form on:submit|preventDefault={handleSignIn}>
	<label for="email">Please enter your work email address</label>
	<input type="email" name="email" id="email" bind:value={email} />
	<label for="password">Please enter your password</label>
	<input type="password" name="password" id="password" bind:value={password} />
	<button>Sign In</button>
</form>

{#if loginError}
	<p style="color: red">Please check your login credentials.</p>
{/if}

<h6>one, two, three @ purplechem.com // default</h6>
