/* TYPES */
import type { Supplier } from '$lib/types/orderChemical';
import type { FetchOutcome } from '$lib/types/global';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;
	// eslint-disable-next-line
	let { outcome: loadOutcome, data: supplierList }: { outcome: FetchOutcome; data: Supplier[] } =
		await APIClient.get('/orderchemicalload/');

	if (supplierList && supplierList.length == 0) {
		loadOutcome = {
			success: false,
			error: 'There are no suppliers to choose from. Please contact the IT department.'
		};
	}

	return { loadOutcome, supplierList };
};
