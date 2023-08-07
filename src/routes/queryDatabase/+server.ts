import { json } from '@sveltejs/kit';
import type { FormResult } from '$lib/types/formTypes.js';

export const POST = async ({ request, locals }) => {
	console.log('querydata POST');
	let data, error;

	const form: FormResult = {
		success: false,
		error: null
	};

	const { query } = await request.json();
	console.log(query);

	if (!query) {
		form.error = 'Somehow invalid data made it to the server';
		return json({ form });
	}

	if (query.type == 'string') {
		console.log('searching supabase in string');
		({ data, error } = await locals.supabase
			.from('ordersview')
			.select(
				'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
			)
			.or(
				`chemicalName.ilike.%${query.queryChemicalName}%, username.ilike.%${query.queryChemicalName}%, CAS.ilike.%${query.queryChemicalName}%`
			));
	} else if (query.type == 'structure') {
		console.log('searching supabase in structure');
		({ data, error } = await locals.supabase
			.from('ordersview')
			.select(
				'chemicalName, CAS, username, amount, amountUnit, isConsumed, supplierName, supplierPN, statusValue, orderDate'
			)
			.eq('inchi', query.queryInchi));
	}
	console.log(data, error);
	if (error) {
		form.error = 'Error connecting to database...';
		return json({ form });
	}

	if (!data) {
		form.error = 'Error connecting to database...';
		return json({ form });
	}

	form.success = true;
	return json({ form, data });
};
