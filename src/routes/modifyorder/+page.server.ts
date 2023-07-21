import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: orderList } = await supabase
		.from('orders')
		.select(
			'id, userID (username), chemicalID ( chemicalName), amount, amountUnit, supplierID(id, supplierName), supplierPN'
		);

	const { data: supplierList } = await supabase.from('suppliers').select('*');

	return { orderList, supplierList };
};
