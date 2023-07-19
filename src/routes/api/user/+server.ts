import { json } from '@sveltejs/kit';

export async function POST(event) {
	console.log('+server.ts POST');

	const { id, username } = await event.request.json();

	// modify user database
	const { error } = await event.locals.supabase
		.from('profiles')
		.update({
			username
		})
		.eq('id', id);

	if (error) {
		console.log('error');
		return json('fail');
	}
	console.log('success');
	return json('success');
}
