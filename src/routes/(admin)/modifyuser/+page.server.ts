import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: usersList } = await supabase.from('profiles').select('id, username, full_name');

	return { usersList };
};
