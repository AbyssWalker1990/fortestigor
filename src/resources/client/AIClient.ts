import { Base } from "../Base";
import { Config } from "../types";

interface AIConfig extends Config {
	endPoint: string;
}

export class AIClient extends Base {
	private endPoint: string;
	constructor(config: AIConfig) {
		super({ apiKey: config.apiKey, baseUrl: config.baseUrl });
		this.endPoint = config.endPoint;
	}
	async invoke(requestBody: BodyInit) {
		const options: RequestInit = {
			method: "POST",
			body: requestBody,
		};
        return this.request(this.endPoint, options);
	}
}
