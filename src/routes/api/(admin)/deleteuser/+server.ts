import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id } = await request.json();

	const { outcome } = await APIClient.delete('/deleteuser/', null, {
		body: { id }
	});

	return json({ outcome });
};
