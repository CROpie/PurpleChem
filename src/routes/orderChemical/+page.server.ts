import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
// import type { RequestEvent } from '../$types';

export const actions: Actions = {
	// orderChemical: async (event: RequestEvent)
	// orderChemical: async ({ request, locals: { supabase, getSession } }) => {
	orderChemical: async (event) => {
		const formData = await event.request.formData();

		if (!formData) {
			return fail(400, { formData, missing: true });
		}

		const session = await event.locals.getSession();
		const userID = session?.user.id;
		const CAS = formData.get('CAS');
		const chemicalName = formData.get('chemicalName');
		const amount = formData.get('amount');
		const amountUnit = formData.get('amountUnit');
		const supplierID = formData.get('supplierID');
		const supplierPN = formData.get('supplierPN');
		const MW = formData.get('MW');
		const MP = formData.get('MP');
		const BP = formData.get('BP');
		const density = formData.get('density');
		const inchi = formData.get('inchi');
		const smile = formData.get('smile');

		console.log(formData);

		// see if the chemical is in the database already, return object contains the ID if it exists
		// need to use .maybeSingle() to return either one object or null
		// without, it's an array or null
		let chemical = await event.locals.supabase
			.from('chemicals')
			.select()
			.eq('CAS', CAS)
			.maybeSingle();

		// adding .select() to the end retuns the newly created data
		if (!chemical.data) {
			console.log('Adding new chemical to database...');
			chemical = await event.locals.supabase
				.from('chemicals')
				.insert({
					CAS,
					chemicalName,
					MW,
					MP,
					BP,
					density,
					inchi,
					smile
				})
				.select()
				.maybeSingle();
			console.log('just added chemical: ', chemical);
		}

		// add order to database
		const { error } = await event.locals.supabase.from('orders').insert({
			userID,
			chemicalID: chemical.data.id,
			amount,
			amountUnit,
			supplierID,
			supplierPN
		});

		if (error) {
			console.log(error);
			return fail(400, { error: true });
		}
		console.log('success');
		return { success: true };

		// return;
	}
};

// import type { PageServerLoad } from './$types'
// export const load: PageServerLoad = async ...

// https://kit.svelte.dev/docs/types#public-types-requestevent
// import type { RequestEvent } from '../$types';
// orderChemical: async (event: RequestEvent) => {} // seems ok but an error on orderChemical for some reason ???
// still works fine though

// PostgrestSingleResponse (return object of accessing the DB)

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: supplierList } = await supabase.from('suppliers').select('*');

	return { session, supplierList };
};
