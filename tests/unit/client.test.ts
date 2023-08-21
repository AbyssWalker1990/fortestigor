import { describe, expect, test } from '@jest/globals'
import { AIClient } from '../../src/client/AIClient'
import { HttpRequestService } from '../../src/client/HttpRequestService'
import { UrlsService } from '../../src/client/UrlService'
import returnValue from './utils/mockReturnValue'
import resolve from './utils/mockResolvedValue'
import mockImplementation from './utils/mockImplementation'

describe('AIClient', () => {
  const initialUrl = 'http://localhost:3001'
  const initialMethod = 'POST'

  const urlService = new UrlsService()
  const httpRequestService = new HttpRequestService()
  const client = new AIClient({
    url: initialUrl,
    method: initialMethod,
  }, urlService, httpRequestService)

  describe('invoke', () => {
    const urlObj = new URL('http://example.com')
    const headers = {
      'Content-Type': 'application/json',
    }
    const invokeInput = 'Say hello'

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('Returns response', async () => {
      const payload = JSON.stringify({ input: invokeInput })

      urlService.getUrl = returnValue(urlObj)
      httpRequestService.handleRequest = resolve('response')

      expect(await client.invoke(invokeInput)).toBe('response')

      expect(jest.spyOn(urlService, 'getUrl')).toBeCalledWith(initialUrl)
      expect(jest.spyOn(httpRequestService, 'handleRequest')).toBeCalledWith(urlObj.href, headers, initialMethod, payload)
    })

    test('Throw an error', async () => {
      urlService.getUrl = returnValue(urlObj)
      httpRequestService.handleRequest = mockImplementation(() => {
        throw new Error(
          'Invalid content-type.\n' + `Expected application/json but received ${headers['Content-Type']}`,
        )
      })

      await expect(client.invoke(invokeInput)).rejects.toThrow(new Error('Invalid content-type.\n' + `Expected application/json but received ${headers['Content-Type']}`))
    })
  })
})