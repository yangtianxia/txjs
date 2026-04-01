import { isArray } from '../src/isArray'

describe('isArray', () => {
  test('returns true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    expect(isArray(new Array())).toBe(true)
  })

  test('returns false for non-arrays', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray('abc')).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray(true)).toBe(false)
  })
})
