import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

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

	const { error } = await locals.supabase
		.from('orders')
		.update({
			amount: order.amount,
			amountUnit: order.amountUnit,
			supplierID: order.supplierID.id,
			supplierPN: order.supplierPN
		})
		.eq('id', order.id);

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json(form, { status: 400 });
	}

	form.success = true;
	return json(form);
};

export async function DELETE(event) {
	const form: FormResult = {
		success: false,
		error: ''
	};
	const { id } = await event.request.json();

	const { error } = await event.locals.supabase.from('orders').delete().eq('id', id);

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json(form, { status: 400 });
	}

	form.success = true;
	console.log('form: ', form);
	return json(form);
}
