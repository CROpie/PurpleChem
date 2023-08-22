<script lang="ts">
	/* MINOR COMPONENTS */
	import { Heading } from '$lib/components/typography/Typo';

	/* MAJOR COMPONENTS */
	import OrderChemical from './components/OrderChemical.svelte';
	import DisplayLoadOutcome from '$lib/components/outcome/DisplayLoadOutcome.svelte';

	/* TYPES */
	import type { PageData } from './$types';

	export let data: PageData;
	const supplierList = data.supplierList;
	const loadOutcome = data.loadOutcome;
</script>

<Heading tag="h2" class="text-center mt-3">Order Chemical</Heading>

{#if loadOutcome?.success}
	<OrderChemical {supplierList} />
{:else}
	<DisplayLoadOutcome {loadOutcome} />
{/if}
