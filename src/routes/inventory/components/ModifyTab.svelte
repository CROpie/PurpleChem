<script lang="ts">
	import ModifyForm from './ModifyForm.svelte';

	import Heading from '$lib/components/typography/Heading.svelte';

	import type { orders, locations } from '$lib/types/orderType';
	import ModifyForceStatus from './ModifyForceStatus.svelte';

	export let order: orders;
	export let locationsList: locations[];
</script>

<div class="ml-4">
	<Heading tag="h6" class="text-complement">MODIFY</Heading>
	{#if order.status == 'submitted' || order.status == 'ordered'}
		<ModifyForceStatus {order} on:triggerUpdate />
	{:else}
		<ModifyForm {order} {locationsList} on:triggerUpdate />
	{/if}
</div>
