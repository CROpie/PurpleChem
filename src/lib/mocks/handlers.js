// src/mocks/handlers.js
import { rest } from 'msw';

const baseUrl = window.location.href;
export const handlers = [
	rest.post('http://localhost:5173/testquery', async (req, res, ctx) => {
		return res(ctx.json([{ id: 48, chemicalName: 'Benzene', CAS: '71-43-2' }]));
	}),
	rest.post(`${baseUrl}`, async (req, res, ctx) => {
		return res(ctx.delay(100), ctx.json({ success: true, error: null }));
	}),
	// post: new location. put: modify order
	rest.post(`${baseUrl}inventory`, async (req, res, ctx) => {
		if (req.body?.newLocation == 'successfulLocation') {
			return res(
				ctx.delay(100),
				ctx.json({
					newLocationData: { id: 47, locationName: 'successfulLocation' },
					form: { success: true, error: null }
				})
			);
		}

		if (req.body?.newLocation == 'failLocation') {
			return res(
				ctx.delay(100),
				ctx.json({
					newLocationData: null,
					form: { success: false, error: 'Error connecting to database...' }
				})
			);
		}
	}),

	rest.put(`${baseUrl}inventory`, async (req, res, ctx) => {
		return res(ctx.delay(100), ctx.json({ success: true, error: null }));
	}),
	rest.get('https://commonchemistry.cas.org/api/detail', async (req, res, ctx) => {
		return res(
			ctx.delay(100),
			ctx.json({
				chemicalName: 'triethylamine',
				molecularMass: 101.3,
				inchi: 'InChI=1S/C6H15N/c1-4-7(5-2)6-3/h4-6H2,1-3H3',
				smile: 'N(CC)(CC)CC',
				experimentalProperties: [
					{
						name: 'Boiling Point',
						property: '89.3 °C',
						sourceNumber: 1
					},
					{
						name: 'Melting Point',
						property: '-114.7 °C',
						sourceNumber: 1
					},
					{
						name: 'Density',
						property: '0.7255 g/cm³ @ Temp: 25 °C',
						sourceNumber: 1
					}
				]
			})
		);
	})
];

/*
			const data = await res.json();
			chemicalName = data.name;
			MW = data.molecularMass;
			inchi = data.inchi;
			smile = data.smile;
			if (data.experimentalProperties) {
				extractPhys(data.experimentalProperties);
			}*/

/*
	rest.put('http://localhost:5173/inventory', async (req, res, ctx) => {
		if (req.body?.newLocation == 'successfulModification') {
			return res(ctx.delay(100), ctx.json({ success: true, error: null }));
		}
		if (req.body?.newLocation == 'failModification') {
			return res(
				ctx.delay(100),
				ctx.json({ success: false, error: 'Error connecting to database...' })
			);
		}
	})
	*/
