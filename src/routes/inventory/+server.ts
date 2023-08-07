import { json } from '@sveltejs/kit';

import type { locations } from './orderType.js';

type FormResult = {
	success: boolean;
	error: string | null;
};

export const POST = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: null
	};

	const { newLocation } = await request.json();

	const session = await locals.getSession();
	const userID = session?.user.id;

	if (!newLocation || !userID) {
		form.error = 'Somehow invalid data made it to the server';
		return json(form);
	}

	// add new location to database, user .select() to return the data so that the created id can be used
	// without .maybeSingle() an array of one item will be returned
	const { data, error } = await locals.supabase
		.from('locations')
		.insert({
			userID,
			locationName: newLocation
		})
		.select()
		.maybeSingle();

	if (error) {
		form.error = 'Error connecting to database...';
		return json(form);
	}

	if (!data) {
		form.error = 'Error connecting to database...';
		return json(form);
	}

	const newLocationData: locations = {
		id: data.id,
		locationName: data.locationName
	};

	form.success = true;
	return json({ newLocationData, form });
};

export const PUT = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: null
	};

	const { orderID, locationID, amount } = await request.json();

	if (!orderID || !amount) {
		form.error = 'Somehow invalid data made it to the server';
		return json(form);
	}

	let isConsumed = false;

	if (amount == 0) {
		console.log('empty!');
		isConsumed = true;
	}

	const { error: errorAmount } = await locals.supabase
		.from('orders')
		.update({ amount, isConsumed })
		.eq('id', orderID);

	if (errorAmount) {
		console.log(errorAmount);
		form.error = 'Error connecting to database...';
		return json(form);
	}

	const { error: errorLocation } = await locals.supabase
		.from('orders')
		.update({ locationID: locationID })
		.eq('id', orderID);

	if (errorLocation) {
		console.log(errorLocation);
		form.error = 'Error connecting to database...';
		return json(form);
	}

	// need to get location name from locationID, because this is done in the +page.server load function
	// possibly the same issue with updating status...

	const { data, error: getLocationName } = await locals.supabase
		.from('locations')
		.select()
		.eq('id', locationID)
		.maybeSingle();

	if (getLocationName) {
		console.log(errorLocation);
		form.error = 'Error connecting to database...';
		return json(form);
	}

	if (!data) {
		form.error = 'Error connecting to database...';
		return json(form);
	}

	const locationObject = {
		id: data.id,
		locationName: data.locationName
	};

	form.success = true;
	console.log('success');

	return json({ locationObject, form });
};

// updateData: async (event) => {
// 	const form: FormResult = {
// 		success: false,
// 		error: null
// 	};

// 	const formData = await event.request.formData();
// 	if (!formData) {
// 		form.error = 'Request failed...';
// 		return fail(400, form);
// 	}

// 	const amount = Number(formData.get('amount'));
// 	const locationID = Number(formData.get('locationID'));
// 	const orderID = Number(formData.get('orderID'));

// 	let isConsumed = false;

// 	if (amount == 0) {
// 		console.log('empty!');
// 		isConsumed = true;
// 	}
// 	const { error: errorAmount } = await event.locals.supabase
// 		.from('orders')
// 		.update({ amount, isConsumed })
// 		.eq('id', orderID);

// 	if (errorAmount) {
// 		console.log(errorAmount);
// 		form.error = 'Error connecting to database...';
// 		return fail(400, form);
// 	}

// 	if (!locationID) {
// 		form.error = 'Required input not present.';
// 		return fail(400, form);
// 	}

// 	const { error: errorLocation } = await event.locals.supabase
// 		.from('orders')
// 		.update({ locationID: locationID })
// 		.eq('id', orderID);

// 	if (errorLocation) {
// 		console.log(errorLocation);
// 		form.error = 'Error connecting to database...';
// 		return fail(400, form);
// 	}
// 	form.success = true;
// 	return form;
// }