import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
	// if token is being stored on the auth server, clear it here.
	cookies.set('session', '', {
		path: '/',
		expires: new Date()
	});
	throw redirect(302, '/');
};
