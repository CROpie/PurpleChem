export const load = async ({ locals }) => {
	const APIClient = locals.apiclient;

	let { outcome: loadOutcome, data: supplierList } = await APIClient.get('/orderchemicalload/');

	// need to ensure that supplierList is at least [] for foreach?
	// or a way to add new suppliers?

	if (supplierList && supplierList.length == 0) {
		loadOutcome = {
			success: false,
			error: 'There are no suppliers to choose from. Please contact the IT department.'
		};
	}

	return { loadOutcome, supplierList };
};
