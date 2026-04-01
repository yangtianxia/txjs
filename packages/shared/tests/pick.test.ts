import { pick } from '../src/pick'

describe('pick', () => {
  test('picks specified keys from object', () => {
    const object = { a: 1, b: 2, c: 3 }
    expect(pick(object, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  test('picks keys ignoring nil values when ignore is true', () => {
    const object = { a: 1, b: undefined, c: null, d: 4 }
    expect(pick(object, ['a', 'b', 'c', 'd'], true)).toEqual({ a: 1, d: 4 })
  })

  test('picks keys including nil values when ignore is false', () => {
    const object = { a: 1, b: undefined, c: null, d: 4 }
    expect(pick(object, ['a', 'b', 'c', 'd'], false)).toEqual({ a: 1, b: undefined, c: null, d: 4 })
  })

  test('returns empty object when picking no keys', () => {
    const object = { a: 1, b: 2 }
    expect(pick(object, [])).toEqual({})
  })

  test('does not modify original object', () => {
    const object = { a: 1, b: 2 }
    pick(object, ['a'])
    expect(object).toEqual({ a: 1, b: 2 })
  })
})
