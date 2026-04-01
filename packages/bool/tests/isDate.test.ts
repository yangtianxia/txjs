import { isDate } from '../src/isDate'

describe('isDate', () => {
  test('returns true for valid dates', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2023-06-12'))).toBe(true)
    expect(isDate(new Date('2023-01-01'))).toBe(true)
  })

  test('returns false for invalid dates', () => {
    expect(isDate('2012-10-06')).toBe(false)
    expect(isDate(123456)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate({})).toBe(false)
  })

  test('returns false for Invalid Date', () => {
    expect(isDate(new Date('invalid'))).toBe(false)
  })
})
