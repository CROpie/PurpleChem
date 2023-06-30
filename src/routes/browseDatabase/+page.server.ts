export const load = async ({ locals: { supabase } }) => {
	console.log('** /home/+page.server.js load **');

	const { data: orders } = await supabase
		.from('order')
		.select(`id, chemical ( chemicalName ), user ( userName ), amount, amountUnit, isConsumed`);

	return { orders };
};
