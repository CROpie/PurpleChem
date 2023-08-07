<script lang="ts">
	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '$lib/components/table/TableAll';
	import { Search } from '$lib/components/form/formAll';
	import { onMount } from 'svelte';

	import type { OrderData } from './types';

	/* STRUCTURE EDITOR */
	import { RDKitSS } from '$lib/stores/rdkitstore2';

	let jsmeApplet: any;
	let jsmeContainer: HTMLElement;

	onMount(() => {
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');
	});

	/* VARIABLES */
	export let supabase: any;

	// messages
	let searching = false;
	let noHit = false;
	let dbError = false;
	let noStructure = false;

	const tableHead = [
		'chemicalName',
		'CAS',
		'username',
		'amount',
		'isConsumed',
		'supplierName',
		'supplierPN',
		'statusValue',
		'orderDate'
	];

	let queryChemicalName = '';

	// List of orders
	let queryOrders: OrderData[] = [];
	let allQueryOrders: OrderData[] = [];

	// Table sorting
	let sortKey = 'chemicalName'; // default sort key
	let sortDirection = 1; // default sort direction (ascending)

	// Display toggles (currently hidden)
	interface show {
		[key: string]: boolean;
	}
	let showObj: show;
	$: showObj = {
		chemicalName: true,
		CAS: true,
		username: true,
		amount: true,
		amountUnit: true,
		isConsumed: true,
		supplierName: true,
		supplierPN: true,
		statusValue: true,
		orderDate: true
	};

	/* FUNCTIONS */
	const toggleStructureSearch = () => {
		noHit = false;
		if (!jsmeContainer) {
			console.log('something has gone wrong with jsme.');
		} else {
			if (jsmeContainer.classList.contains('hidden')) {
				jsmeContainer.classList.replace('hidden', 'flex');
			} else if (jsmeContainer.classList.contains('flex')) {
				jsmeContainer.classList.replace('flex', 'hidden');
			}
		}
	};

	const queryDatabase = async (type: string) => {
		searching = true;
		noHit = false;
		dbError = false;
		noStructure = false;
		queryOrders = [];

		let data;
		let error;

		if (type == 'string') {
			if (jsmeContainer?.classList.contains('flex')) {
				jsmeContainer.classList.replace('flex', 'hidden');
			}

			({ data, error } = await supabase
				.from('ordersview')
				.select(
					'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
				)
				.or(
					`chemicalName.ilike.%${queryChemicalName}%, username.ilike.%${queryChemicalName}%, CAS.ilike.%${queryChemicalName}%`
				));
		} else if (type == 'structure') {
			const inchi = getInchi();
			if (!inchi) {
				searching = false;
				noStructure = true;
				return;
			}
			({ data, error } = await supabase
				.from('ordersview')
				.select(
					'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
				)
				.eq('inchi', inchi));
		}
		searching = false;

		if (error) {
			dbError = true;
			return;
		}

		if (data && data.length == 0) {
			noHit = true;
			return;
		}

		if (data && data.length > 0) {
			queryOrders = data;
			// make some adjustments
			queryOrders.forEach((item) => {
				item.orderDate = item.orderDate?.slice(0, 10);
				item.amount += ` ${item.amountUnit}`;
				delete item.amountUnit;
			});

			allQueryOrders = queryOrders;
			queryOrders = queryOrders?.filter((order) => order.isConsumed == false);
			sortTable('chemicalName');
		}
	};

	function getInchi() {
		const smiles = jsmeApplet.smiles();
		const inchi = $RDKitSS!.get_mol(smiles).get_inchi();
		return inchi;
	}

	const showConsumed = () => {
		queryOrders = allQueryOrders;
	};

	const hideConsumed = () => {
		queryOrders = queryOrders?.filter((order) => order.isConsumed == false);
	};

	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = -sortDirection;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
		queryOrders = queryOrders.sort((a, b) =>
			a[sortKey] > b[sortKey] ? -sortDirection : sortDirection
		);
	};
</script>

<div class="mx-8 mt-3">
	<form class="flex-1" on:submit={() => queryDatabase('string')}>
		<Search
			bind:inputValue={queryChemicalName}
			outline
			placeholder="Chemical Name, CAS or username"
			divClass="my-4"
		/>
	</form>

	<Button on:click={toggleStructureSearch}>Toggle Structure Search</Button>

	<div bind:this={jsmeContainer} class="hidden">
		<div id="jsme_container" />
		<Button on:click={() => queryDatabase('structure')}>GO</Button>
	</div>
	{#if searching}
		<p class="text-red-500">Searching Database..</p>
	{/if}
	{#if dbError}
		<p class="text-red-500">Database error..</p>
	{/if}
	{#if noHit}
		<p class="text-red-500">No Hits!</p>
	{/if}
	{#if noStructure}
		<p class="text-red-500">Error while searching structure...</p>
	{/if}
	<!-- not sure if I can be bothered making these look better -->
	<div class="hidden">
		<div class="flex justify-between">
			{#each tableHead as heading}
				<div class="flex flex-col items-center">
					<label for="show{heading}" class="text-primary">{heading}</label>
					<input type="checkbox" id="show{heading}" bind:checked={showObj[heading]} />
				</div>
			{/each}
		</div>
	</div>
	<div class="flex my-3">
		<Button type="button" outline on:click={showConsumed}>Show Consumed</Button>
		<Button type="button" outline on:click={hideConsumed}>Hide Consumed</Button>
	</div>

	<Table hoverable color="primary" striped>
		<TableHead>
			{#each tableHead as heading}
				{#if showObj[heading]}
					<TableHeadCell on:click={() => sortTable(heading)}>{heading}</TableHeadCell>
				{/if}
			{/each}
		</TableHead>
		<TableBody>
			{#each queryOrders as order}
				<TableBodyRow>
					{#each Object.entries(order) as [key, value]}
						{#if showObj[key]}
							<TableBodyCell>{value}</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<!--
	Show Field Buttons
<div class="flex justify-between">
		<label for="showChemical" class="text-primaryA-500">Chemical</label>
		<input type="checkbox" id="showChemical" bind:checked={showChemical} />
</div>

	Head
<TableHead>
	{#if showChemical}
		<TableHeadCell on:click={() => sortTable('chemicalName')}>Chemical</TableHeadCell>
	{/if}
</TableHead>

	Body
<TableBodyRow>
	{#if showChemical}
		<TableBodyCell>{order.chemicalName}</TableBodyCell>
	{/if}
</TableBodyRow>
-->
