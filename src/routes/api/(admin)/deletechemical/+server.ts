import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id: chemical_id } = await request.json();

	const { outcome } = await APIClient.delete('/chemical/', { chemical_id });

	return json({ outcome });
};
