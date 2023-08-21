<script lang="ts">
	import { Input } from '$lib/components/form/formAll';

	import CASDisplayMessage from './CASDisplayMessage.svelte';

	import type { ChemicalInfo, OrderInfo } from '$lib/types/orderChemical';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';
	import type { FetchOutcome } from '$lib/apiClient/types';

	const ClientAPI = new ClientSideApiClient();

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
	export let showOrderForm: boolean;
	export let showStructureEditor: boolean;
	export let CASnotFound: boolean;
	export let showCASDisplayMessage: boolean;
	export let showStructure: boolean;

	// message variables
	export let outcome: FetchOutcome;
	let invalidCAS = false;
	let searchingCAS = false;
	let CASfound = false;
	let chemNameNotFound = false;

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
		showOrderForm = false;
		showStructureEditor = false;
		CASnotFound = true;
		showStructure = false;
	}

	function clearMessages() {
		outcome = null;

		invalidCAS = false;
		searchingCAS = false;
		CASnotFound = false;
		CASfound = false;
		showOrderForm = false;
		showStructureEditor = false;
		chemNameNotFound = false;
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
			invalidCAS = true;
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
			outcome = { success: false, error: 'Something went wrong when retrieving the CAS number...' };
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

	const getPropertiesFromOwnDatabaseChemName = async () => {
		const { outcome: getByChemNameOutcome, data } = await ClientAPI.post(
			'/getchemicalbychemname',
			null,
			{
				body: { chemicalName: chemicalInfo.chemicalName }
			}
		);
		if (!getByChemNameOutcome.success) {
			return false;
		}
		chemicalInfo.CAS = data.CAS;
		chemicalInfo.MW = data.MW;
		chemicalInfo.MP = data.MP;
		chemicalInfo.BP = data.BP;
		chemicalInfo.density = data.density;
		chemicalInfo.smile = data.smile;
		chemicalInfo.inchi = data.inchi;
		return true;
	};

	const getPropertiesFromOwnDatabaseCAS = async () => {
		const { outcome: getByCASOutcome, data } = await ClientAPI.post('/getchemicalbycas', null, {
			body: { CAS: chemicalInfo.CAS }
		});
		if (!getByCASOutcome.success) {
			return false;
		}
		CASfound = true;

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

			const success = await getCASFromChemName();

			if (!success) {
				// see if someone has ordered this particular chemical name already

				const success2 = await getPropertiesFromOwnDatabaseChemName();

				if (!success2) {
					clearAll();
					chemicalInfo.CAS = null;
					chemNameNotFound = true;
					showOrderForm = true;
					showStructureEditor = true;
					return;
				}
			}
		}

		if (queryType == 'CAS') {
			if (!validateCAS()) return;
		}

		showCASDisplayMessage = true;

		clearAll();

		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${chemicalInfo.CAS}`;

		searchingCAS = true;
		const response = await fetch(uri);
		searchingCAS = false;

		// not found, check if someone has added this CAS number to own database
		if (!response.ok) {
			const success = await getPropertiesFromOwnDatabaseCAS();

			if (!success) {
				// need to input info manually
				CASnotFound = true;
				showStructureEditor = true;
				showOrderForm = true;
				return;
			}
		}

		// found
		if (response.ok) {
			CASfound = true;
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
		console.log('showing the form');
		showStructure = true;
		showOrderForm = true;
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

{#if showCASDisplayMessage}
	<div class="flex items-center gap-4 mt-2">
		<CASDisplayMessage {invalidCAS} {searchingCAS} {CASnotFound} {CASfound} {chemNameNotFound} />
	</div>
{/if}
