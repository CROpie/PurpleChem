import type { FetchOutcome } from '$lib/types/global';

type RequestOptions = {
	headers?: Record<string, string>;
	method: string;
	url: string;
	body?: any;
};

const AuthURL = 'http://127.0.0.1:8000';

export default class PurpleChemAuthApi {
	private base_url: string;

	constructor() {
		this.base_url = AuthURL;
	}

	async request(options: RequestOptions) {
		const outcome: FetchOutcome = {
			success: false,
			error: null
		};

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers
		};

		const response = await fetch(this.base_url + options.url, {
			method: options.method,
			headers,
			body: new URLSearchParams(options.body)
		});

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

	async post(url: string, options?: any) {
		return this.request({ method: 'POST', url, ...options });
	}
}
