<script lang="ts">
	/* MINOR COMPONENTS */
	import { Heading } from '$lib/components/typography/Typo';

	/* MAJOR COMPONENTS */
	import LoginForm from './loginForm/LoginForm.svelte';
</script>

<Heading tag="h2" class="text-center mt-3">Welcome to purplechem.com</Heading>
<Heading tag="h4" class="text-center mt-3">Please log in to continue.</Heading>

<LoginForm />
<div class="ml-4">
	<p class="text-complement">[Demo] To sign in use:</p>
	<p class="text-neutral">[user]: chris@purplechem.com, password = default</p>
	<p class="text-neutral">[admin]: admin@purplechem.com, password = default</p>
</div>
