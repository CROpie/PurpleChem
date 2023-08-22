import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id, supplierName } = await request.json();
	console.log(id, supplierName);

	const { outcome } = await APIClient.patch('/patchsupplier/', null, {
		body: { id, supplierName }
	});

	return json({ outcome });
};
