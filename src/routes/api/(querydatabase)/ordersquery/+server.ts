import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { query } = await request.json();

	const { outcome, data } = await APIClient.get('/ordersquery/', query);

	return json({ outcome, data });
};
