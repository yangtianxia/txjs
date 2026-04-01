import { isEqual } from '../src/isEqual'

describe('isEqual', () => {
  describe('primitive types', () => {
    test('compares booleans', () => {
      expect(isEqual(true, false)).toBe(false)
      expect(isEqual(false, false)).toBe(true)
      expect(isEqual(true, true)).toBe(true)
    })

    test('compares numbers', () => {
      expect(isEqual(0, 0)).toBe(true)
      expect(isEqual(1, 1)).toBe(true)
      expect(isEqual(-1, 1)).toBe(false)
      expect(isEqual(0.1, 0.1)).toBe(true)
    })

    test('compares strings', () => {
      expect(isEqual('0', '1')).toBe(false)
      expect(isEqual('hello', 'hello')).toBe(true)
      expect(isEqual('', '')).toBe(true)
    })

    test('compares null and undefined', () => {
      expect(isEqual(null, null)).toBe(true)
      expect(isEqual(undefined, undefined)).toBe(true)
      expect(isEqual(null, undefined)).toBe(false)
    })

    test('compares symbols', () => {
      expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false) // different references
      const sym = Symbol('a')
      expect(isEqual(sym, sym)).toBe(true) // same reference
    })
  })

  describe('arrays', () => {
    test('compares empty arrays', () => {
      expect(isEqual([], [])).toBe(true)
    })

    test('compares arrays with same elements', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    })

    test('compares arrays with different elements', () => {
      expect(isEqual([0, {}], [1, {}])).toBe(false)
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false)
    })

    test('compares nested arrays', () => {
      expect(
        isEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 4],
          ]
        )
      ).toBe(true)
      expect(
        isEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 5],
          ]
        )
      ).toBe(false)
    })
  })

  describe('objects', () => {
    test('compares empty objects', () => {
      expect(isEqual({}, {})).toBe(true)
    })

    test('compares objects with same properties', () => {
      expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    })

    test('compares objects with different properties', () => {
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
      expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
    })

    test('compares objects with different key counts', () => {
      expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    })

    test('compares nested objects', () => {
      expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true)
      expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(
        false
      )
    })
  })

  describe('dates', () => {
    test('compares different dates', () => {
      expect(isEqual(new Date('2013-06-12'), new Date('2023-06-12'))).toBe(
        false
      )
    })

    test('compares same dates', () => {
      expect(isEqual(new Date('2023-06-12'), new Date('2023-06-12'))).toBe(true)
    })

    test('compares date with non-date', () => {
      expect(isEqual(new Date('2023-06-12'), '2023-06-12')).toBe(false)
    })
  })

  describe('regex', () => {
    test('compares same pattern regex', () => {
      expect(isEqual(/^\s+/, /^\s+/)).toBe(true)
    })

    test('compares different pattern regex', () => {
      expect(isEqual(/^\s+/, /^\S+/)).toBe(false)
    })

    test('compares regex with different flags', () => {
      expect(isEqual(/^\s+/i, /^\s+/)).toBe(false)
    })
  })

  describe('mixed types', () => {
    test('compares primitive with wrapper', () => {
      expect(isEqual(1, new Number(1))).toBe(false)
    })
  })
})
