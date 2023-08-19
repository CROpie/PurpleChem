import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { FormResult } from '$lib/types/formTypes.js';

export const load = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome, data: supplierList } = await APIClient.get('/orderchemicalload/');

	return { outcome, supplierList };
};
