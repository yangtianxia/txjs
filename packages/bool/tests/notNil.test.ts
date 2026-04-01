import { notNil } from '../src/notNil'

describe('notNil', () => {
  test('returns true for non-nil values', () => {
    expect(notNil(0)).toBe(true)
    expect(notNil('')).toBe(true)
    expect(notNil(false)).toBe(true)
    expect(notNil({})).toBe(true)
    expect(notNil([])).toBe(true)
    expect(notNil('hello')).toBe(true)
    expect(notNil(123)).toBe(true)
  })

  test('returns false for null and undefined', () => {
    expect(notNil(null)).toBe(false)
    expect(notNil(undefined)).toBe(false)
    expect(notNil(void 0)).toBe(false)
  })
})
