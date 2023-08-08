import { json } from '@sveltejs/kit';

import type { locations } from '$lib/types/orderType.js';
import type { FormResult } from '$lib/types/formTypes.js';

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
