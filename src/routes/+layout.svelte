<script lang="ts">
	/* STYLES */
	import '../app.css';

	/* MINOR COMPONENTS */
	import { Navbar, NavUl, NavBrand, NavLi, NavHamburger } from '$lib/components/navbar/Nav';
	import { DarkLightTheme } from '$lib/components/theme/themePick';

	/* MODULES */
	import { onMount } from 'svelte';
	import { RDKitSS } from '$lib/stores/rdkitstore';

	export let data;
	const { role } = data;
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
		if (response.ok) {
			window.location.href = '/';
		} else {
			console.log('Something went wrong when logging out...?');
		}
	}
</script>

<svelte:head>
	<title>Chem Database</title>
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
			{#if role == 'admin'}
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
