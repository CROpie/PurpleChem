<script lang="ts">
	/* MINOR COMPONENTS */
	import {
		AccordionDouble,
		AccordionItemDouble
	} from '$lib/components/Accordion2/accordionDoubleAll';

	/* MAJOR COMPONENTS */
	import TitleTab from './TitleTab.svelte';
	import ModifyTab from './ModifyTab.svelte';
	import PropertiesTab from './PropertiesTab.svelte';

	/* TYPES */
	import type { DBOrder, DBLocation } from '$lib/types/inventory';

	export let locationsList: DBLocation[];
	export let filteredOrdersList: DBOrder[];

	let currentSVG = '';
</script>

<div class="flex-1">
	<AccordionDouble outline>
		{#each filteredOrdersList as order (order.id)}
			<AccordionItemDouble class="text-sm sm:text-lg">
				<TitleTab slot="title" {order} bind:currentSVG />
				<ModifyTab slot="content" {order} {locationsList} on:triggerUpdate on:triggerForceStatus />
				<PropertiesTab slot="edit" {order} {currentSVG} />
			</AccordionItemDouble>
		{:else}
			<p class="text-primary">There's nothing here!</p>
		{/each}
	</AccordionDouble>
</div>
