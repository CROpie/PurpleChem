import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome: loadOutcome, data: chemicalsList } = await APIClient.get('/chemicalslist/');
	return { loadOutcome, chemicalsList };
};
