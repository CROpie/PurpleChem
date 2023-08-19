<script lang="ts">
	// major components
	import Inventory from './components/Inventory.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;

	/* VARIABLES */
	export let data;
	$: data;
	const ordersList = data.ordersList;
	const locationsList = data.locationsList;
</script>

{#if !ordersList || !locationsList}
	<p class="text-primary">
		Error retrieving data from the database. Please try refreshing the page.
	</p>
{:else}
	<Inventory {locationsList} {ordersList} />
{/if}

{#if form?.error}
	<p class="text-red-500">{form.error}</p>
{/if}
