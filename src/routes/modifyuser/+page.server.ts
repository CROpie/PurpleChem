import { fail } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data } = await supabase.from('profiles').select('id, username, full_name');
	console.log(data);

	return { data };
};

export const actions: Actions = {
	changeUsername: async (event) => {
		const formData = await event.request.formData();

		if (!formData) {
			return fail(400, { formData, missing: true });
		}

		const currentID = formData.get('currentID');
		console.log('current ID: ', currentID);
		const currentUser = formData.get(currentID);
		console.log(currentUser);

		// add order to database
		const { error } = await event.locals.supabase
			.from('profiles')
			.update({
				username: currentUser
			})
			.eq('id', currentID);

		if (error) {
			console.log('error');
			return fail(400, { error: true });
		}
		console.log('success');
		return { success: true };
	}
};
