import * as http from 'http'

export class HttpRequestService {

  public handleRequest(url: string, headers: Record<string, string>, method: string, payload: string): Promise<any> {
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
}