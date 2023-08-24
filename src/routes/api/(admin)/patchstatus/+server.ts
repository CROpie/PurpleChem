import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id, status } = await request.json();

	const { outcome } = await APIClient.patch('/orderstatus/', { order_id: id, status });

	return json({ outcome });
};
