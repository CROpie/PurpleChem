import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { query } = await request.json();

	const { outcome } = await APIClient.patch('/inventorystatus/', `order_id=${query}`);

	return json({ outcome });
};
