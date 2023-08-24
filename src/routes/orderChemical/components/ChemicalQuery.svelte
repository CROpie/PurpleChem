<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import { Input } from '$lib/components/form/formAll';

	/* MAJOR COMPONENTS */
	import CASDisplayMessage from './CASDisplayMessage.svelte';

	/* TYPES */
	import type {
		ChemicalInfo,
		OrderInfo,
		OrderChemComponentState,
		SearchCASMessageState
	} from '$lib/types/orderChemical';

	const ClientAPI = $page.data.ClientAPI;

	export let chemicalInfo: ChemicalInfo;
	export let orderInfo: OrderInfo;

	// blank order objects, just for resetting a previous search
	const blankChemicalInfo: ChemicalInfo = {
		CAS: null,
		chemicalName: null,
		MW: null,
		MP: null,
		BP: null,
		density: null,
		smile: null,
		inchi: null
	};
	const blankOrderInfo: OrderInfo = {
		supplier_id: null,
		amount: null,
		amountUnit: null,
		supplierPN: null
	};

	// toggle component variables
	export let componentState: OrderChemComponentState;

	let messageState: SearchCASMessageState = {
		fetchOutcome: null,
		invalidCAS: false,
		searchingCAS: false,
		CASfound: false,
		CASnotFound: false,
		chemNameNotFound: false
	};

	// validation variables
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;

	function clearAll() {
		resetPreviousSearch();
		resetComponents();
		clearMessages();
	}

	function resetPreviousSearch() {
		const CAS = chemicalInfo.CAS;
		chemicalInfo = { ...blankChemicalInfo };
		orderInfo = { ...blankOrderInfo };
		chemicalInfo.CAS = CAS;
	}

	function resetComponents() {
		componentState.showOrderForm = false;
		componentState.showStructureEditor = false;
		componentState.CASnotFound = true;
		componentState.showStructure = false;
	}

	function clearMessages() {
		messageState.fetchOutcome = null;
		messageState.invalidCAS = false;
		messageState.searchingCAS = false;
		messageState.CASfound = false;
		messageState.CASnotFound = false;
		messageState.chemNameNotFound = false;
	}

	function extractPhys(propertyArray: any[]) {
		propertyArray.forEach((item) => {
			if (item.name == 'Boiling Point') {
				chemicalInfo.BP = item.property;
			}
			if (item.name == 'Melting Point') {
				chemicalInfo.MP = item.property;
			}
			if (item.name == 'Density') {
				chemicalInfo.density = item.property;
			}
		});
	}

	function validateCAS() {
		if (!chemicalInfo.CAS) {
			return false;
		}
		if (!CASRegexPattern.test(chemicalInfo.CAS)) {
			messageState.invalidCAS = true;
			return false;
		}
		return true;
	}

	function validateChemName() {
		if (!chemicalInfo.chemicalName) {
			return false;
		}
		return true;
	}

	async function getCASFromChemName() {
		// query AWS Lambda function that commonchemistry uses to get the CAS rn
		// it always returns status code 200, even if not found. But will give: {"count": 0, "results": []}
		let uri = `https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/search?q=${chemicalInfo.chemicalName}&offset=0&size=30`;

		const response = await fetch(uri);
		if (!response.ok) {
			messageState.fetchOutcome = {
				success: false,
				error: 'Something went wrong when retrieving the CAS number...'
			};
			return false;
		}

		const { count, results } = await response.json();

		if (count == 0) {
			// not found
			return false;
		}
		chemicalInfo.CAS = results[0].rn;
		return true;
	}

	const getPropertiesFromOwnDatabase = async (type: string) => {
		let query: string | null = null;

		if (type == 'CAS') {
			query = chemicalInfo.CAS;
		} else {
			query = chemicalInfo.chemicalName;
		}

		const { outcome, data } = await ClientAPI.post('/chemicalquery', {
			body: { type, query }
		});
		if (!outcome.success) {
			return false;
		}
		chemicalInfo.CAS = data.CAS;
		chemicalInfo.chemicalName = data.chemicalName;
		chemicalInfo.MW = data.MW;
		chemicalInfo.MP = data.MP;
		chemicalInfo.BP = data.BP;
		chemicalInfo.density = data.density;
		chemicalInfo.smile = data.smile;
		chemicalInfo.inchi = data.inchi;
		return true;
	};

	const getProperties = async (queryType: string) => {
		if (queryType == 'chemicalName') {
			if (!validateChemName()) return;

			// try to find CAS online
			const success = await getCASFromChemName();

			if (!success) {
				// see if someone has ordered this particular chemical name already
				const success2 = await getPropertiesFromOwnDatabase('chemicalName');

				if (!success2) {
					clearAll();
					chemicalInfo.CAS = null;
					messageState.chemNameNotFound = true;
					componentState.showOrderForm = true;
					componentState.showStructureEditor = true;
					return;
				}
			}
		}

		if (queryType == 'CAS') {
			if (!validateCAS()) return;
		}

		componentState.showCASDisplayMessage = true;

		clearAll();

		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${chemicalInfo.CAS}`;

		messageState.searchingCAS = true;
		const response = await fetch(uri);
		messageState.searchingCAS = false;

		// not found, check if someone has added this CAS number to own database
		if (!response.ok) {
			const success = await getPropertiesFromOwnDatabase('CAS');

			if (!success) {
				// need to input info manually
				messageState.CASnotFound = true;
				componentState.CASnotFound = true;
				componentState.showStructureEditor = true;
				componentState.showOrderForm = true;
				return;
			}
		}

		// found
		if (response.ok) {
			messageState.CASfound = true;
			const data = await response.json();

			chemicalInfo.CAS = data.rn;
			chemicalInfo.chemicalName = data.name;
			chemicalInfo.MW = data.molecularMass;
			chemicalInfo.inchi = data.inchi;
			chemicalInfo.smile = data.smile;

			if (data.experimentalProperties) {
				extractPhys(data.experimentalProperties);
			}
		}
		componentState.showStructure = true;
		componentState.showOrderForm = true;
	};
</script>

<div class="flex">
	<form on:submit|preventDefault={() => getProperties('CAS')} class="flex-1">
		<Input
			label="CAS number [eg 6674-22-2]"
			name="CAS"
			type="text"
			data-testID="CASInput"
			bind:value={chemicalInfo.CAS}
			outline
			autofocus
			required
		/>
	</form>

	<form on:submit|preventDefault={() => getProperties('chemicalName')} class="flex-1">
		<Input
			label="Chemical Name"
			name="chemicalName"
			type="text"
			bind:value={chemicalInfo.chemicalName}
			outline
			required
		/>
	</form>
</div>

{#if componentState.showCASDisplayMessage}
	<div class="flex items-center gap-4 mt-2">
		<CASDisplayMessage {messageState} />
	</div>
{/if}
