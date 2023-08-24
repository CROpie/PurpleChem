import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { chemical } = await request.json();

	const { outcome } = await APIClient.patch('/chemical/', null, {
		body: chemical
	});

	return json({ outcome });
};
