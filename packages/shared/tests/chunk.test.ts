import { chunk } from '../src/chunk'

describe('chunk', () => {
  test('splits array into chunks of specified size', () => {
    expect(chunk([1, 2], 1)).toEqual([[1], [2]])
    expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  })

  test('handles last chunk smaller than size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 4)).toEqual([
      [1, 2, 3, 4],
      [5, 6],
    ])
  })

  test('handles size equal to array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
  })

  test('handles size larger than array length', () => {
    expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]])
  })

  test('handles empty array', () => {
    expect(chunk([], 2)).toEqual([])
  })

  test('handles size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  test('works with different types', () => {
    expect(chunk(['a', 'b', 'c'], 2)).toEqual([['a', 'b'], ['c']])
    expect(chunk([true, false, true], 2)).toEqual([[true, false], [true]])
  })
})
