import { is } from '../src/is'

describe('is', () => {
  test('detects Array', () => {
    expect(is([], 'Array')).toBe(true)
  })

  test('detects Object', () => {
    expect(is({}, 'Object')).toBe(true)
  })

  test('detects Number', () => {
    expect(is(1, 'Number')).toBe(true)
    expect(is(0, 'Number')).toBe(true)
    expect(is(-1.5, 'Number')).toBe(true)
  })

  test('detects Undefined', () => {
    expect(is(undefined, 'Undefined')).toBe(true)
  })

  test('detects Null', () => {
    expect(is(null, 'Null')).toBe(true)
  })

  test('detects Symbol', () => {
    expect(is(Symbol('key'), 'Symbol')).toBe(true)
  })

  test('detects String', () => {
    expect(is('hello', 'String')).toBe(true)
    expect(is('', 'String')).toBe(true)
  })

  test('detects Boolean', () => {
    expect(is(true, 'Boolean')).toBe(true)
    expect(is(false, 'Boolean')).toBe(true) // Both true and false are 'Boolean' type
  })

  test('returns false for type mismatch', () => {
    expect(is('123', 'Number')).toBe(false)
    expect(is(123, 'String')).toBe(false)
    expect(is({}, 'Array')).toBe(false)
  })
})
