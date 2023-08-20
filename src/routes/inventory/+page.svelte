<script lang="ts">
	// major components
	import Inventory from './components/Inventory.svelte';
	import DisplayLoadOutcome from '$lib/components/outcome/DisplayLoadOutcome.svelte';

	/* VARIABLES */
	export let data;
	$: data;
	const ordersList = data.ordersList;
	const locationsList = data.locationsList;
	const loadOutcome = data.loadOutcome;
</script>

{#if loadOutcome.success}
	<Inventory {locationsList} {ordersList} />
{:else}
	<DisplayLoadOutcome {loadOutcome} />
{/if}
