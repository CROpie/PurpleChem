<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';

	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	import type { orders } from './orderType';

	import type { SubmitFunction } from '@sveltejs/kit';

	export let order: orders;

	const dispatch = createEventDispatcher();

	// used when forcing order.status -> received
	const forceStatus: SubmitFunction = async () => {
		return async ({ update }) => {
			await update();
			dispatch('triggerUpdateLocation');
		};
	};
</script>

<p class="text-primary">
	Chemical is yet to arrive. Order Status: <span class="text-complement"
		>{order.statusID.statusValue}</span
	>.
</p>

<form method="POST" action="?/forceStatus" use:enhance={forceStatus}>
	<input type="hidden" name="orderID" value={order.id} />
	<Button outline type="submit">Demo: Force status = received</Button>
</form>
