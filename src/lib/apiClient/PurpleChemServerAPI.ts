import type { FetchOutcome } from '$lib/types.js';

type RequestOptions = {
	query?: Record<string, string>;
	headers?: Record<string, string>;
	method: string;
	url: string;
	body?: any;
};

const DataURL = 'http://127.0.0.1:8005';

export default class PurpleChemServerApi {
	private base_url: string;
	private token: string;

	constructor(accessToken: string) {
		this.base_url = DataURL;
		this.token = accessToken;
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
		if (this.token) {
			headers['Authorization'] = `Bearer ${this.token}`;
		}

		const response = await fetch(this.base_url + options.url + query, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : null
		});

		let outcome: FetchOutcome = {
			success: false,
			error: null
		};

		// if there is an error picked up, such as duplicate info, in the database,
		// an HTML excmption will be raised, and will be picked up as { detail }
		// in the !response.ok block.

		if (!response.ok) {
			const { detail } = await response.json();
			outcome.error = detail;
			return { outcome };
		}

		const data = await response.json();

		outcome.success = true;

		// console.log('ServerSide: ', data, outcome);
		return { outcome, data };
	}

	async get(url: string, query?: Record<string, string>, options?: any) {
		return this.request({ method: 'GET', url, query, ...options });
	}

	async post(url: string, query?: Record<string, string>, options?: any) {
		return this.request({ method: 'POST', url, query, ...options });
	}

	async put(url: string, query?: Record<string, string>, options?: any) {
		return this.request({ method: 'PUT', url, query, ...options });
	}

	async patch(url: string, query?: Record<string, string>, options?: any) {
		return this.request({ method: 'PATCH', url, query, ...options });
	}

	async delete(url: string, query?: Record<string, string>, options?: any) {
		return this.request({ method: 'DELETE', url, query, ...options });
	}
}
