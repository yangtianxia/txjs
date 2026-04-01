import { isLandline } from '../src/isLandline'

describe('isLandline', () => {
  describe('valid landline numbers', () => {
    test('with area code and dash', () => {
      expect(isLandline('0592-5966633')).toBe(true)
      expect(isLandline('010-12345678')).toBe(true)
    })

    test('with extension number', () => {
      expect(isLandline('0592-5966633-123')).toBe(true)
      expect(isLandline('010-12345678-456')).toBe(true)
    })

    test('with international prefix', () => {
      expect(isLandline('+86-0592-5966633')).toBe(true)
      expect(isLandline('+86-592-5966633')).toBe(false) // Missing leading zero in area code
    })
  })

  describe('invalid landline numbers', () => {
    test('mobile phone numbers', () => {
      expect(isLandline('13215666')).toBe(false)
      expect(isLandline('13566667777')).toBe(false)
    })

    test('incomplete numbers', () => {
      expect(isLandline('1234567')).toBe(false)
      expect(isLandline('12345678')).toBe(false)
    })

    test('random strings', () => {
      expect(isLandline('abcdefg')).toBe(false)
      expect(isLandline('hello')).toBe(false)
    })
  })

  describe('non-string types', () => {
    test('returns false for non-string inputs', () => {
      expect(isLandline(null)).toBe(false)
      expect(isLandline(undefined)).toBe(false)
      expect(isLandline(123)).toBe(false)
      expect(isLandline({})).toBe(false)
    })
  })
})
