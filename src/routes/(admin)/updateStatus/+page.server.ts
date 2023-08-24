import type { PageServerLoad } from '../../$types';
import type { DBOrder } from '$lib/types/inventory';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data } = await APIClient.get('/orderslist/');

	const ordersList = data.filter((order: DBOrder) => order.isConsumed == false);

	return { loadOutcome, ordersList };
};
