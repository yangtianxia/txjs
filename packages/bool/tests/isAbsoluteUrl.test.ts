import { isAbsoluteUrl } from '../src/isAbsoluteUrl'

describe('isAbsoluteUrl', () => {
  test('returns true for absolute URLs', () => {
    expect(isAbsoluteUrl('https://www.example.com')).toBe(true)
    expect(isAbsoluteUrl('http://example.com')).toBe(true)
    expect(isAbsoluteUrl('file:///path/to/file')).toBe(true)
    expect(isAbsoluteUrl('ftp://ftp.example.com')).toBe(true)
  })

  test('returns false for relative URLs', () => {
    expect(isAbsoluteUrl('www.example.com')).toBe(false)
    expect(isAbsoluteUrl('/path/to/resource')).toBe(false)
    expect(isAbsoluteUrl('./local/path')).toBe(false)
  })

  test('returns false for windows paths', () => {
    expect(isAbsoluteUrl('c:\\path\\to\\file')).toBe(false)
    expect(isAbsoluteUrl('C:\\Users\\name')).toBe(false)
  })

  test('returns false for non-strings', () => {
    expect(isAbsoluteUrl(null)).toBe(false)
    expect(isAbsoluteUrl(undefined)).toBe(false)
    expect(isAbsoluteUrl(123)).toBe(false)
    expect(isAbsoluteUrl({})).toBe(false)
  })
})
