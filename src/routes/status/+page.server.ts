export const load = async ({ locals: { supabase } }) => {
	// const { data: ordersList } = await supabase
	// 	.from('orders')
	// 	.select('id, chemicalID( id, chemicalName), statusID')
	// 	.eq('userID', userID);

	// for some reason, can't use statusID(id, stausValue)
	// perhaps because of the .or ?
	const { data } = await supabase
		.from('orders')
		.select('id, userID ( username ), chemicalID( chemicalName), statusID');

	return { data };
};
