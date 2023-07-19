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

		console.log('initial CAS search: ', chemical);
		if (chemical.error) {
			console.log('something went wrong with initial CAS search...');
			// See below for an error 'TypeError: fetch failed' that (often?) occurs?
			console.log(chemical.error);
			return fail(400, { supabaseError: true });
		}

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
			return fail(400, { supabaseError: true });
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
