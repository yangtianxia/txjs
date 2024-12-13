const chunk = require('../dist/chunk').default

describe('chunk test', () => {
  test('chunk([1,2], 1)', () => {
    expect(chunk([1,2], 1)).toEqual([[1],[2]])
  })

  test('chunk([1,2,3,4,5,6], 2)', () => {
    expect(chunk([1,2,3,4,5,6], 2)).toEqual([[1,2],[3,4],[5,6]])
  })

  test('chunk([1,2,3,4,5,6], 4)', () => {
    expect(chunk([1,2,3,4,5,6], 4)).toEqual([[1,2,3,4], [5,6]])
  })
})