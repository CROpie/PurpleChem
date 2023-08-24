import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id: order_id } = await request.json();

	const { outcome } = await APIClient.delete('/order/', { order_id });

	return json({ outcome });
};
