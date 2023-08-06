<script lang="ts">
	// major components
	import Inventory from '$lib/Major/Inventory/Inventory.svelte';

	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import type { orders, locations } from './orderType';

	export let form: ActionData;

	/* VARIABLES */
	export let data: PageData;

	let ordersList: orders[] = data.ordersList;
	$: ordersList = data.ordersList;

	let locationsList: locations[] = data.locationsList;
	$: locationsList = data.locationsList;
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
