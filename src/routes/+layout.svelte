<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	import { Navbar, NavUl, NavBrand, NavLi, NavHamburger } from '$lib/components/navbar/Nav';
	import { DarkLightTheme } from '$lib/components/theme/themePick';

	import { RDKitSS } from '$lib/stores/rdkitstore';

	const isAdmin = true;

	onMount(() => {
		initRDKit();
	});

	// init RDKit in +layout so then store in a store so it can be accessed anywhere on the app
	async function initRDKit() {
		await initRDKitModule().then(function (instance) {
			$RDKitSS = instance;
		});
	}

	async function logOut() {
		const response = await fetch('api/logout');
	}
</script>

<!-- B. Bienfait and P. Ertl, JSME: a free molecule editor in JavaScript, J. Cheminformatics 5:24 (2013) -->
<svelte:head>
	<title>Chem Database</title>
	<!-- <script src="/jsme-editor/jsme.nocache.js"></script> -->
	<!-- <script src="/@rdkit/rdkit/dist/RDKit_minimal.js"></script> -->
	<!-- <script src="https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js"></script>
	<script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script> -->
</svelte:head>

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
			<NavLi href="inventory">Inventory</NavLi>
			<NavLi href="/orderChemical">Order Chemical</NavLi>
			<NavLi href="/queryDatabase">Query Database</NavLi>
			<NavLi class="text-neutral underline">
				<button class="logout" type="button" on:click={logOut}>Log Out</button></NavLi
			>
		</NavUl>
	</Navbar>
</div>
<slot />
