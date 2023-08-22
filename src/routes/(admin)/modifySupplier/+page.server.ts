import type { PageServerLoad } from '../../$types';
import type { DBOrder } from '$lib/types/inventory';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data: suppliersList } = await APIClient.get('/modifysupplierload/');
	return { loadOutcome, suppliersList };
};
