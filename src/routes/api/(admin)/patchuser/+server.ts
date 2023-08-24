import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { user } = await request.json();

	const { outcome } = await APIClient.patch('/user/', null, {
		body: user
	});

	return json({ outcome });
};
