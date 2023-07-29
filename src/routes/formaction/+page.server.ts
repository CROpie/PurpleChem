import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	test: async ({ url, request }) => {
		console.log(request);
		const formData = await request.formData();
		const fruit = String(formData.get('fruit'));
		console.log('fruit: ', fruit);
		console.log('url: ', url);
		return { fruit };
	}
};
