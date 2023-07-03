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
		console.log(amount);

		// see if the chemical is in the database already, return object contains the ID if it exists
		// need to use .maybeSingle() to return either one object or null
		// without, it's an array or null
		let chemical = await event.locals.supabase
			.from('chemical')
			.select()
			.eq('CAS', CAS)
			.maybeSingle();

		// adding .select() to the end retuns the newly created data
		if (!chemical.data) {
			console.log('Adding new chemical to database...');
			chemical = await event.locals.supabase
				.from('chemical')
				.insert({
					CAS,
					chemicalName
				})
				.select();
		}

		// add order to database
		const { error } = await event.locals.supabase.from('order').insert({
			userID,
			chemicalID: chemical.data.id,
			amount,
			amountUnit
		});

		if (error) {
			console.log('error');
			return fail(400);
		}
		console.log('success');
		return { success: true };

		//return;
	}
};

// import type { PageServerLoad } from './$types'
// export const load: PageServerLoad = async ...

// https://kit.svelte.dev/docs/types#public-types-requestevent
// import type { RequestEvent } from '../$types';
// orderChemical: async (event: RequestEvent) => {} // seems ok but an error on orderChemical for some reason ???
// still works fine though

// PostgrestSingleResponse (return object of accessing the DB)
