import { json } from '@sveltejs/kit';
import type { FetchOutcome } from '$lib/types/global.js';

import PurpleChemAuthApi from '$lib/apiClient/PurpleChemAuthAPI.js';

export const POST = async ({ cookies, locals, request }) => {
	const AuthAPI = new PurpleChemAuthApi();
	// APIClient calls the DataURL

	const token = cookies.get('session');

	let outcome: FetchOutcome = { success: false, error: null };

	const {
		newUsername: username,
		newPassword: password,
		fullName: full_name,
		role: anyCaseRole
	} = await request.json();
	const role = anyCaseRole.toLowerCase();

	const APIClient = locals.apiclient;

	// create a new entry in the Auth users table
	// return the id, use this id to create a matching entry in the Data profiles table

	const response = await AuthAPI.post('/newuser', {
		headers: { Authorization: `Bearer ${token}` },
		body: { username, password, role }
	});

	if (response.outcome.error) {
		outcome = response.outcome;
		return json({ outcome });
	}

	// AuthAPI will return an object containing the newly created id (as well as username, full_name if required)
	const { id } = response.data;

	const { outcome: databaseOutcome } = await APIClient.post('/adduser/', null, {
		body: { id, username, full_name }
	});

	return json({ outcome: databaseOutcome });
};
