import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const { newSupplierName: supplierName } = await request.json();

	const APIClient = locals.apiclient;

	const { outcome } = await APIClient.post('/supplier/', null, {
		body: { supplierName }
	});

	return json({ outcome });
};
