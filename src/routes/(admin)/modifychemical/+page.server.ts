import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: chemicalList } = await supabase
		.from('chemicals')
		.select('id, chemicalName, CAS, MW, MP, BP, density');

	return { chemicalList };
};
