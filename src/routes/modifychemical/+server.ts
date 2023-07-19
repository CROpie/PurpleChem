import { json } from '@sveltejs/kit';

export async function PUT(event) {
	console.log('+server.ts PUT');

	const { chemical } = await event.request.json();
	const id = chemical.id;
	const chemicalName = chemical.chemicalName;
	const MW = chemical.MW;
	const MP = chemical.MP;
	const BP = chemical.BP;
	const density = chemical.density;

	// modify user database
	const { error } = await event.locals.supabase
		.from('chemicals')
		.update({
			chemicalName,
			MW,
			MP,
			BP,
			density
		})
		.eq('id', id);

	if (error) {
		console.log('error');
		return json('fail');
	}
	console.log('success');
	return json('success');
}

export async function DELETE(event) {
	console.log('+server.ts DELETE');

	const { id } = await event.request.json();
	console.log(id);

	// modify user database
	const { error } = await event.locals.supabase.from('chemicals').delete().eq('id', id);

	if (error) {
		console.log('error');
		return json('fail');
	}
	console.log('success');
	return json('success');
}
