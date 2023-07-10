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
			const { data: userInfo } = await event.locals.supabase
				.from('profiles')
				.select()
				.eq('username', data3[i].username)
				.maybeSingle();

			console.log('userInfo: ', userInfo);

			if (!userInfo) {
				continue;
			}

			// 2: check if data3.CAS is in the DB, add it if not using data3.CAS & data3.chemicalName
			let chemicalInfo = await event.locals.supabase
				.from('chemicals')
				.select()
				.eq('CAS', data3[i].CAS)
				.maybeSingle();

			if (!chemicalInfo.data) {
				const APIData = await getData(data3[i].CAS);
				if (!APIData) {
					continue;
				}
				// console.log(APIData)
				console.log('Adding new chemical to database...');
				chemicalInfo = await event.locals.supabase
					.from('chemicals')
					.insert({
						CAS: data3[i].CAS,
						chemicalName: APIData.name,
						MW: APIData.molecularMass,
						MP: APIData.phys.MP,
						BP: APIData.phys.BP,
						density: APIData.phys.density,
						inchi: APIData.inchi,
						smile: APIData.smile
					})
					.select()
					.maybeSingle();
			}

			// console.log('chemInfo: ', chemicalInfo);
			const chemicalID = chemicalInfo.data.id;

			// 3: put it all together and make an "order"
			const { error } = await event.locals.supabase.from('orders').insert({
				userID: userInfo.id,
				chemicalID,
				amount: parseInt(data3[i].amount),
				amountUnit: data3[i].amountUnit,
				supplierID: data3[i].supplierID
			});

			if (error) {
				console.log('error', error);
				return fail(400);
			}
			console.log('Added Order');
			console.log('------------------');
		}

		// FUNCTIONS USED IN ACTION INPUTCSV
		async function getData(CAS: string) {
			console.log('Searching for data on the chemical...');
			const uri = `https://commonchemistry.cas.org/api/detail?cas_rn=${CAS}`;
			const res = await fetch(uri);
			if (!res.ok) {
				console.log('no data found on commonchemistry');
				return;
			}
			const data = await res.json();
			if (data.experimentalProperties) {
				data.phys = extractPhys(data.experimentalProperties);
			}
			return data;
		}

		function extractPhys(propertyArray) {
			const phys = {
				BP: null,
				MP: null,
				density: null
			};
			propertyArray.forEach((item) => {
				if (item.name == 'Boiling Point') {
					phys.BP = item.property;
				}
				if (item.name == 'Melting Point') {
					phys.MP = item.property;
				}
				if (item.name == 'Density') {
					phys.density = item.property;
				}
			});
			return phys;
		}
	}
};
