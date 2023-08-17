interface Config {
	apiKey: string;
	baseUrl?: string;
	endpoint: string;
}

export class AIClient {
	private apiKey: string;
	private baseUrl: string;
	private endpoint: string;
	constructor(config: Config) {
		this.apiKey = config.apiKey;
		this.baseUrl = config.baseUrl || "";
		this.endpoint = config.endpoint;
	}
	async invoke<T>(payload: T) {
		const url = `${this.baseUrl}${this.endpoint}`;
		const headers = {
			"Content-Type": "application/json",
			"api-key": this.apiKey,
		};
		const config: RequestInit = {
			method: "POST",
			body: JSON.stringify(payload),
			headers,
		};
		return fetch(url, config).then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		});
	}
}
