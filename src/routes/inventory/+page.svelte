<script lang="ts">
	/* MAJOR COMPONENTS */
	import Inventory from './components/Inventory.svelte';
	import DisplayLoadOutcome from '$lib/components/outcome/DisplayLoadOutcome.svelte';

	/* TYPES */
	import type { PageData } from './$types.js';

	export let data: PageData;
	const ordersList = data.ordersList;
	const locationsList = data.locationsList;
	const loadOutcome = data.loadOutcome;
</script>

{#if loadOutcome?.success}
	<Inventory {locationsList} {ordersList} />
{:else}
	<DisplayLoadOutcome {loadOutcome} />
{/if}
