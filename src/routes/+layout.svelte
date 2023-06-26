<script lang="ts">
	import '@picocss/pico';
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Chem Database</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<nav>
		<a href="/orderChemical/">Order Chemical</a>
		<a href="/browseDatabase/">Search Database</a>
		<a href="/addCSV/">Add Chemicals via CSV</a>
		<a href="/logout/">Log Out</a>
	</nav>
	<slot />
</div>
