import type { FetchOutcome } from '$lib/types/global';

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
		const headers = {
			'Content-Type': 'application/json',
			...options.headers
		};

		const response = await fetch(this.base_url + options.url, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : null
		});

		if (!response.ok) {
			const outcome: FetchOutcome = {
				success: false,
				error: 'Something went wrong when querying the database...'
			};
			return { outcome };
		}

		const { data, outcome } = await response.json();

		return { outcome, data };
	}

	async post(url: string, options?: any) {
		return this.request({ method: 'POST', url, ...options });
	}
}
