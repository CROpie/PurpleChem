import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data } = await APIClient.get('/inventoryload/');
	// console.log('data:', data);
	const { locationsList, ordersList } = data;
	return { loadOutcome, locationsList, ordersList };
};
