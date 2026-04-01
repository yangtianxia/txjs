import { isString } from '../src/isString'

describe('isString', () => {
  test('returns true for strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('abc')).toBe(true)
    expect(isString('hello world')).toBe(true)
  })

  test('returns false for non-strings', () => {
    expect(isString(1)).toBe(false)
    expect(isString(false)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
  })
})
