import type { PageServerLoad } from '../../$types';
import type { DBOrder } from '$lib/types/inventory';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data: usersList } = await APIClient.get('/modifyuserload/');
	console.log(usersList);
	return { loadOutcome, usersList };
};
