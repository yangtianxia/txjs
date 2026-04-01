import { isNull } from '../src/isNull'

describe('isNull', () => {
  test('returns true for null', () => {
    expect(isNull(null)).toBe(true)
  })

  test('returns false for non-null values', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(void 0)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull(false)).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull([])).toBe(false)
  })
})
