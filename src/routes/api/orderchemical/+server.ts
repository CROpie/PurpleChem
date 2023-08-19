import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	console.log('made it to orderchemical +server.ts');
	// first need to check if the chemical is in the database already.
	// if not, add it and return the id
	// if so, find and return the id
	const APIClient = locals.apiclient;

	const {
		CAS,
		chemicalName,
		MW,
		MP,
		BP,
		density,
		smile,
		inchi,
		supplier_id,
		amount,
		amountUnit,
		supplierPN
	} = await request.json();
	/*
			// Validation regxes
			const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/;
			const numbersOnly = /^[0-9]+$/;
	
			if (!CASRegexPattern.test(CAS)) {
				form.error = 'Invalid CAS numnber.';
				return fail(400, form);
			}
			if (!numbersOnly.test(amount)) {
				form.error = 'Invalid amount.';
				return fail(400, form);
			}
*/

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
