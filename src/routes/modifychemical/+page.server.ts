export const load = async ({ locals: { supabase } }) => {
	const { data } = await supabase
		.from('chemicals')
		.select('id, chemicalName, CAS, MW, MP, BP, density');

	return { data };
};
