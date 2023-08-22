import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data: ordersList } = await APIClient.get('/modifyorderload/');
	return { loadOutcome, ordersList };
};
