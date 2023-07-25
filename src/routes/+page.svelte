<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import LoginForm from './LoginForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	let { supabase } = data;
</script>

<Heading tag="h2" class="text-center mt-3">Welcome to purplechem.com</Heading>
<!-- don't use form action to log into supabase Auth, rather supabase.auth.signInWithPassword-->

<LoginForm {supabase} />

<p class="text-white">one, two, three @ purplechem.com // default</p>
