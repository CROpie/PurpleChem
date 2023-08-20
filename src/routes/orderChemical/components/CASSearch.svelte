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

	// message variables
	export let outcome: FetchOutcome;
	let invalidCAS = false;
	let searchingCAS = false;
	let CASfound = false;

	// validation variables
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;

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
	}

	function clearMessages() {
		outcome = null;

		invalidCAS = false;
		searchingCAS = false;
		CASnotFound = false;
		CASfound = false;
		showOrderForm = false;
		showStructureEditor = false;
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

	const getProperties = async () => {
		showCASDisplayMessage = true;

		resetPreviousSearch();
		resetComponents();
		clearMessages();

		if (!chemicalInfo.CAS) {
			return;
		}
		if (!CASRegexPattern.test(chemicalInfo.CAS)) {
			invalidCAS = true;
			return;
		}

		let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${chemicalInfo.CAS}`;

		searchingCAS = true;
		const response = await fetch(uri);
		searchingCAS = false;

		// found
		if (response.ok) {
			CASfound = true;
			const data = await response.json();

			chemicalInfo.chemicalName = data.name;
			chemicalInfo.MW = data.molecularMass;
			chemicalInfo.inchi = data.inchi;
			chemicalInfo.smile = data.smile;

			if (data.experimentalProperties) {
				extractPhys(data.experimentalProperties);
			}
		} else {
			// not found, check if has been previously ordered
			const { outcome: getByCASOutcome, data } = await ClientAPI.post('/getchemicalbycas', null, {
				body: { CAS: chemicalInfo.CAS }
			});

			if (getByCASOutcome.success) {
				CASfound = true;

				chemicalInfo.chemicalName = data.chemicalName;
				chemicalInfo.MW = data.MW;
				chemicalInfo.MP = data.MP;
				chemicalInfo.BP = data.BP;
				chemicalInfo.density = data.density;
				chemicalInfo.smile = data.smile;
				chemicalInfo.inchi = data.inchi;
			} else {
				// need to input info manually
				CASnotFound = true;
				showStructureEditor = true;
			}
		}
		showOrderForm = true;
	};
</script>

<form on:submit|preventDefault={getProperties}>
	<Input
		label="CAS number [eg 6674-22-2]"
		name="CAS"
		type="text"
		data-testID="CASInput"
		bind:value={chemicalInfo.CAS}
		outline
		required
		autofocus
	/>
</form>

{#if showCASDisplayMessage}
	<div class="flex items-center gap-4 mt-2">
		<CASDisplayMessage {invalidCAS} {searchingCAS} {CASnotFound} {CASfound} />
	</div>
{/if}

{#if showOrderForm}
	<Input
		label="Chemical Name"
		name="chemicalName"
		type="text"
		bind:value={chemicalInfo.chemicalName}
		outline
		required
	/>
{/if}
