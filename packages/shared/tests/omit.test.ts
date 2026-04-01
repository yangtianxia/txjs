import { omit } from '../src/omit'

describe('omit', () => {
  test('omits specified keys from object', () => {
    const object = { a: 1, b: 2, c: 3 }
    expect(omit(object, ['a', 'c'])).toEqual({ b: 2 })
  })

  test('returns empty object when omitting all keys', () => {
    const object = { a: 1, b: 2 }
    expect(omit(object, ['a', 'b'])).toEqual({})
  })

  test('returns copy of object when no keys omitted', () => {
    const object = { a: 1 }
    expect(omit(object, [])).toEqual({ a: 1 })
  })

  test('does not modify original object', () => {
    const object = { a: 1, b: 2, c: 3 }
    omit(object, ['a'])
    expect(object).toEqual({ a: 1, b: 2, c: 3 })
  })
})
