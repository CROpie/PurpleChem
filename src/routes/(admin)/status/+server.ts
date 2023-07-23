import { json, type RequestHandler } from '@sveltejs/kit';

type FormResult = {
	success: boolean;
	error: string;
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: ''
	};

	const { order } = await request.json();

	if (!order) {
		form.error = 'Request did not contain the required information.';
		return json(form, { status: 400 });
	}

	const { error } = await locals.supabase
		.from('orders')
		.update({ statusID: order.statusID })
		.eq('id', order.id);

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json(form, { status: 400 });
	}

	form.success = true;
	return json(form);
};
