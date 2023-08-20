<script lang="ts">
	import ModifyForm from './ModifyForm.svelte';

	import Heading from '$lib/components/typography/Heading.svelte';

	import type { DBOrder, DBLocation } from '$lib/types/inventory';
	import ModifyForceStatus from './ModifyForceStatus.svelte';

	export let order: DBOrder;
	export let locationsList: DBLocation[];
</script>

<div class="ml-4">
	<Heading tag="h6" class="text-complement">MODIFY</Heading>
	{#if order.status == 'submitted' || order.status == 'ordered'}
		<ModifyForceStatus {order} on:triggerForceStatus />
	{:else}
		<ModifyForm {order} {locationsList} on:triggerUpdate />
	{/if}
</div>
