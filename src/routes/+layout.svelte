<script lang="ts">
	//import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { Navbar, NavUl, NavBrand, NavLi, NavHamburger } from '$lib/components/navbar/Nav';
	import '../app.postcss';

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

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src="src/lib/images/BearbeerCrop.png" class="mr-3 h-12 sm:h-12" alt="PurpleChem" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			PurpleChem
		</span>
	</NavBrand>
	<!-- hamburger only appears on mobile size -->
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/orderChemical">Order Chemical</NavLi>
		<NavLi href="/browseDatabase">Search Database</NavLi>
		<NavLi href="/queryData">Query Database</NavLi>
		<NavLi href="/addCSV">Add Chemicals via CSV</NavLi>
		<NavLi href="/logout" class="dark:text-red-500">Log Out</NavLi>
	</NavUl>
</Navbar>
<slot />
