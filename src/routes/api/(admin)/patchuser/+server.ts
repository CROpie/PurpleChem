import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id, full_name } = await request.json();

	const { outcome } = await APIClient.patch('/patchuser/', null, {
		body: { id, full_name }
	});

	return json({ outcome });
};
