import { isSymbol } from '../src/isSymbol'

describe('isSymbol', () => {
  test('returns true for symbols', () => {
    const key = Symbol('key')
    expect(isSymbol(key)).toBe(true)
    expect(isSymbol(Symbol())).toBe(true)
  })

  test('returns false for non-symbols', () => {
    expect(isSymbol('key')).toBe(false)
    expect(isSymbol(123)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol({})).toBe(false)
  })
})
