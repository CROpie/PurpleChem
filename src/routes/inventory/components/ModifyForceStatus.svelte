<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	import type { DBOrder } from '$lib/types/inventory';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	export let order: DBOrder;

	const dispatch = createEventDispatcher();

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
