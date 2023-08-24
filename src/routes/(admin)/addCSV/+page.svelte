<script lang="ts">
	import { csvParse } from 'd3-dsv';

	import { Heading } from '$lib/components/typography/Typo';
	import { Button } from '$lib/components/button/button';

	import type { Row, UserAuth, UserData, Chemical, Supplier, Order } from '$lib/types/csv';

	import ClientSideApiClient from '$lib/apiClient/PurpleChemClientAPI.js';

	const ClientAPI = new ClientSideApiClient();

	let csvFile: FileList;
	let data: any;

	let userAuthList: UserAuth[] = [];
	let userDataList: UserData[] = [];
	let supplierList: Supplier[] = [];
	let chemicalList: Chemical[] = [];
	let orderList: Order[] = [];

	let messageState = {
		parsingData: false,
		parsedData: false,
		getData: false,
		writingToDB: false,
		resultText: ''
	};

	const emptyUserAuth: UserAuth = {
		username: '',
		role: '',
		password: ''
	};
	const emptyUserData: UserData = {
		id: null,
		username: '',
		full_name: ''
	};
	const emptyChemical: Chemical = {
		CAS: '',
		chemicalName: '',
		MW: null,
		MP: null,
		BP: null,
		density: null,
		smile: null,
		inchi: null
	};
	const emptySupplier: Supplier = {
		supplierName: ''
	};
	const emptyOrder: Order = {
		user: '',
		chemical: '',
		supplier: '',
		status: '',
		amount: 0,
		amountUnit: '',
		supplierPN: null
	};
	const testChemList: Chemical[] = [
		{
			CAS: '24057-28-1',
			chemicalName: '',
			MW: null,
			MP: null,
			BP: null,
			density: null,
			smile: null,
			inchi: null
		},
		{
			CAS: '121-44-8',
			chemicalName: '',
			MW: null,
			MP: null,
			BP: null,
			density: null,
			smile: null,
			inchi: null
		}
	];

	async function submitData() {
		const response = await ClientAPI.post('/csv', {
			body: { userAuthList, userDataList, chemicalList, supplierList, orderList }
		});
		if (response.outcome.error) {
			return response.outcome.error;
		}
		return 'Data has been written to the database.';
	}

	function extractPhys(chemical: Chemical, propertyArray: any[]) {
		propertyArray.forEach((item) => {
			if (item.name == 'Boiling Point') {
				chemical.BP = item.property;
			}
			if (item.name == 'Melting Point') {
				chemical.MP = item.property;
			}
			if (item.name == 'Density') {
				chemical.density = item.property;
			}
		});
		return chemical;
	}

	async function getChemData() {
		for (let i = 0; i < chemicalList.length; i++) {
			let uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${chemicalList[i].CAS}`;
			const response = await fetch(uri);

			if (!response.ok) {
				continue;
			}

			const data = await response.json();
			chemicalList[i].chemicalName = data.name;
			chemicalList[i].MW = data.molecularMass;
			chemicalList[i].inchi = data.inchi;
			chemicalList[i].smile = data.smile;
			if (data.experimentalProperties) {
				chemicalList[i] = extractPhys(chemicalList[i], data.experimentalProperties);
			}
		}
	}

	function extractOrder(row: Row) {
		let newOrder: Order = { ...emptyOrder };
		newOrder.user = row.username;
		newOrder.chemical = row.CAS;
		newOrder.supplier = row.supplierName;
		newOrder.status = row.status;
		newOrder.amount = row.amount;
		newOrder.amountUnit = row.amountUnit;
		newOrder.supplierPN = row.supplierPN;
		orderList.push(newOrder);
	}

	function extractChemical(row: Row) {
		const isChemicalInArray = chemicalList.some((chemical) => chemical.CAS === row.CAS);
		if (isChemicalInArray) {
			return;
		}
		let newChemical: Chemical = { ...emptyChemical };
		newChemical.CAS = row.CAS;
		chemicalList.push(newChemical);
	}

	function extractSupplier(row: Row) {
		const isSupplierInArray = supplierList.some(
			(supplier) => supplier.supplierName === row.supplierName
		);
		if (isSupplierInArray) {
			return;
		}
		let newSupplier: Supplier = { ...emptySupplier };
		newSupplier.supplierName = row.supplierName;
		supplierList.push(newSupplier);
	}

	function extractUser(row: Row) {
		const isUserInArray = userAuthList.some((user) => user.username === row.username);
		if (isUserInArray) {
			return;
		}
		let newAuthUser: UserAuth = { ...emptyUserAuth };
		let newDataUser: UserData = { ...emptyUserData };
		newAuthUser.username = row.username;
		newAuthUser.password = row.password;
		newAuthUser.role = row.role;
		userAuthList.push(newAuthUser);

		newDataUser.username = row.username;
		newDataUser.full_name = row.full_name;
		userDataList.push(newDataUser);
	}

	async function extractData() {
		messageState.parsedData = false;
		for (let row = 0; row < data.length; row++) {
			extractUser(data[row]);
			extractSupplier(data[row]);
			extractChemical(data[row]);
			extractOrder(data[row]);
		}
		messageState.getData = true;
		await getChemData();
		messageState.getData = false;
		messageState.writingToDB = true;
		const result = await submitData();
		messageState.writingToDB = false;
		messageState.resultText = result;
	}

	function getData() {
		messageState.parsingData = true;
		const input = csvFile[0];
		const reader = new FileReader();

		reader.onload = (event) => {
			const text = event.target?.result;
			data = csvParse(text);
			// dataJSON = JSON.stringify(data);
		};
		reader.readAsText(input);
		messageState.parsingData = false;
		messageState.parsedData = true;
	}
</script>

<Heading tag="h2" class="text-center mt-3">Import CSV</Heading>

<!-- <Fileupload type="file" accept=".csv" bind:files={csvFile} class="text-primary-500 mt-6" /> -->
<input type="file" bind:files={csvFile} accept=".csv" class="text-primary" />
<Button type="button" on:click={getData} outline class="w-full mt-6">Load</Button>
<Button type="button" on:click={extractData} outline class="w-full mt-6">Extract</Button>
<!-- <Button type="button" on:click={submitData} outline class="w-full mt-6">SUBMIT</Button> -->

{#if messageState.parsingData}
	<p class="text-orange-500">Reading file...</p>
{/if}
{#if messageState.parsedData}
	<p class="text-orange-500">File has been imported.</p>
{/if}
{#if messageState.getData}
	<p class="text-orange-500">Getting chemical data...</p>
{/if}
{#if messageState.writingToDB}
	<p class="text-orange-500">Writing to database...</p>
{/if}
{#if messageState.resultText}
	<p class="text-blue-500">{messageState.resultText}</p>
{/if}
