<script lang="ts">
	import { Input } from '$lib/components/form/formAll';
	import { Button } from '$lib/components/button/button';

	export let supabase: any;

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
			if (response.data.user.app_metadata.claims_admin) {
				window.location.href = '/admin';
			} else {
				window.location.href = '/orderChemical';
			}
		}
	};
</script>

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
