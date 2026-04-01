import { isPhoneNumber } from '../src/isPhoneNumber'

describe('isPhoneNumber', () => {
  test('returns true for valid phone numbers', () => {
    expect(isPhoneNumber('13566667777')).toBe(true)
    expect(isPhoneNumber('13812345678')).toBe(true)
  })

  test('returns false for invalid phone numbers', () => {
    expect(isPhoneNumber('4666565')).toBe(false)
    expect(isPhoneNumber('abc')).toBe(false)
    expect(isPhoneNumber('')).toBe(false)
    expect(isPhoneNumber(null)).toBe(false)
  })
})
