const cloneDeep = require('../dist/cloneDeep').default

describe('cloneDeep test', () => {
  test('cloneDeep([1,2])', () => {
    expect(cloneDeep([1,2])).toEqual([1,2])
  })

  test('cloneDeep({a: 1, b: 2})', () => {
    expect(cloneDeep({a: 1, b: 2})).toEqual({a: 1, b: 2})
  })
})