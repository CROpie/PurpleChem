import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	// test: async ({ url, request }) => {
	test: async (event) => {
		console.log(event);
		const formData = await event.request.formData();
		const fruit = String(formData.get('fruit'));
		console.log('fruit: ', fruit);
		console.log('url: ', event.url);
		return { fruit };
	}
};
