// src/hooks.server.ts
// https://dev.to/kudadam/sveltekit-hooks-everything-you-need-to-know-3l39
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/types/db_types';

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
	// SUPABASE
	event.locals.supabase = createSupabaseServerClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

export const handle = sequence(first, second);
