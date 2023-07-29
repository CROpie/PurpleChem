import { json } from '@sveltejs/kit';

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

	// add order to database
	const { error } = await locals.supabase.from('locations').insert({
		userID,
		locationName: newLocation
	});

	if (error) {
		form.error = 'Error connecting to database...';
		return json(form);
	}
	form.success = true;
	return json(form);
};

export const PUT = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: null
	};

	const { orderID, locationID, amount } = await request.json();
	console.log(orderID, locationID, amount);

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

	form.success = true;
	console.log('success');
	return json(form);
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
