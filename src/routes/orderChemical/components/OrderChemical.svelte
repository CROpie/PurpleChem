<script lang="ts">
	import { page } from '$app/stores';

	/* MINOR COMPONENTS */
	import { Button } from '$lib/components/button/button';

	/* MAJOR COMPONENTS */
	import ChemicalQuery from './ChemicalQuery.svelte';
	import StructureDisplay from './StructureDisplay.svelte';
	import StructureSearch from './StructureSearch.svelte';
	import OrderForm from './OrderForm.svelte';
	import ManualPhysInput from './ManualPhysInput.svelte';
	import OrderDisplayMessages from './OrderDisplayMessages.svelte';

	/* TYPES */
	import type {
		ChemicalInfo,
		OrderInfo,
		Supplier,
		OrderChemMessageState,
		OrderChemComponentState
	} from '$lib/types/orderChemical';

	export let supplierList: Supplier[];

	const ClientAPI = $page.data.ClientAPI;

	/* OBJECTS THAT COLLECT ALL THE ORDERING INFORMATION */

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
	let chemicalInfo = { ...blankChemicalInfo };

	const blankOrderInfo: OrderInfo = {
		supplier_id: null,
		amount: null,
		amountUnit: null,
		supplierPN: null
	};
	let orderInfo = { ...blankOrderInfo };

	let componentState: OrderChemComponentState = {
		showOrderForm: false,
		showStructureEditor: false,
		showCASDisplayMessage: true,
		showStructure: false,
		manualStructure: false,
		CASnotFound: false
	};

	let messageState: OrderChemMessageState = {
		fetchOutcome: null,
		ordering: false,
		failValidation: false,
		failStructure: false,
		failAmount: false,
		failSupplierID: false,
		failAmountUnit: false
	};

	// Validation regxes
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;
	const numbersOnly = /^[0-9]+$/;

	// Functions
	function resetOrderObjects() {
		chemicalInfo = { ...blankChemicalInfo };
		orderInfo = { ...blankOrderInfo };
	}

	function resetComponents() {
		componentState.showOrderForm = false;
		componentState.showStructureEditor = false;
		componentState.CASnotFound = false;
		componentState.manualStructure = false;
		componentState.showStructure = false;
	}

	function resetMessages() {
		messageState.ordering = false;
		messageState.failValidation = false;
		messageState.failStructure = false;
		messageState.failAmount = false;
		messageState.failSupplierID = false;
		messageState.failAmountUnit = false;
		// hide any messages from CAS Display Message, so they don't remain after ordering a chemical
		componentState.showCASDisplayMessage = false;
	}

	const validateData = async () => {
		resetMessages();

		if (!CASRegexPattern.test(String(chemicalInfo.CAS))) {
			messageState.failValidation = true;
		}
		if (!chemicalInfo.chemicalName) {
			messageState.failValidation = true;
		}
		if (!numbersOnly.test(String(orderInfo.amount))) {
			messageState.failAmount = true;
		}
		if (!orderInfo.supplier_id) {
			messageState.failSupplierID = true;
		}
		if (!orderInfo.amountUnit) {
			messageState.failAmountUnit = true;
		}
		if (componentState.showStructureEditor && !chemicalInfo.inchi) {
			messageState.failStructure = true;
		}
		if (
			messageState.failValidation ||
			messageState.failStructure ||
			messageState.failAmount ||
			messageState.failSupplierID ||
			messageState.failAmountUnit
		) {
			return;
		}

		orderChemical();
	};

	async function orderChemical() {
		messageState.ordering = true;
		const response = await ClientAPI.post('/postorder', {
			body: {
				chemicalInfo,
				orderInfo
			}
		});
		messageState.ordering = false;
		messageState.fetchOutcome = response.outcome;
		if (messageState.fetchOutcome?.success) {
			resetOrderObjects();
			resetComponents();
		}
	}
</script>

<div class="m-8">
	<!-- implement search by name or CAS -->
	<ChemicalQuery bind:chemicalInfo bind:orderInfo bind:componentState />

	{#if componentState.showStructureEditor}
		<StructureSearch bind:chemicalInfo />
	{/if}

	{#if componentState.showStructure}
		<StructureDisplay smile={chemicalInfo.smile} />
	{/if}

	{#if componentState.showOrderForm}
		<OrderForm bind:orderInfo {supplierList} />
	{/if}

	{#if componentState.CASnotFound}
		<ManualPhysInput bind:chemicalInfo />
	{/if}

	{#if componentState.showOrderForm}
		<Button type="button" outline class="w-full mt-8" on:click={validateData}>ORDER CHEMICAL</Button
		>
	{/if}

	<OrderDisplayMessages {messageState} />
</div>
