import { server } from '$lib/mocks/server';
import fetch from 'cross-fetch';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
