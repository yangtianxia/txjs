import { isNumber } from '../src/isNumber'

describe('isNumber', () => {
  test('returns true for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(3)).toBe(true)
    expect(isNumber(3.1415)).toBe(true)
    expect(isNumber(-100)).toBe(true)
  })

  test('returns false for non-numbers', () => {
    expect(isNumber('3')).toBe(false)
    expect(isNumber('3.1415926')).toBe(false)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(Infinity)).toBe(true) // Infinity is a number type
  })

  test('returns false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })
})
