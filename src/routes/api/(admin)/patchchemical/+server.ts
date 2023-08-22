import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { id, CAS, chemicalName, MW, MP, BP, density } = await request.json();

	const { outcome } = await APIClient.patch('/patchchemical/', null, {
		body: { id, CAS, chemicalName, MW, MP, BP, density }
	});

	return json({ outcome });
};
