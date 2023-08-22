/* MODULES */
import { redirect } from '@sveltejs/kit';

/* TYPES */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, locals }) => {
	const session = cookies.get('session');
	const role = locals.role;

	if (url.pathname != '/' && !session) {
		console.log('Access denied.');
		throw redirect(303, '/');
	} else if (url.pathname == '/' && !session) {
		return null;
	} else {
		return { session, role };
	}
};
