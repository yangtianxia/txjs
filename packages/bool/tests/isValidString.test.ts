import { isValidString } from '../src/isValidString'

describe('isValidString', () => {
  test('returns true for valid non-empty strings', () => {
    expect(isValidString('hello world')).toBe(true)
    expect(isValidString('abc')).toBe(true)
    expect(isValidString('  hello  ')).toBe(true) // whitespace is trimmed
  })

  test('returns false for invalid strings', () => {
    expect(isValidString(null)).toBe(false)
    expect(isValidString(undefined)).toBe(false)
    expect(isValidString('')).toBe(false)
    expect(isValidString('   ')).toBe(false) // only whitespace
    expect(isValidString(123)).toBe(false)
    expect(isValidString({})).toBe(false)
  })
})
