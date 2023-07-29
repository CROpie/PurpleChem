<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import LoginForm from '$lib/Major/Login/LoginForm.svelte';
</script>

<Heading tag="h2" class="text-center mt-3">Welcome to purplechem.com</Heading>
<!-- don't use form action to log into supabase Auth, rather supabase.auth.signInWithPassword-->

<LoginForm />

<p class="text-white">one, two, three @ purplechem.com // default</p>
