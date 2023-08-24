import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { order } = await request.json();

	if (order.amount == 0) {
		order.isConsumed = true;
	}

	// const { outcome } = await APIClient.patch('/patchorder/', null, {
	// 	body: { id, amount, amountUnit, isConsumed, supplierPN }
	// });
	const response = await APIClient.patch('/order/', null, {
		body: order
	});
	const outcome = response.outcome;

	return json({ outcome });
};
