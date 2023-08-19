// src/hooks.server.ts
// https://dev.to/kudadam/sveltekit-hooks-everything-you-need-to-know-3l39
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

import PurpleChemServerApi from '$lib/apiClient/PurpleChemServerAPI';

const first: Handle = async ({ event, resolve }) => {
	let theme: string | null = null;
	let newTheme: string | null = null;

	const themeld = event.url.searchParams.get('themeld');
	const themeco = event.url.searchParams.get('themeco');

	// if this isn't present, newTheme will be created when it shouldn't be
	if (themeld && themeco) {
		newTheme = `${themeld} ${themeco}`;
	}

	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	} else {
		theme = 'theme-dark theme-purple';
	}

	// change the part of the app.html file which gives a global class <html lang="en class="">

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('class=""', `class="${theme}"`)
		});
	}

	return await resolve(event);
};

const second: Handle = async ({ event, resolve }) => {
	// SERVER-SIDE API CLIENT
	const session = event.cookies.get('session');
	if (!session) {
		console.log('Oh dear, not logged in.');

		return await resolve(event);
	}
	const apiclient = new PurpleChemServerApi(session);
	event.locals.apiclient = apiclient;

	return await resolve(event);
};

export const handle = sequence(first, second);
