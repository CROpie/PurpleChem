export const load = async ({ locals: { supabase } }) => {
	const { data } = await supabase
		.from('orders')
		.select(
			'id, userID (username), chemicalID ( chemicalName), amount, amountUnit, supplierID(id, supplierName), supplierPN'
		);

	const { data: supplierList } = await supabase.from('suppliers').select('*');

	return { data, supplierList };
};
