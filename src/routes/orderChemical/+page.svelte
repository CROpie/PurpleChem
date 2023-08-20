<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import OrderChemical from './components/OrderChemical.svelte';
	import DisplayLoadOutcome from '$lib/components/outcome/DisplayLoadOutcome.svelte';

	import type { PageData } from './$types';

	// server load function
	export let data: PageData;

	const loadOutcome = data.loadOutcome;
	const supplierList = data.supplierList;
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>

{#if loadOutcome.success}
	<OrderChemical {supplierList} />
{:else}
	<DisplayLoadOutcome {loadOutcome} />
{/if}
