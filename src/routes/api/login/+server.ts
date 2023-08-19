import { json } from '@sveltejs/kit';
import type { FetchOutcome } from '$lib/types/formTypes.js';

const AuthURL = 'http://127.0.0.1:8000';

export const POST = async ({ request, cookies }) => {
	const outcome: FetchOutcome = {
		success: false,
		error: null
	};

	const { email: username, password } = await request.json();

	console.log('hello I am in /login +server.ts', username, password);

	const response = await fetch(`${AuthURL}/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			username,
			password
		})
	});

	if (response.ok) {
		const { access_token } = await response.json();

		cookies.set('session', access_token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 30
		});
		outcome.success = true;
		return json({ outcome });
	} else {
		outcome.error = 'Failed to authorize user';
		return json({ outcome });
	}
};
