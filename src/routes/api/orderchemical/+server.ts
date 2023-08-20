import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const APIClient = locals.apiclient;

	// first need to check if the chemical is in the database already.
	// if not, add it and return the id
	// if so, find and return the id

	const { chemicalInfo, orderInfo } = await request.json();
	const { CAS, chemicalName, MW, MP, BP, density, smile, inchi } = chemicalInfo;
	const { supplier_id, amount, amountUnit, supplierPN } = orderInfo;

	const { outcome: chemOutcome, data: chemical } = await APIClient.post('/addchemical/', null, {
		body: { CAS, chemicalName, MW, MP, BP, density, smile, inchi }
	});
	const chemical_id = chemical.id;
	console.log('+server.ts 1: ', 'chemOutcome: ', chemOutcome, 'chemical_id: ', chemical_id);

	if (chemOutcome.error) {
		const outcome = chemOutcome;
		return json({ outcome });
	}

	const { outcome, data } = await APIClient.post('/addorder/', null, {
		body: { chemical_id, supplier_id, amount, amountUnit, supplierPN }
	});

	console.log('+server.ts 2: ', 'orderOutcome: ', outcome, 'data: ', data);

	return json({ outcome, data });
};
