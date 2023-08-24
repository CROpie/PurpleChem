import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { orderID: id, amount, locationID: location_id } = await request.json();
	let isConsumed = false;
	if (amount == 0) {
		isConsumed = true;
	}
	console.log(id, amount, location_id, isConsumed);

	const { outcome, data } = await APIClient.patch('/inventory/', null, {
		body: { id, amount, location_id, isConsumed }
	});

	return json({ outcome, data });
};
