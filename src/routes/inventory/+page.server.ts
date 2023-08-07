import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userID = session?.user.id;

	const getLocationList = async () => {
		const { data: locationsList, error: locationError } = await supabase
			.from('locations')
			.select('id, locationName')
			.eq('userID', userID);

		if (locationError) {
			console.log('There was a problem while querying the database (locations).', locationError);
		}
		return locationsList;
	};

	const getOrdersList = async () => {
		let { data: ordersList, error: orderError } = await supabase
			.from('orders')
			.select(
				'id, chemicalID( id, chemicalName, CAS, MW, MP, BP, density, inchi, smile ), amount, amountUnit, isConsumed, locationID( id, locationName ), statusID (id, statusValue)'
			)
			.eq('userID', userID);

		if (orderError) {
			console.log('There was a problem while querying the database (orders).', orderError);
		}

		if (ordersList) {
			ordersList = ordersList?.filter((order) => order.isConsumed == false);
		}

		// if (!ordersList) {
		// 	console.log('orders list is null for some reason.');
		// 	orderError = 'something went wrong...';
		// }
		// return { ordersList, orderError };
		return ordersList;
	};

	return { locationsList: getLocationList(), ordersList: getOrdersList() };
};

type FormResult = {
	success: boolean;
	error: string | null;
};

export const actions: Actions = {
	/*
	updateData: async (event) => {
		const form: FormResult = {
			success: false,
			error: null
		};

		const formData = await event.request.formData();
		if (!formData) {
			form.error = 'Request failed...';
			return fail(400, form);
		}

		// const session = await event.locals.getSession();
		// const userID = session?.user.id;

		const amount = Number(formData.get('amount'));
		const locationID = Number(formData.get('locationID'));
		const orderID = Number(formData.get('orderID'));

		let isConsumed = false;

		if (amount == 0) {
			console.log('empty!');
			isConsumed = true;
		}
		const { error: errorAmount } = await event.locals.supabase
			.from('orders')
			.update({ amount, isConsumed })
			.eq('id', orderID);

		if (errorAmount) {
			console.log(errorAmount);
			form.error = 'Error connecting to database...';
			return fail(400, form);
		}

		if (!locationID) {
			form.error = 'Required input not present.';
			return fail(400, form);
		}

		const { error: errorLocation } = await event.locals.supabase
			.from('orders')
			.update({ locationID: locationID })
			.eq('id', orderID);

		if (errorLocation) {
			console.log(errorLocation);
			form.error = 'Error connecting to database...';
			return fail(400, form);
		}
		form.success = true;
		return form;
	},
	*/
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

/*
https://www.youtube.com/watch?v=EQy-AYhZIlE

Send data in parallel rather than in series by having the return value as multiple promises which get resolved & awaited on the page

*/

// export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
// 	// console.log('running load');
// 	const session = await getSession();
// 	const userID = session?.user.id;

// 	const getLocationList = async () => {
// 		const { data: locationsList, error: locationError } = await supabase
// 			.from('locations')
// 			.select('id, locationName')
// 			.eq('userID', userID);

// 		if (locationError) {
// 			console.log('There was a problem while querying the database (locations).', locationError);
// 		}
// 		return locationsList;
// 	};

// 	const getOrdersList = async () => {
// 		let { data: ordersList, error: orderError } = await supabase
// 			.from('orders')
// 			.select(
// 				'id, chemicalID( id, chemicalName, CAS, MW, MP, BP, density, inchi, smile ), amount, amountUnit, isConsumed, locationID( id, locationName )'
// 			)
// 			.eq('userID', userID);

// 		if (orderError) {
// 			console.log('There was a problem while querying the database (orders).', orderError);
// 		}

// 		ordersList = ordersList?.filter((order) => order.isConsumed == false);

// 		return ordersList;
// 	};

// 	return { locationsList: getLocationList(), ordersList: getOrdersList() };
// };

// seems can't have two * chemicalID!inner, need to put chemicalName & CAS together
// const { data: ordersList } = await supabase
// 	.from('orders')
// 	.select(
// 		'id, chemicalID!inner( id, chemicalName, CAS ), amount, amountUnit, locationID!inner( id, locationName )'
// 	)
// 	.eq('userID', userID);
// can't have locationID as null either ??
// BUT taking out !inner suddenly make everything work again ??

// tried to use upsert instead of update
// apparently upsert can chain changes with ([{amount: amount}. {locationID: locationID}])
// BUT, gave error PGRST102: 'All object keys must match' (not enough input)
// perhaps this upsert is trying to modify every value in the row ??
// instead will just do multiple updates

// Load function in series

// export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
// 	console.log('running load');
// 	const session = await getSession();
// 	const userID = session?.user.id;

// 	const { data: locationsList, error: locationError } = await supabase
// 		.from('locations')
// 		.select('id, locationName')
// 		.eq('userID', userID);

// 	if (locationError) {
// 		console.log('There was a problem while querying the database (locations).', locationError);
// 	}

// 	let { data: ordersList, error: orderError } = await supabase
// 		.from('orders')
// 		.select(
// 			'id, chemicalID( id, chemicalName, CAS, MW, MP, BP, density, inchi, smile ), amount, amountUnit, isConsumed, locationID( id, locationName )'
// 		)
// 		.eq('userID', userID);

// 	if (orderError) {
// 		console.log('There was a problem while querying the database (orders).', orderError);
// 	}

// 	ordersList = ordersList?.filter((order) => order.isConsumed == false);

// 	return { locationsList, ordersList };
// };
