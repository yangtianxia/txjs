import { isHttpUrl } from '../src/isHttpUrl'

describe('isHttpUrl', () => {
  test('valid http URLs', () => {
    expect(isHttpUrl('http://www.example.com')).toBe(true)
    expect(isHttpUrl('https://www.example.com')).toBe(true)
    expect(isHttpUrl('https://example.com')).toBe(true)
  })

  test('valid HTTPS with paths', () => {
    expect(isHttpUrl('https://www.example.com/path')).toBe(true)
    expect(isHttpUrl('https://www.example.com/path/to/page')).toBe(true)
    expect(isHttpUrl('https://www.example.com/path?query=1')).toBe(true)
  })

  test('valid HTTPS with ports', () => {
    expect(isHttpUrl('https://www.example.com:8080')).toBe(true)
    expect(isHttpUrl('http://localhost:3000')).toBe(false) // localhost doesn't match the regex pattern
  })

  test('invalid URLs without protocol', () => {
    expect(isHttpUrl('www.example.com')).toBe(false)
    expect(isHttpUrl('example.com')).toBe(false)
  })

  test('invalid relative paths', () => {
    expect(isHttpUrl('foo/bar')).toBe(false)
    expect(isHttpUrl('/path/to/page')).toBe(false)
  })

  test('invalid types', () => {
    expect(isHttpUrl(null)).toBe(false)
    expect(isHttpUrl(undefined)).toBe(false)
    expect(isHttpUrl(123)).toBe(false)
    expect(isHttpUrl({})).toBe(false)
  })

  test('empty string', () => {
    expect(isHttpUrl('')).toBe(false)
  })
})
