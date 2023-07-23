import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addUser: async (event) => {
		const formData = await event.request.formData();

		if (!formData) {
			return fail(400, { formData, missing: true });
		}

		const username = String(formData.get('username'));
		const email = String(formData.get('email'));

		const { data, error } = await event.locals.supabase.auth.signUp({
			email,
			password: 'default'
		});
		if (error) {
			console.log(error);
			return;
		}

		// add username to the created profile
		// having problems using .insert for some reason. is it because it is already null?
		// 'null value in column "id" of relation "profiles" violates not-null constraint
		// insert seems to put in an entire row or multiple rows
		const { error: error2 } = await event.locals.supabase
			.from('profiles')
			.update({
				username,
				full_name: email
			})
			.eq('id', data.user.id);

		if (error2) {
			console.log(error2);
			return fail(400, { error2: true });
		}
		console.log('success');
		return { success: true };
	}
};
