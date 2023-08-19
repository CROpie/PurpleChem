import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const APIClient = locals.apiclient;

	const { outcome, data } = await APIClient.get('/inventoryload/');
	console.log('data:', data);
	const { locationsList, ordersList } = data;

	return { outcome, locationsList, ordersList };
};

type FormResult = {
	success: boolean;
	error: string | null;
};

export const actions: Actions = {
	forceStatus: async (event) => {
		const form: FormResult = {
			success: false,
			error: null
		};

		const formData = await event.request.formData();

		if (!formData) {
			form.error = 'Request failed...';
			return fail(400, form);
		}

		const id = Number(formData.get('orderID'));

		// add order to database
		const { error } = await event.locals.supabase
			.from('orders')
			.update({
				statusID: 3
			})
			.eq('id', id);

		if (error) {
			console.log(error);
			form.error = 'Error connecting to database...';
			return fail(400, form);
		}
		form.success = true;
		return form;
	}
};
