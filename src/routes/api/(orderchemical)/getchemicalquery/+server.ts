import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { type, query } = await request.json();

	const { outcome, data } = await APIClient.get('/chemicalquery/', { type, query });

	return json({ outcome, data });
};
