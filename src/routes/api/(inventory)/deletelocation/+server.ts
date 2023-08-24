import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { selectedLocationID: id } = await request.json();

	const { outcome } = await APIClient.delete('/location/', `location_id=${id}`);

	return json({ outcome });
};
