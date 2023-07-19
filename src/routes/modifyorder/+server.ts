import { json } from '@sveltejs/kit';

export async function PUT(event) {
	console.log('+server.ts PUT');

	const { order } = await event.request.json();
	console.log(order);
	const id = order.id;
	const amount = order.amount;
	const amountUnit = order.amountUnit;
	const supplierPN = order.supplerPN;
	const supplierID = order.supplierID.id;

	// const { data: supplier } = await event.locals.supabase
	// 	.from('suppliers')
	// 	.select()
	// 	.eq('supplierName', supplierName)
	// 	.maybeSingle();

	// if (!supplier) {
	// 	console.log('supplier not in the DB');
	// }

	// modify user database
	const { error } = await event.locals.supabase
		.from('orders')
		.update({
			amount,
			amountUnit,
			supplierID,
			supplierPN
		})
		.eq('id', id);

	if (error) {
		console.log(error);
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
	const { error } = await event.locals.supabase.from('orders').delete().eq('id', id);

	if (error) {
		console.log('error');
		return json('fail');
	}
	console.log('success');
	return json('success');
}
