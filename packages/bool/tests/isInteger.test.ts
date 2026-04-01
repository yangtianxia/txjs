import { isInteger } from '../src/isInteger'

describe('isInteger', () => {
  test('returns true for positive integers', () => {
    expect(isInteger(0)).toBe(true)
    expect(isInteger(1)).toBe(true)
    expect(isInteger(10)).toBe(true)
    expect(isInteger(999)).toBe(true)
  })

  test('returns true for string integers', () => {
    expect(isInteger('0')).toBe(true)
    expect(isInteger('10')).toBe(true)
    expect(isInteger('122')).toBe(true)
  })

  test('returns false for non-integers', () => {
    expect(isInteger(3.1415926)).toBe(false)
    expect(isInteger(0.1)).toBe(false)
    expect(isInteger(-1)).toBe(false)
    expect(isInteger(-10)).toBe(false)
    expect(isInteger('3.14')).toBe(false)
    expect(isInteger('abc')).toBe(false)
    expect(isInteger(null)).toBe(false)
    expect(isInteger(undefined)).toBe(false)
  })
})
