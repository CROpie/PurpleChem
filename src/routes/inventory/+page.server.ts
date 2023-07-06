import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
// import type { RequestEvent } from '../$types';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userID = session?.user.id;

	const { data: locationsList } = await supabase
		.from('locations')
		.select('locationName')
		.eq('userID', userID);

	const { data: ordersList } = await supabase
		.from('ordersview')
		.select(
			'chemicalName, CAS, supplierName, statusValue, amount, amountUnit, orderDate, supplierPN'
		)
		.eq('id', userID);

	return { session, locationsList, ordersList };
};

export const actions: Actions = {
	addLocation: async (event) => {
		const formData = await event.request.formData();

		if (!formData) {
			return fail(400, { formData, missing: true });
		}

		const session = await event.locals.getSession();
		const userID = session?.user.id;
		const newLocation = formData.get('newLocation');
		console.log('hello?');

		// add order to database
		const { error } = await event.locals.supabase.from('locations').insert({
			userID,
			locationName: newLocation
		});

		if (error) {
			console.log('error');
			return fail(400, { error: true });
		}
		console.log('success');
		return { success: true };
	}
};
