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

	import { Search, Input } from '$lib/components/form/formAll';

	import type { PageData } from './$types';

	import { onMount } from 'svelte';

	import type { JSMol, RDKitModule } from '$lib/rdkitTypes';

	// Custom Type
	// changes from { data }
	// 		amount (added string for when combined with amountUnit)
	// 		amountUnit (added ? because it gets deleted)
	// 		orderDate (added undefined because that can be the return value of .slice (?) )
	interface OrderData {
		chemicalName: string | null;
		CAS: string | null;
		username: string | null;
		amount: number | string | null;
		amountUnit?: string | null;
		isConsumed: boolean | null;
		supplierName: string | null;
		supplierPN: string | null;
		statusValue: string | null;
		orderDate: string | null | undefined;
	}

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

	export let data: PageData;
	let { supabase } = data;

	let jsmeApplet: any;
	// let RDKitModule: RDKitModule;
	let jsmeContainer: HTMLElement | null;
	let noHit = false;

	onMount(() => {
		jsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px');

		// initRDKitModule().then(function (instance) {
		// 	RDKitModule = instance;
		// });
	});

	// initialized & saved RDKitModule into a store in layout.svelte
	import { RDKitSS } from '$lib/stores/rdkitstore2';
	const RDKitModule = $RDKitSS;

	//let queryOrders: OrderData[] = [];
	let queryOrders: OrderData[] = [];

	let queryChemicalName = '';

	const hideConsumed = () => {
		queryOrders = queryOrders?.filter((order) => order.isConsumed == false);
	};

	// Solved the problem of searching multiple columns on multiple tables
	// By 1st: creating a 'view' (ordersview) which brings all the useful data into one table (ie don't need to deal with foreignkeys)
	// 2nd: chain .or by putting the entire thing in a template string, rather than trying to split it with '', "" and ``
	// Since no foreinkeys, don't need to use the second argument in .or, which is { foreignTable: 'tablename' }.
	// Maybe there is some way to do it with { foreignTable: [tablename, tablename] } ?? But this is easier to read
	const queryDatabase = async () => {
		let { data, error } = await supabase
			.from('ordersview')
			.select(
				'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
			)
			.or(
				`chemicalName.ilike.%${queryChemicalName}%, username.ilike.%${queryChemicalName}%, CAS.ilike.%${queryChemicalName}%`
			);
		if (data) {
			queryOrders = data;

			// make some adjustments
			queryOrders.forEach((item) => {
				item.orderDate = item.orderDate?.slice(0, 10);
				item.amount += ` ${item.amountUnit}`;
				delete item.amountUnit;
			});
		}
		sortTable('chemicalName');
	};

	// SORTING BY CLICKING THE TABLE HEADING
	let sortKey = 'chemicalName'; // default sort key
	let sortDirection = 1; // default sort direction (ascending)

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

	// variables for choosing what to display
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

	const toggleStructureSearch = () => {
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

	const queryByStructure = async () => {
		noHit = false;
		const inchi = getInchi();

		let { data, error } = await supabase
			.from('ordersview')
			.select(
				'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
			)
			.eq('inchi', inchi);

		if (data && data.length > 0) {
			queryOrders = data;

			// make some adjustments
			queryOrders.forEach((item) => {
				item.orderDate = item.orderDate?.slice(0, 10);
				item.amount += ` ${item.amountUnit}`;
				delete item.amountUnit;
			});
		}
		if (data && data.length == 0) {
			noHit = true;
		}

		sortTable('chemicalName');
	};

	function getInchi() {
		const smiles = jsmeApplet.smiles();
		const inchi = RDKitModule.get_mol(smiles).get_inchi();
		return inchi;
	}
</script>

<Heading tag="h2" class="text-center mt-3">Search Database</Heading>

<div class="mx-8 mt-3">
	<form class="flex-1" on:submit={queryDatabase}>
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
		<Button on:click={queryByStructure}>GO</Button>
		{#if noHit}
			<p class="text-red-500">No Hits!</p>
		{/if}
	</div>

	<div class="flex justify-between">
		{#each tableHead as heading}
			<div class="flex flex-col items-center">
				<label for="show{heading}" class="text-primary">{heading}</label>
				<input type="checkbox" id="show{heading}" bind:checked={showObj[heading]} />
			</div>
		{/each}
	</div>

	<div class="flex mb-3">
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
