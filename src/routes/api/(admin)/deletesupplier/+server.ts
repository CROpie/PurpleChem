import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id: supplier_id } = await request.json();

	const { outcome } = await APIClient.delete('/supplier/', { supplier_id });

	return json({ outcome });
};
