import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const themeld = url.searchParams.get('themeld'); // light/dark
		const themeco = url.searchParams.get('themeco'); // colour
		const theme = `${themeld} ${themeco}`;

		// since changing the theme is on +layout, need to know where to go back to
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}
		// go to recieved path, if it doesn't exist go to '/'
		throw redirect(303, redirectTo ?? '/');
	}
};
