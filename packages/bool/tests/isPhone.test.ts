import { isPhone } from '../src/isPhone'

describe('isPhone', () => {
  test('returns true for valid phone numbers', () => {
    expect(isPhone('13566667777')).toBe(true)
    expect(isPhone('13812345678')).toBe(true)
    expect(isPhone('19912345678')).toBe(true)
  })

  test('returns false for invalid phone numbers', () => {
    expect(isPhone('134666565')).toBe(false)
    expect(isPhone('12345678901')).toBe(false)
    expect(isPhone('abc')).toBe(false)
    expect(isPhone('')).toBe(false)
    expect(isPhone(null)).toBe(false)
    expect(isPhone(undefined)).toBe(false)
    expect(isPhone(13566667777)).toBe(false) // number, not string
  })
})
