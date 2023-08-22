<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import Button from '$lib/components/button/Button.svelte';

	/* MODULES */
	import { createEventDispatcher } from 'svelte';

	/* TYPES */
	import type { DBOrder } from '$lib/types/inventory';

	const ClientAPI = $page.data.ClientAPI;
	const dispatch = createEventDispatcher();

	export let order: DBOrder;

	// used when forcing order.status -> received
	const forceStatus = async () => {
		const response = await ClientAPI.post('/forcereceived', null, {
			body: {
				query: order.id
			}
		});
		const outcome = response.outcome;

		if (outcome.success) {
			dispatch('triggerForceStatus', order.id);
		}
	};
</script>

<p class="text-primary">
	Chemical is yet to arrive. Order Status: <span class="text-complement">{order.status}</span>.
</p>

<div>
	<input type="hidden" name="orderID" value={order.id} />
	<Button outline type="button" on:click={forceStatus}>Demo: Force status = received</Button>
</div>
