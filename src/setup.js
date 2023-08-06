import { server } from '$lib/mocks/server';
import fetch from 'cross-fetch';
import { cleanup } from '@testing-library/svelte';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
