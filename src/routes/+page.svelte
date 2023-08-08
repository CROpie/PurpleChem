<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import LoginForm from './LoginForm.svelte';
</script>

<Heading tag="h2" class="text-center mt-3">Welcome to purplechem.com</Heading>
<Heading tag="h4" class="text-center mt-3">Please log in to continue.</Heading>

<LoginForm />
<div class="ml-4">
	<p class="text-complement">[Demo] To sign in use:</p>
	<p class="text-neutral">chris@purplechem.com // default</p>
	<p class="text-neutral">admin@purlechem.com // default</p>
</div>
