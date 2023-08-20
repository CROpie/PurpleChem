<script lang="ts">
	import { Button } from '$lib/components/button/button';
	import { Search } from '$lib/components/form/formAll';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';
	import type { FetchOutcome } from '$lib/types/formTypes';

	// COMPONENTS
	import ResultsTable from './ResultsTable.svelte';
	import StructureSearch from './StructureSearch.svelte';
	import QueryDisplayMessages from './QueryDisplayMessages.svelte';

	const ClientAPI = new ClientSideApiClient();

	let outcome: FetchOutcome = null;

	// messages
	let searching = false;
	let noHit = false;
	let dbError = false;
	let noStructure = false;

	let queryChemicalName = '';
	let queryInchi: string | null = null;
	$: queryInchi && queryDatabase();
	$: console.log(queryInchi);

	type QueryData = {
		id: number;
		amount: number | string;
		amountUnit?: string;
		isConsumed: boolean | string;
		orderDate: string;
		status: string;
		supplierPN: string | null;
		fullname: string;
		CAS: string;
		chemicalName: string;
		supplierName: string;
	};

	type Query = { queryType?: string; queryString?: string };

	// List of orders
	let allQueryOrders: QueryData[] = [];

	// component toggle variables
	let showStructureEditor = false;

	/* FUNCTIONS */
	const toggleStructureSearch = () => {
		noHit = false;
		showStructureEditor = !showStructureEditor;
	};

	function clearMessages() {
		noHit = false;
		dbError = false;
		noStructure = false;
	}

	const queryDatabase = async () => {
		console.log('querying database...');
		clearMessages();

		let query: Query = {};

		if (queryInchi) {
			query = { queryType: 'structure', queryString: queryInchi };
		} else {
			query = { queryType: 'string', queryString: queryChemicalName };
			showStructureEditor = false;
		}
		// ensure that queryChemicalName will go through after a structure search
		queryInchi = null;

		searching = true;
		const response = await ClientAPI.post('/querydatabase', null, {
			body: {
				query
			}
		});
		searching = false;

		outcome = response.outcome;
		allQueryOrders = response.data;

		console.log(allQueryOrders);

		if (allQueryOrders && allQueryOrders.length == 0) {
			noHit = true;
			return;
		}

		if (allQueryOrders && allQueryOrders.length > 0) {
			// make some adjustments
			allQueryOrders.forEach((item) => {
				item.orderDate = item.orderDate?.slice(0, 10);
				item.amount += ` ${item.amountUnit}`;
				delete item.amountUnit;
				item.isConsumed ? (item.isConsumed = 'yes') : (item.isConsumed = 'no');
			});
		}
	};
</script>

<div class="mx-8 mt-3">
	<form class="flex-1" on:submit={queryDatabase}>
		<Search
			bind:inputValue={queryChemicalName}
			outline
			placeholder="Chemical Name, CAS or username"
			divClass="my-4"
		/>
	</form>

	<QueryDisplayMessages {searching} {dbError} {noHit} {noStructure} />

	{#if showStructureEditor}
		<StructureSearch bind:queryInchi bind:noStructure />
	{/if}
	<Button type="button" outline on:click={toggleStructureSearch}>Toggle Structure Search</Button>
	<ResultsTable {allQueryOrders} />
</div>
