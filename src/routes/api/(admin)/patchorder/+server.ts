import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id, amount, amountUnit, supplierPN } = await request.json();
	let isConsumed = false;
	if (amount == 0) {
		isConsumed = true;
	}

	// const { outcome } = await APIClient.patch('/patchorder/', null, {
	// 	body: { id, amount, amountUnit, isConsumed, supplierPN }
	// });
	const response = await APIClient.patch('/patchorder/', null, {
		body: { id, amount, amountUnit, isConsumed, supplierPN }
	});
	const outcome = response.outcome;
	console.log(outcome.error);
	return json({ outcome });
};
