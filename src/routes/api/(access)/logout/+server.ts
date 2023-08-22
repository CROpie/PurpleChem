import { json } from '@sveltejs/kit';
import type { FetchOutcome } from '$lib/types/global.js';

export const GET = async ({ cookies, locals }) => {
	const refresh_token = cookies.get('refresh');

	let outcome: FetchOutcome = { success: false, error: null };

	const AuthAPI = locals.authclient;

	console.log('logging out...');

	if (!refresh_token) {
		outcome.error = 'Somehow no refresh token..?';
		return json({ outcome });
	}

	const response = await AuthAPI.post('/logout', {
		body: { refresh_token }
	});

	if (response.outcome.error) {
		outcome = response.outcome;
		return json({ outcome });
	}

	console.log('logged out.');

	cookies.set('session', '', {
		path: '/',
		expires: new Date()
	});

	cookies.set('refresh', '', {
		path: '/',
		expires: new Date()
	});

	cookies.set('role', '', {
		path: '/',
		expires: new Date()
	});

	console.log('tokens revoked.');

	outcome.success = true;

	return json({ outcome });
};
