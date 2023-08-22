/* MODULES */
import PurpleChemClientApi from '$lib/apiClient/PurpleChemClientAPI';

export const load = async ({ data }) => {
	const ClientAPI = new PurpleChemClientApi();
	if (data) {
		const role = data.role;
		return { ClientAPI, role };
	} else {
		return { ClientAPI };
	}
};
