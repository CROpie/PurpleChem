import { json } from '@sveltejs/kit';
import type { FetchOutcome } from '$lib/types/global.js';

export const POST = async ({ request, cookies, locals }) => {
	let outcome: FetchOutcome = {
		success: false,
		error: null
	};

	console.log(request);

	const { userInfo } = await request.json();
	const { email: username, password } = userInfo;

	const AuthAPI = locals.authclient;

	const response = await AuthAPI.post('/token', {
		body: { username, password }
	});

	if (response.outcome.error) {
		outcome = response.outcome;
		return json({ outcome });
	}

	const { access_token, refresh_token } = response.data;

	// 60 * 30
	cookies.set('session', access_token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 30
	});
	cookies.set('refresh', refresh_token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24
	});

	outcome.success = true;

	return json({ outcome });
};
