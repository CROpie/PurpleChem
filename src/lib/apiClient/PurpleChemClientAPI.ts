import type { FetchOutcome } from '$lib/types.js';

type RequestOptions = {
	query?: Record<string, string>;
	headers?: Record<string, string>;
	method: string;
	url: string;
	body?: any;
};

const ServerURL = '/api';

export default class PurpleChemClientApi {
	private base_url: string;

	constructor() {
		this.base_url = ServerURL;
	}

	async request(options: RequestOptions) {
		let query = new URLSearchParams(options.query || {}).toString();
		if (query !== '') {
			query = '?' + query;
		}
		const headers = {
			'Content-Type': 'application/json',
			...options.headers
		};

		const response = await fetch(this.base_url + options.url + query, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : null
		});

		console.log('clientsideapi response: ', response);

		if (!response.ok) {
			const outcome: FetchOutcome = {
				success: false,
				error: 'Something went wrong when querying the database...'
			};
			return { outcome };
		}

		const { data, outcome } = await response.json();
		console.log('ClientSide: ', data, outcome);
		return { outcome, data };
	}

	async get(url: string, query?: Record<string, string> | null, options?: any) {
		return this.request({ method: 'GET', url, query, ...options });
	}

	async post(url: string, query?: Record<string, string> | null, options?: any) {
		return this.request({ method: 'POST', url, query, ...options });
	}

	async put(url: string, query?: Record<string, string> | null, options?: any) {
		return this.request({ method: 'PUT', url, query, ...options });
	}

	async delete(url: string, query?: Record<string, string> | null, options?: any) {
		return this.request({ method: 'DELETE', url, query, ...options });
	}
}
