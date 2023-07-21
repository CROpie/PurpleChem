import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

type FormResult = {
	success: boolean;
	error: string;
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	const form: FormResult = {
		success: false,
		error: ''
	};

	const { chemical } = await request.json();

	const { error } = await locals.supabase
		.from('chemicals')
		.update({
			chemicalName: chemical.chemicalName,
			MW: chemical.MW,
			MP: chemical.MP,
			BP: chemical.BP,
			density: chemical.density
		})
		.eq('id', chemical.id);

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json(form, { status: 400 });
	}

	form.success = true;
	return json(form);
};

export async function DELETE({ request, locals }) {
	const form: FormResult = {
		success: false,
		error: ''
	};

	const { id } = await request.json();

	// modify user database
	const { error } = await locals.supabase.from('chemicals').delete().eq('id', id);

	if (error) {
		console.log('error', error);
		form.error = 'Could not complete the request.';
		return json(form, { status: 400 });
	}

	form.success = true;
	return json(form);
}
