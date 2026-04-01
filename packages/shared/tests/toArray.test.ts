import { toArray } from '../src/toArray'

describe('toArray', () => {
  test('returns empty array for nil values', () => {
    expect(toArray()).toEqual([])
    expect(toArray(undefined)).toEqual([])
    expect(toArray(null)).toEqual([])
  })

  test('returns array as-is if already array', () => {
    expect(toArray([0])).toEqual([0])
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(toArray([])).toEqual([])
  })

  test('wraps non-array values in array', () => {
    expect(toArray('abc')).toEqual(['abc'])
    expect(toArray({})).toEqual([{}])
    expect(toArray(123)).toEqual([123])
    expect(toArray(true)).toEqual([true])
  })
})
