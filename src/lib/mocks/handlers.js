// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.post('http://localhost:5173/testquery', async (req, res, ctx) => {
		return res(ctx.json([{ id: 48, chemicalName: 'Benzene', CAS: '71-43-2' }]));
	}),
	rest.post('http://localhost:5173/', async (req, res, ctx) => {
		return res(ctx.delay(100), ctx.json({ success: true, error: null }));
	}),
	// post: new location. put: modify order
	rest.post('http://localhost:5173/inventory', async (req, res, ctx) => {
		if (req.body?.newLocation == 'successfulLocation') {
			return res(ctx.delay(100), ctx.json({ success: true, error: null }));
		}
		if (req.body?.newLocation == 'failLocation') {
			return res(
				ctx.delay(100),
				ctx.json({ success: false, error: 'Error connecting to database...' })
			);
		}
	})
];
