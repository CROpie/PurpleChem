import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { FormResult } from '$lib/types/formTypes';

export const POST: RequestHandler = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: ''
	};

	const { CAS } = await request.json();

	const { data: chemical, error } = await locals.supabase
		.from('chemicals')
		.select()
		.eq('CAS', CAS)
		.maybeSingle();

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json({ chemical: null });
	}

	return json({ chemical });
};
