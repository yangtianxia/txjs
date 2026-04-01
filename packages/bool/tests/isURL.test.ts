import { isURL } from '../src/isURL'

describe('isURL', () => {
  test('returns true for valid URLs', () => {
    expect(isURL('https://www.example.com')).toBe(true)
    expect(isURL('http://example.com')).toBe(true)
    expect(isURL('https://example.com/path')).toBe(true)
  })

  test('returns false for invalid URLs', () => {
    expect(isURL('www.example.com')).toBe(false)
    expect(isURL('example.com')).toBe(false)
    expect(isURL('')).toBe(false)
    expect(isURL(null)).toBe(false)
    expect(isURL(undefined)).toBe(false)
  })
})
