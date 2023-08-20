import * as http from 'http'

interface Config {
    url: string
    method: 'GET' | 'POST'
}

export class AIClient {
    private url: URL
    private method: 'GET' | 'POST'

    constructor(config: Config) {
        this.url = new URL(config.url.includes('http://') ? config.url : 'http://' + config.url)
        this.method = config.method
    }

    private handleRequest(url: string, headers: Record<string, string>, method: string, payload: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const req = http.request(
                url,
                {
                    headers: headers,
                    method: method,
                },
                (res) => {
                    const { statusCode } = res
                    const contentType = res.headers['content-type']

                    let error
                    if (statusCode !== 200) {
                        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`)
                    } else if (!/^application\/json/.test(contentType || '')) {
                        error = new Error(
                            'Invalid content-type.\n' + `Expected application/json but received ${contentType}`,
                        )
                    }
                    if (error) {
                        console.error(error.message)
                        // Consume response data to free up memory
                        res.resume()
                        reject(error)
                        return
                    }

                    res.setEncoding('utf8')
                    let rawData = ''
                    res.on('data', (chunk) => {
                        rawData += chunk
                    })

                    res.on('end', () => {
                        const parsedData = JSON.parse(rawData)
                        console.log(parsedData)
                        resolve(parsedData)
                    })
                },
            )

            req.on('error', (error) => {
                console.error('Error: ', error.message)
                reject(error)
            })

            if (payload) {
                req.write(payload)
            }

            req.end()
        })
    }

    async invoke(payload: string): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
        }

        if (this.method === 'GET') {
            const urlWithQueryParam = new URL(this.url.toString())
            urlWithQueryParam.searchParams.append('question', payload)
            console.log('url get: \r\n', urlWithQueryParam)
            return this.handleRequest(urlWithQueryParam.href, headers, this.method, '')
        } else if (this.method === 'POST') {
            const postData = JSON.stringify({
                question: payload,
            })
            console.log('url post: \r\n', this.url)
            return this.handleRequest(this.url.href, headers, this.method, postData)
        }
    }
}
