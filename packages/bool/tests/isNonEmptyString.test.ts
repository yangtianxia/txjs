import { isNonEmptyString } from '../src/isNonEmptyString'

describe('isNonEmptyString', () => {
  test('returns true for non-empty strings', () => {
    expect(isNonEmptyString('hello world')).toBe(true)
    expect(isNonEmptyString('abc')).toBe(true)
    expect(isNonEmptyString('  hello  ')).toBe(true)
  })

  test('returns false for empty or invalid values', () => {
    expect(isNonEmptyString(null)).toBe(false)
    expect(isNonEmptyString('')).toBe(false)
    expect(isNonEmptyString('   ')).toBe(false)
    expect(isNonEmptyString(123)).toBe(false)
    expect(isNonEmptyString({})).toBe(false)
  })
})
