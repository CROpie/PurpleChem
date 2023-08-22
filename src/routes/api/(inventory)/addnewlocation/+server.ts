import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { newLocation: locationName } = await request.json();

	const { outcome, data } = await APIClient.post('/addlocation/', null, {
		body: { locationName }
	});

	return json({ outcome, data });
};
