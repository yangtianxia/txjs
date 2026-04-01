import { noop } from '../src/noop'

describe('noop', () => {
  test('does nothing and returns undefined', () => {
    const result = noop()
    expect(result).toBeUndefined()
  })
})
