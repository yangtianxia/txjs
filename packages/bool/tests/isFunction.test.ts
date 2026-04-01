import { isFunction } from '../src/isFunction'

describe('isFunction', () => {
  test('returns true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
  })

  test('returns false for non-functions', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction('abc')).toBe(false)
    expect(isFunction(123)).toBe(false)
  })
})
