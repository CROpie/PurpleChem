<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';

	import { DropSelect, DropSelectItem } from '$lib/components/dropdown/dropdownAll';

	import type { order, location } from './orderType';
	export let order: order;
	export let locationsList: location[];

	let currentLocation: string | null = null;
	let currentValue: number | null = null;
	if (order.locationID) {
		currentLocation = order.locationID.locationName;
		currentValue = order.locationID.id;
	} else {
		currentLocation = 'Choose a storage location.';
	}
</script>

<!-- need to fix formating for small screen sizes -->
<form method="POST" action="?/updateData" class="flex gap-5 flex-wrap">
	<div class="flex items-center justify-start w-64 gap-1">
		<p>Remaining:</p>
		<Input value={order.amount} name="amount" type="text" class="text-primary text-end" outline />
		<p>{order.amountUnit}</p>
	</div>

	<div class="flex justify-start w-64 items-center gap-1">
		<p class="block whitespace-nowrap">{'Change Location: '}</p>

		<DropSelect
			name="locationID"
			class="w-64 border-2 rounded-lg"
			outline
			defaultText={currentLocation}
			value={currentValue}
		>
			{#each locationsList as location (location?.id)}
				<DropSelectItem value={location?.id} label={location?.locationName} />
			{:else}
				<DropSelectItem label="No Locations!" />
			{/each}
		</DropSelect>
		<Button type="submit" outline class="border-none text-2xl">✓</Button>
		<input type="hidden" name="orderID" value={order.id} />
	</div>
</form>
