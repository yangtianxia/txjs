import { isPlainObject } from '../src/isPlainObject'

describe('isPlainObject', () => {
  test('returns true for plain objects', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true)
  })

  test('returns false for non-plain objects', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject('abc')).toBe(false)
    expect(isPlainObject(123)).toBe(false)
  })
})
