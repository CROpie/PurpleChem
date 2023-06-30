import { fail } from '@sveltejs/kit';

export const actions = {
	inputCSV: async (event) => {
		console.log('** api/orders/inputCSV **');
		const data = await event.request.formData();
		const data2 = data.get('csvData');
		const data3 = await JSON.parse(data2);
		console.log(data3);

		for (let i = 0; i < data3.length; i++) {
			console.log('ITERATION: ', i);
			// 1: data3.userName -> userID
			let { data: userInfo } = await event.locals.supabase
				.from('user')
				.select()
				.eq('userName', data3[i].userName)
				.maybeSingle();

			console.log('userInfo: ', userInfo);
			if (!userInfo) {
				continue;
			}

			// 2: check if data3.CAS is in the DB, add it if not using data3.CAS & data3.chemicalName
			let chemicalInfo = await event.locals.supabase
				.from('chemical')
				.select()
				.eq('CAS', data3[i].CAS)
				.maybeSingle();

			if (!chemicalInfo.data) {
				console.log('Adding new chemical to database...');
				chemicalInfo = await event.locals.supabase
					.from('chemical')
					.insert({
						CAS: data3[i].CAS,
						chemicalName: data3[i].chemicalName
					})
					.select()
					.maybeSingle();
			}
			console.log('chemInfo: ', chemicalInfo);
			const chemicalID = chemicalInfo.data.id;

			// 3: put it all together and make an "order"
			const { error } = await event.locals.supabase.from('order').insert({
				userID: userInfo.id,
				chemicalID,
				amount: parseInt(data3[i].amount),
				amountUnit: data3[i].amountUnit
			});

			if (error) {
				console.log('error', error);
				return fail(400);
			}
			console.log('Added Order');
		}
	}
};
