import type { FetchOutcome } from '$lib/types/global';

type RequestOptions = {
	query?: Record<string, string>;
	headers?: Record<string, string>;
	method: string;
	url: string;
	body?: any;
};

// localhost
// const DataURL = 'http://127.0.0.1:8005';
// droplet
const DataURL = 'http://170.64.192.236:85';

export default class PurpleChemServerApi {
	private base_url: string;
	private token: string;

	constructor(accessToken: string) {
		this.base_url = DataURL;
		this.token = accessToken;
	}

	async request(options: RequestOptions) {
		const outcome: FetchOutcome = {
			success: false,
			error: null
		};

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

		// Since hooks runs before this request, the token should be refreshed
		// and this code should not run.
		if (!this.token) {
			outcome.error = 'Token has expired. Please refresh the page.';
			return { outcome };
		}

		const response = await fetch(this.base_url + options.url + query, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : null
		});

		// HTTPException info will be sent to reponse.detail
		// Pydantic errors will be sent to detail[arr].msg

		if (!response.ok) {
			const { detail } = await response.json();
			if (detail[0].msg) {
				outcome.error = detail[0].msg;
			} else {
				outcome.error = detail;
			}
			return { outcome };
		}

		const data = await response.json();

		outcome.success = true;

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
