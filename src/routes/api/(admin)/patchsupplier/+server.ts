import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { supplier } = await request.json();

	const { outcome } = await APIClient.patch('/supplier/', null, {
		body: supplier
	});

	return json({ outcome });
};
