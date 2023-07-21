import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
// import type { RequestEvent } from '../$types';

type FormResult = {
	success: boolean;
	error: string | null;
};

export const actions: Actions = {
	// orderChemical: async (event: RequestEvent)
	// orderChemical: async ({ request, locals: { supabase, getSession } }) => {
	orderChemical: async (event) => {
		const form: FormResult = {
			success: false,
			error: null
		};

		const formData = await event.request.formData();

		if (!formData) {
			form.error = 'Request failed...';
			return fail(400, form);
		}

		// converting to expected type so they arent type FormDataEntryValue
		// won't give an error if .get('key') is null.

		const session = await event.locals.getSession();
		const userID = session?.user.id;
		const CAS = String(formData.get('CAS'));
		const chemicalName = String(formData.get('chemicalName'));
		const amount = Number(formData.get('amount'));
		const amountUnit = String(formData.get('amountUnit'));
		const supplierID = Number(formData.get('supplierID'));
		const supplierPN = String(formData.get('supplierPN'));
		const MW = String(formData.get('MW'));
		const MP = String(formData.get('MP'));
		const BP = String(formData.get('BP'));
		const density = String(formData.get('density'));
		const inchi = String(formData.get('inchi'));
		const smile = String(formData.get('smile'));

		// console.log(formData);

		// see if the chemical is in the database already, return object contains the ID if it exists
		// maybeSingle(): return either one object or null, rather than an array or null
		let chemical = await event.locals.supabase
			.from('chemicals')
			.select()
			.eq('CAS', CAS)
			.maybeSingle();

		// console.log('initial CAS search: ', chemical);

		// even if no chemical, should not return an error. Mostly checking for TypeError: fetch failed
		if (chemical.error) {
			// See below for an error 'TypeError: fetch failed' that (often?) occurs? Based on time of day?
			console.log('something went wrong with initial CAS search...', chemical.error);

			form.error = 'Error connecting to database...';
			return fail(400, form);
		}

		// select() at the end: retuns the newly created data
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
			console.log('just added chemical: ', chemical.data);
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
			console.log('Problem during ordering process: ', error);

			form.error = 'Error connecting to database...';
			return fail(400, form);
		}
		console.log('success');
		form.success = true;
		return form;
	}
};

// import type { PageServerLoad } from './$types'
// export const load: PageServerLoad = async ...

// https://kit.svelte.dev/docs/types#public-types-requestevent
// import type { RequestEvent } from '../$types';
// orderChemical: async (event: RequestEvent) => {} // seems ok but an error on orderChemical for some reason ???
// still works fine though

// PostgrestSingleResponse (return object of accessing the DB)

import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: supplierList } = await supabase.from('suppliers').select('*');

	return { session, supplierList };
};

/*
Occasional error with the initial CAS search
But just doing a second time sometimes will make it work.
Seems like a problem with Supabase

something went wrong with initial CAS search...
{
  message: 'TypeError: fetch failed',
  details: 'TypeError: fetch failed\n' +
    '    at fetch (/home/chris/repos/PurpleChem/node_modules/undici/index.js:109:13)\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n' +
    '    at async orderChemical (/home/chris/repos/PurpleChem/src/routes/orderChemical/+page.server.ts:28:20)\n' +
    '    at async Module.handle_action_json_request (/home/chris/repos/PurpleChem/node_modules/@sveltejs/kit/src/runtime/server/page/actions.js:57:16)\n' +
    '    at async resolve (/home/chris/repos/PurpleChem/node_modules/@sveltejs/kit/src/runtime/server/respond.js:405:17)\n' +
    '    at async first (/home/chris/repos/PurpleChem/src/hooks.server.ts:24:12)\n' +
    '    at async Module.respond (/home/chris/repos/PurpleChem/node_modules/@sveltejs/kit/src/runtime/server/respond.js:274:20)\n' +
    '    at async file:///home/chris/repos/PurpleChem/node_modules/@sveltejs/kit/src/exports/vite/dev/index.js:505:22',
  hint: '',
  code: ''
}

*/
