<script lang="ts">
	import { Select } from '$lib/components/form/formAll';
	import Button from '$lib/components/button/Button.svelte';

	export let order;
	export let locationsList;

	$: console.log(locationsList);
</script>

<form method="POST" action="?/updateData">
	<p>
		Remaining: <input value={order.amount} name="amount" type="text" />
		{order.amountUnit}
	</p>

	<p>Current Location:</p>

	<Select name="locationID" value={order.locationID.id}>
		{#each locationsList as location}
			<option value={location.id}>{location.locationName}</option>
		{:else}
			<option>No Locations!</option>
		{/each}
	</Select>
	<Button type="submit" outline class="w-full">UPDATE</Button>
	<!--
	<input type="hidden" name="userID" value={order.userID} />
        -->
	<input type="hidden" name="orderID" value={order.id} />
</form>
