import fetch from "isomorphic-unfetch";
import { Config } from "./types";

export abstract class Base {
	private apiKey: string;
	private baseUrl: string;

	constructor(config: Config) {
		this.apiKey = config.apiKey;
		this.baseUrl = config.baseUrl || "";
	}

	protected async request<T>(
		endpoint: string,
		options?: RequestInit
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const headers = {
			"Content-Type": "application/json",
			"api-key": this.apiKey,
		};
		const config = {
			...options,
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
