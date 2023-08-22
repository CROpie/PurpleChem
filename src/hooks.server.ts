// src/hooks.server.ts
// https://dev.to/kudadam/sveltekit-hooks-everything-you-need-to-know-3l39

/* MODULES */
import { sequence } from '@sveltejs/kit/hooks';
import PurpleChemServerApi from '$lib/apiClient/PurpleChemServerAPI';
import PurpleChemAuthApi from '$lib/apiClient/PurpleChemAuthAPI';
import jwt_decode from 'jwt-decode';

/* TYPES */
import type { Handle } from '@sveltejs/kit';
import type { TokenPayload } from '$lib/types/global';

const themeHandle: Handle = async ({ event, resolve }) => {
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

const authHandle: Handle = async ({ event, resolve }) => {
	const authclient = new PurpleChemAuthApi();
	event.locals.authclient = authclient;

	async function use_refresh_token(refresh_token: string) {
		const response = await authclient.post('/refreshtoken', {
			body: { refresh_token }
		});

		if (response.outcome.error) {
			return false;
		}

		const { access_token } = response.data;

		return access_token;
	}

	// SERVER-SIDE API CLIENT
	let session = event.cookies.get('session');

	if (!session) {
		const refresh_token = event.cookies.get('refresh');

		if (!refresh_token) {
			return await resolve(event);
		}

		console.log('Attempting to exchange refresh token...');

		const new_access_token = await use_refresh_token(refresh_token);

		if (!new_access_token) {
			return await resolve(event);
		}

		console.log('Refresh token exchanged.');

		// 60 * 30
		event.cookies.set('session', new_access_token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 30
		});

		session = event.cookies.get('session');
		if (!session) {
			console.log('Something went wrong...');
			return await resolve(event);
		}
	}

	const decode: TokenPayload = jwt_decode(session);
	const role = JSON.parse(decode.sub).role;

	event.locals.role = role;

	const apiclient = new PurpleChemServerApi(session);

	event.locals.apiclient = apiclient;

	return await resolve(event);
};

export const handle = sequence(themeHandle, authHandle);
