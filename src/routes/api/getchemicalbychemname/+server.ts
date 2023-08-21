import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { chemicalName } = await request.json();
	console.log('chemName: ', chemicalName);

	const { outcome, data } = await APIClient.get(
		'/getchemicalbychemname/',
		`chemName=${chemicalName}`
	);

	return json({ outcome, data });
};
