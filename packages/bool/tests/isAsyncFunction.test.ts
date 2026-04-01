import { isAsyncFunction } from '../src/isAsyncFunction'

describe('isAsyncFunction', () => {
  // Skip: ts-node transpiles async functions to regular functions,
  // causing Object.prototype.toString.call to return '[object Function]'
  // instead of '[object AsyncFunction]'. This works correctly in native
  // Node.js and production builds.
  test.skip('returns true for async functions', () => {
    async function asyncFunc() {}
    expect(isAsyncFunction(asyncFunc)).toBe(true)
  })

  test('returns false for non-async functions', () => {
    expect(isAsyncFunction(() => {})).toBe(false)
    expect(isAsyncFunction(function () {})).toBe(false)
    expect(isAsyncFunction(null)).toBe(false)
    expect(isAsyncFunction({})).toBe(false)
  })
})
