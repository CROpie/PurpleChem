<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import { Button } from '$lib/components/button/button';
	import { Search } from '$lib/components/form/formAll';

	/* MAJOR COMPONENTS */
	import ResultsTable from './ResultsTable.svelte';
	import StructureSearch from './StructureSearch.svelte';
	import QueryDisplayMessages from './QueryDisplayMessages.svelte';

	/* TYPES */
	import type { Query, QueryData, QueryInfo, QueryMessageState } from '$lib/types/queryDatabase';

	const ClientAPI = $page.data.ClientAPI;

	// chemicalName needs to be '' instead of null for searching all
	let queryInfo: QueryInfo = {
		ChemicalName: '',
		Inchi: null
	};

	let messageState: QueryMessageState = {
		fetchOutcome: null,
		searching: false,
		noHit: false,
		dbError: false,
		noStructure: false
	};

	let componentState = {
		showStructureEditor: false
	};

	// List of orders from database
	let allQueryOrders: QueryData[] = [];

	// run queryDatabase if an Inchi is calculated
	$: queryInfo.Inchi && queryDatabase();

	/* FUNCTIONS */
	const toggleStructureSearch = () => {
		messageState.noHit = false;
		componentState.showStructureEditor = !componentState.showStructureEditor;
	};

	function clearMessages() {
		messageState.noHit = false;
		messageState.dbError = false;
		messageState.noStructure = false;
	}

	const queryDatabase = async () => {
		clearMessages();

		let query: Query = {};

		if (queryInfo.Inchi) {
			query = { queryType: 'structure', queryString: queryInfo.Inchi };
		} else {
			query = { queryType: 'string', queryString: queryInfo.ChemicalName };
			componentState.showStructureEditor = false;
		}
		// ensure that queryInfo.ChemicalName will go through if structure search previously used
		queryInfo.Inchi = null;

		messageState.searching = true;
		const response = await ClientAPI.post('/querydatabase', null, {
			body: {
				query
			}
		});
		messageState.searching = false;

		messageState.fetchOutcome = response.outcome;
		allQueryOrders = response.data;

		if (allQueryOrders && allQueryOrders.length == 0) {
			messageState.noHit = true;
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
			bind:inputValue={queryInfo.ChemicalName}
			outline
			placeholder="Chemical Name, CAS or username"
			divClass="my-4"
		/>
	</form>

	<QueryDisplayMessages {messageState} />

	{#if componentState.showStructureEditor}
		<StructureSearch bind:queryInfo bind:messageState />
	{/if}
	<Button type="button" outline on:click={toggleStructureSearch}>Toggle Structure Search</Button>

	<ResultsTable {allQueryOrders} />
</div>
