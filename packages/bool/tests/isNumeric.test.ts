import { isNumeric } from '../src/isNumeric'

describe('isNumeric', () => {
  describe('number type', () => {
    test('positive integers', () => {
      expect(isNumeric(3)).toBe(true)
      expect(isNumeric(0)).toBe(true)
      expect(isNumeric(100)).toBe(true)
    })

    test('negative numbers', () => {
      expect(isNumeric(-1)).toBe(true)
      expect(isNumeric(-99)).toBe(true)
    })

    test('decimal numbers', () => {
      expect(isNumeric(3.1415926)).toBe(true)
      expect(isNumeric(-99.99)).toBe(true)
      expect(isNumeric(0.1)).toBe(true)
    })
  })

  describe('string numeric values', () => {
    test('string integers', () => {
      expect(isNumeric('0')).toBe(true)
      expect(isNumeric('3')).toBe(true)
      expect(isNumeric('-1')).toBe(true)
    })

    test('string decimals', () => {
      expect(isNumeric('3.1415926')).toBe(true)
      expect(isNumeric('-99.99')).toBe(true)
    })
  })

  describe('non-numeric strings', () => {
    test('regular strings', () => {
      expect(isNumeric('hello')).toBe(false)
      expect(isNumeric('123abc')).toBe(false)
      expect(isNumeric('')).toBe(false)
    })

    test('strings with spaces', () => {
      expect(isNumeric(' 123')).toBe(false)
      expect(isNumeric('123 ')).toBe(false)
    })
  })

  describe('non-numeric types', () => {
    test('null and undefined', () => {
      expect(isNumeric(null)).toBe(false)
      expect(isNumeric(undefined)).toBe(false)
    })

    test('objects and arrays', () => {
      expect(isNumeric({})).toBe(false)
      expect(isNumeric([])).toBe(false)
      expect(isNumeric([1, 2, 3])).toBe(false)
    })
  })
})
