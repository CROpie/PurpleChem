import type { FetchOutcome } from '$lib/types/global.js';

export const load = async ({ locals }) => {
	console.log('sneak in?');
	const AuthAPI = locals.authclient;
	const APIClient = locals.apiclient;

	let outcome: FetchOutcome = { success: false, error: null };

	const response = await AuthAPI.post('/seedauthadmin', {
		body: { username: 'admin@purplechem.com', password: 'default' }
	});

	console.log(response);

	if (!response.outcome.success) {
		outcome = response.outcome;
		return { outcome };
	}

	const { id } = response.data;

	// localhost
	// http://127.0.0.1:8005/seeddataadmin/
	// droplet
	// const DataURL = 'http://170.64.192.236:85';

	// const response2 = await fetch('http://170.64.192.236:85/seeddataadmin/', {
	const response2 = await fetch('https://api2.cropie.store/seeddataadmin/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, username: 'admin@purplechem.com', full_name: 'administrator' })
	});

	if (!response2.ok) {
		const { detail } = await response2.json();
		if (detail[0].msg) {
			outcome.error = detail[0].msg;
		} else {
			outcome.error = detail;
		}
		return { outcome };
	}

	outcome.success = true;

	return { outcome };
};
