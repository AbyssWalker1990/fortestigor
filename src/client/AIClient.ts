import * as http from 'http'
import { AIClientConfig } from 'src/types/AIClientType'
import { UrlService } from './UrlService'
import { HttpRequestService } from './HttpRequestService'

export class AIClient {
    config: AIClientConfig

    constructor(config: AIClientConfig,
        private readonly urlService = new UrlService(),
        private readonly httpRequestService = new HttpRequestService()) {
        this.config = config
    }


    async invoke(payload: string): Promise<any> {
        const url = this.urlService.getUrl(this.config.url)
        const headers = {
            'Content-Type': 'application/json',
        }

        const postData = JSON.stringify({
            input: payload,
        })
        console.log('url post: \r\n', this.config.url)
        const result = await this.httpRequestService.handleRequest(url.href, headers, this.config.method, postData)
        return result

    }
}
