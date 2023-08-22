import { describe, expect, test } from '@jest/globals'
import { UrlService } from "../../src/client/UrlService"

describe('UrlService', () => {
  describe('getUrl', () => {
    const startUrl = 'example.com'
    const expectedUrl = new URL('http://example.com/')

    const urlService = new UrlService()

    test('Returns proper url', () => {
      expect(urlService.getUrl(startUrl)).toEqual(expectedUrl)
    })
  })
})