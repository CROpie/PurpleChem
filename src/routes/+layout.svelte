<script lang="ts">
	import { Navbar, NavUl, NavBrand, NavLi, NavHamburger } from '$lib/components/navbar/Nav';
	import '../app.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: isAdmin = false;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.user.app_metadata.claims_admin) {
				isAdmin = true;
			} else {
				isAdmin = false;
			}
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Chem Database</title>
	<script src="/node_modules/jsme-editor/jsme.nocache.js"></script>
	<script src="/node_modules/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
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
		{#if isAdmin}
			<NavLi href="/admin" class="dark:text-green-300">Admin Area</NavLi>
		{/if}
		<NavLi href="/orderChemical">Order Chemical</NavLi>
		<NavLi href="inventory">Inventory</NavLi>
		<NavLi href="/queryData">Query Database</NavLi>
		<NavLi href="/addCSV">Add Chemicals via CSV</NavLi>
		<NavLi href="/logout" class="dark:text-red-500">Log Out</NavLi>
	</NavUl>
</Navbar>
<slot />
