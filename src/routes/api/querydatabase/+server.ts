import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { query } = await request.json();
	console.log('query: ', query);
	let queryString = '';

	if (query.type == 'string') {
		queryString = query.queryChemicalName;
	}
	if (query.type == 'structure') {
		queryString = query.queryInchi;
	}

	const { outcome, data } = await APIClient.get('/getordersbyquery/', `query=${queryString}`);
	console.log('querydatabase +server.ts', 'outcome: ', outcome, 'data: ', data);
	return json({ outcome, data });
};
