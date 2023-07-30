<script lang="ts">
	import ModifyForm from './ModifyForm.svelte';

	import Heading from '$lib/components/typography/Heading.svelte';

	import type { orders, locations } from './orderType';
	import ModifyForceStatus from './ModifyForceStatus.svelte';

	export let order: orders;
	export let locationsList: locations[];
</script>

<div class="ml-4">
	<Heading tag="h6" class="text-complement">MODIFY</Heading>
	{#if order.statusID.id == 1 || order.statusID.id == 2}
		<ModifyForceStatus {order} on:triggerUpdate />
	{:else}
		<ModifyForm {order} {locationsList} on:triggerUpdate />
	{/if}
</div>
