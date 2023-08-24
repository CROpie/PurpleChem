/* TYPES */
import type { PageServerLoad } from './$types';
import type { FetchOutcome } from '$lib/types/global';
import type { DBLocation, DBOrder } from '$lib/types/inventory';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const {
		outcome: loadOutcome,
		data
	}: { outcome: FetchOutcome; data: { locationsList: DBLocation[]; ordersList: DBOrder[] } } =
		await APIClient.get('/inventory/');

	const { locationsList, ordersList } = data;
	return { loadOutcome, locationsList, ordersList };
};
