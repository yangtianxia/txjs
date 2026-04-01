import { isEmail } from '../src/isEmail'

describe('isEmail', () => {
  describe('valid emails', () => {
    test('standard email formats', () => {
      expect(isEmail('example@gmail.com')).toBe(true)
      expect(isEmail('user@domain.com')).toBe(true)
      expect(isEmail('test@example.org')).toBe(true)
    })

    test('emails with subdomains', () => {
      expect(isEmail('user@mail.domain.com')).toBe(true)
    })

    test('emails with plus sign', () => {
      expect(isEmail('user+tag@gmail.com')).toBe(true)
    })

    test('emails with dots in local part', () => {
      expect(isEmail('first.last@domain.com')).toBe(true)
    })
  })

  describe('invalid emails', () => {
    test('missing @ symbol', () => {
      expect(isEmail('example.com')).toBe(false)
      expect(isEmail('example')).toBe(false)
    })

    test('missing domain', () => {
      expect(isEmail('example@')).toBe(false)
      expect(isEmail('example@.com')).toBe(false)
    })

    test('missing local part', () => {
      expect(isEmail('@domain.com')).toBe(false)
    })

    test('empty string', () => {
      expect(isEmail('')).toBe(false)
    })
  })

  describe('non-string types', () => {
    test('returns false for non-string inputs', () => {
      expect(isEmail(null)).toBe(false)
      expect(isEmail(undefined)).toBe(false)
      expect(isEmail(123)).toBe(false)
      expect(isEmail({})).toBe(false)
    })
  })
})
