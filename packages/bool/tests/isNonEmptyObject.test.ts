import { isNonEmptyObject } from '../src/isNonEmptyObject'

describe('isNonEmptyObject', () => {
  describe('valid non-empty objects', () => {
    test('objects with properties', () => {
      expect(isNonEmptyObject({ a: 'text1' })).toBe(true)
      expect(isNonEmptyObject({ key: 'value' })).toBe(true)
      expect(isNonEmptyObject({ a: 1, b: 2, c: 3 })).toBe(true)
    })

    test('nested objects', () => {
      expect(isNonEmptyObject({ a: { b: { c: 1 } } })).toBe(true)
    })

    test('objects with various value types', () => {
      expect(isNonEmptyObject({ a: null })).toBe(true)
      expect(isNonEmptyObject({ a: undefined })).toBe(true)
      expect(isNonEmptyObject({ a: [] })).toBe(true)
    })
  })

  describe('empty objects (should return false)', () => {
    test('empty plain objects', () => {
      expect(isNonEmptyObject({})).toBe(false)
    })
  })

  describe('non-objects (should return false)', () => {
    test('primitives', () => {
      expect(isNonEmptyObject('string')).toBe(false)
      expect(isNonEmptyObject(123)).toBe(false)
      expect(isNonEmptyObject(true)).toBe(false)
      expect(isNonEmptyObject(null)).toBe(false)
      expect(isNonEmptyObject(undefined)).toBe(false)
    })

    test('arrays', () => {
      expect(isNonEmptyObject([])).toBe(false)
      expect(isNonEmptyObject([1, 2, 3])).toBe(false)
    })

    test('other built-in objects', () => {
      expect(isNonEmptyObject(new Date())).toBe(false)
      expect(isNonEmptyObject(new RegExp('test'))).toBe(false)
    })
  })
})
