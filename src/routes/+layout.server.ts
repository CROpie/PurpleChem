// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('session');

	if (url.pathname != '/' && !session) {
		console.log('Access denied.');
		throw redirect(303, '/');
	} else {
		return { session };
	}
};
