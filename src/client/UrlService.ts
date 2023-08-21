export class UrlsService {
  constructor() {}
  getUrl(href: string): URL {
    return new URL(href.includes('http://') ? href : 'http://' + href)
  }
}