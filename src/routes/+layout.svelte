<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { Navbar, NavUl, NavBrand, NavLi, NavHamburger } from '$lib/components/navbar/Nav';
	import { DarkLightTheme } from '$lib/components/theme/themePick';

	import { RDKitSS } from '$lib/stores/rdkitstore2';

	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: isAdmin = false;

	onMount(() => {
		initRDKit();
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

	// init RDKit in +layout so then store in a store so it can be accessed anywhere on the app
	// initRDKitModule() comes from RDKit_minimal.js imported in svelte:head below
	// need to run it before things have been mounted, or else errors in cases like Inventory which requires (required??) it to be up and running
	async function initRDKit() {
		await initRDKitModule().then(function (instance) {
			$RDKitSS = instance;
		});
	}
</script>

<!-- B. Bienfait and P. Ertl, JSME: a free molecule editor in JavaScript, J. Cheminformatics 5:24 (2013) -->
<svelte:head>
	<title>Chem Database</title>
	<!-- <script src="/jsme-editor/jsme.nocache.js"></script> -->
	<!-- <script src="/jsme-editor/jsme.nocache.js"></script> -->
	<!-- <script src="/@rdkit/rdkit/dist/RDKit_minimal.js"></script> -->
	<!-- <script src="https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js"></script>
	<script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script> -->
</svelte:head>

<!-- {#await initRDKit()} -->
<!-- Have to do it in an await block to ensure that it is loaded before things like query database after form submission-->
<!-- Don't have to do this any more since no longer using page refreshing after subimssion -->
<!-- <p>Setting up RDKit</p>
{:then} -->
<div class="sticky top-0 z-20">
	<Navbar let:hidden let:toggle outline>
		<NavBrand href="/">
			<img src="BearbeerCrop.png" class="mr-3 h-12 sm:h-12" alt="PurpleChem" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				PurpleChem
			</span>
		</NavBrand>
		<div class="flex ml-4 mr-auto">
			<DarkLightTheme brightness="light" />
			<DarkLightTheme brightness="dark" />
		</div>
		<!-- hamburger only appears on mobile size -->
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			{#if isAdmin}
				<NavLi href="/admin" class="dark:text-green-300">Admin Area</NavLi>
			{/if}
			<NavLi href="/orderChemical">Order Chemical</NavLi>
			<NavLi href="inventory">Inventory</NavLi>
			<NavLi href="/queryData">Query Database</NavLi>
			<NavLi href="/logout" class="text-neutral underline">Log Out</NavLi>
		</NavUl>
	</Navbar>
</div>
<slot />

<!-- {/await} -->
