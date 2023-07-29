import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

type FormResult = {
	success: boolean;
	error: string | null;
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const themeld = url.searchParams.get('themeld'); // light/dark
		const themeco = url.searchParams.get('themeco'); // colour
		const theme = `${themeld} ${themeco}`;

		// since changing the theme is pn +layout, need to know where to go back to
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
	// login: async ({ request, locals: { supabase } }) => {
	// 	console.log('logging in user');
	// 	const form: FormResult = {
	// 		success: false,
	// 		error: null
	// 	};

	// 	const formData = await request.formData();

	// 	if (!formData) {
	// 		form.error = 'Request failed...';
	// 		return fail(400, form);
	// 	}

	// 	const email = String(formData.get('email'));
	// 	const password = String(formData.get('password'));

	// 	const { data, error } = await supabase.auth.signInWithPassword({
	// 		email,
	// 		password
	// 	});

	// 	if (error) {
	// 		form.error = 'Request failed...';
	// 		return fail(400, form);
	// 	}

	// 	if (data) {
	// 		form.success = true;
	// 		return form;
	// 	}
	// }
};
