<script lang="ts">
	import { Button } from '$lib/components/button/button';

	import type { FetchOutcome } from '$lib/types/formTypes';
	import type { ChemicalInfo, OrderInfo, Supplier } from '$lib/types/orderChemical';

	// COMPONENTS
	import CASSearch from './CASSearch.svelte';
	import StructureSearch from './StructureSearch.svelte';
	import OrderForm from './OrderForm.svelte';
	import ManualPhys from './ManualPhys.svelte';
	import OrderDisplayMessages from './OrderDisplayMessages.svelte';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

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

	export let supplierList: Supplier[];

	// component toggle variables
	let showOrderForm = false;
	let showStructureEditor = false;
	let CASnotFound = false;
	let manualStructure = false;
	let showCASDisplayMessage = false;

	// message variables
	let ordering = false;
	let failValidation = false;
	let failStructure = false;
	let failAmount = false;
	let failSupplierID = false;
	let failAmountUnit = false;

	let outcome: FetchOutcome = null;

	// Validation regxes
	const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;
	const numbersOnly = /^[0-9]+$/;

	// Functions
	function resetOrderObjects() {
		chemicalInfo = { ...blankChemicalInfo };
		orderInfo = { ...blankOrderInfo };
	}

	function resetComponents() {
		showOrderForm = false;
		showStructureEditor = false;
		CASnotFound = false;
		manualStructure = false;
	}

	function resetOrderDetail() {
		chemicalInfo = {
			CAS: null,
			chemicalName: null,
			MW: null,
			MP: null,
			BP: null,
			density: null,
			smile: null,
			inchi: null
		};
		orderInfo = {
			supplier_id: null,
			amount: null,
			amountUnit: null,
			supplierPN: null
		};
	}

	function resetMessages() {
		ordering = false;
		failValidation = false;
		failStructure = false;
		failAmount = false;
		failSupplierID = false;
		failAmountUnit = false;
		// hide any messages from CAS Display Message, so they don't remain after ordering a chemical
		showCASDisplayMessage = false;
	}

	const validateData = async () => {
		resetMessages();

		if (!CASRegexPattern.test(String(chemicalInfo.CAS))) {
			failValidation = true;
		}
		if (!numbersOnly.test(String(orderInfo.amount))) {
			failAmount = true;
		}
		if (!orderInfo.supplier_id) {
			failSupplierID = true;
		}
		if (!orderInfo.amountUnit) {
			failAmountUnit = true;
		}
		if (showStructureEditor && !chemicalInfo.inchi) {
			failStructure = true;
		}
		if (failValidation || failStructure || failAmount || failSupplierID || failAmountUnit) {
			return;
		}

		orderChemical();
	};

	async function orderChemical() {
		ordering = true;
		const response = await ClientAPI.post('/orderchemical', null, {
			body: {
				chemicalInfo,
				orderInfo
			}
		});
		ordering = false;
		outcome = response.outcome;
		if (outcome?.success) {
			resetOrderDetail();
			resetComponents();
			resetOrderObjects();
		}
	}
</script>

<div class="m-8">
	<!-- implement search by name or CAS -->
	<CASSearch
		bind:chemicalInfo
		bind:orderInfo
		bind:showOrderForm
		bind:showStructureEditor
		bind:CASnotFound
		bind:showCASDisplayMessage
		bind:outcome
	/>

	{#if showStructureEditor}
		<StructureSearch bind:chemicalInfo />
	{/if}

	{#if showOrderForm}
		<OrderForm bind:orderInfo {supplierList} />
	{/if}

	{#if CASnotFound}
		<ManualPhys bind:chemicalInfo />
	{/if}

	{#if showOrderForm}
		<Button type="button" outline class="w-full mt-8" on:click={validateData}>ORDER CHEMICAL</Button
		>
	{/if}

	<OrderDisplayMessages
		{ordering}
		{failValidation}
		{failStructure}
		{failAmount}
		{failAmountUnit}
		{failSupplierID}
		{outcome}
	/>
</div>
