import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { query } = await request.json();

	const { outcome, data } = await APIClient.get('/getordersbyquery/', query);
	console.log('querydatabase +server.ts', 'outcome: ', outcome, 'data: ', data);
	return json({ outcome, data });
};
