import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { query } = await request.json();
	console.log('query: ', query);

	const { outcome } = await APIClient.patch('/forcereceived/', `query=${query}`);

	return json({ outcome });
};
