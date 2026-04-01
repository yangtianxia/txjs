import { isNil } from '../src/isNil'

describe('isNil', () => {
  test('returns true for null and undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(void 0)).toBe(true)
  })

  test('returns false for non-nil values', () => {
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil({})).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil('hello')).toBe(false)
  })
})
