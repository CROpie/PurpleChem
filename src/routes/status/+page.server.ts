import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: ordersList } = await supabase
		.from('orders')
		.select('id, userID ( username ), chemicalID( chemicalName), statusID');

	return { ordersList };
};
