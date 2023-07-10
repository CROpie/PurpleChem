import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

// import type { RequestEvent } from '../$types';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userID = session?.user.id;
	console.log(userID);

	const { data: locationsList } = await supabase
		.from('locations')
		.select('id, locationName')
		.eq('userID', userID);

	// seems can't have two * chemicalID!inner, need to put chemicalName & CAS together
	// const { data: ordersList } = await supabase
	// 	.from('orders')
	// 	.select(
	// 		'id, chemicalID!inner( id, chemicalName, CAS ), amount, amountUnit, locationID!inner( id, locationName )'
	// 	)
	// 	.eq('userID', userID);
	// can't have locationID as null either ??
	// BUT taking out !inner suddenly make everything work again ??

	const { data: ordersList } = await supabase
		.from('orders')
		.select(
			'id, chemicalID( id, chemicalName, CAS, MW, MP, BP, density, inchi, smile ), amount, amountUnit, locationID( id, locationName )'
		)
		.eq('userID', userID);

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
	},
	updateData: async (event) => {
		const formData = await event.request.formData();
		if (!formData) {
			return fail(400, { formData, missing: true });
		}

		// const session = await event.locals.getSession();
		// const userID = session?.user.id;

		const amount = formData.get('amount');
		const locationID = formData.get('locationID');
		const orderID = formData.get('orderID');

		// tried to use upsert instead of update
		// apparently upsert can chain changes with ([{amount: amount}. {locationID: locationID}])
		// BUT, gave error PGRST102: 'All object keys must match' (not enough input)
		// perhaps this upsert is trying to modify every value in the row ??
		// instead will just do multiple updates

		const { error: errorAmount } = await event.locals.supabase
			.from('orders')
			.update({ amount: amount })
			.eq('id', orderID);

		if (errorAmount) {
			console.log(errorAmount);
			return fail(400, { error: true });
		}

		const { error: errorLocation } = await event.locals.supabase
			.from('orders')
			.update({ locationID: locationID })
			.eq('id', orderID);

		if (errorLocation) {
			console.log(errorLocation);
			return fail(400, { error: true });
		}
	}
};
