<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem
	} from '$lib/components/sidebar/sidebarAll';

	import {
		AccordionDouble,
		AccordionItemDouble
	} from '$lib/components/Accordion2/accordionDoubleAll';

	import { Select } from '$lib/components/form/formAll';

	import type { PageData } from './$types';

	export let data: PageData;
	const { locationsList, ordersList } = data;

	let locations: string[] = [];

	$: locationsList.forEach((location) => {
		locations.push(location.locationName);
	});

	let addNew = false;

	let currentLocation = 'All';

	const chooseLocation = (location: string) => {
		currentLocation = location;
	};
</script>

<div class="flex">
	<Sidebar>
		<SidebarWrapper>
			<SidebarGroup>
				<SidebarItem label="All" on:click={() => chooseLocation('All')} />
			</SidebarGroup>
			<SidebarGroup border>
				{#each locations as location}
					<SidebarItem label={location} on:click={() => chooseLocation(location)} />
				{:else}
					<SidebarItem label="" />
				{/each}
				{#if addNew}
					<form method="POST" action="?/addLocation">
						<input type="text" name="newLocation" class="w-full" />
					</form>
				{/if}
			</SidebarGroup>
			<SidebarGroup border>
				<SidebarItem label="New" class="dark:text-green-500" on:click={() => (addNew = true)} />
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
	<div class="border-2 dark:border-primaryB-300 flex-1">
		<Heading tag="h3">{currentLocation}</Heading>
		<AccordionDouble>
			{#each ordersList as order}
				<AccordionItemDouble>
					<svelte:fragment slot="title">
						<div>{order.chemicalName}</div>
					</svelte:fragment>
					<div slot="content">
						<form>
							<p>
								Remaining: <input placeholder={order.amount} name="updatedAmount" type="text" />
								{order.amountUnit}
							</p>
							<input name="orderID" type="hidden" />
						</form>
						<p>Current Location:</p>
						<Select>
							{#each locationsList as location}
								<option value={location.locationName}>{location.locationName}</option>
							{:else}
								<option>No Locations!</option>
							{/each}
						</Select>
					</div>
					<svelte:fragment slot="edit">
						{order.CAS}
					</svelte:fragment>
				</AccordionItemDouble>
			{:else}
				<p>Empty Inventory!</p>
			{/each}
		</AccordionDouble>
	</div>
</div>
