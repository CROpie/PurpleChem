import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	const { CAS } = await request.json();
	console.log('CAS: ', CAS);

	const { outcome, data } = await APIClient.get('/getchemicalbycas/', `CAS=${CAS}`);

	return json({ outcome, data });
};
