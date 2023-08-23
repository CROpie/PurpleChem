/* MODULES */
import { redirect } from '@sveltejs/kit';

/* TYPES */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, locals }) => {
	const session = cookies.get('session');
	const role = locals.role;

	console.log(url.pathname);

	// backdoor to add an admin (!)
	if (url.pathname == '/seedadmin' && !session) {
		return null;
	}
	if (url.pathname != '/' && !session) {
		console.log('Access denied.');
		throw redirect(303, '/');
	} else if (url.pathname == '/' && !session) {
		return null;
	} else {
		return { session, role };
	}
};
