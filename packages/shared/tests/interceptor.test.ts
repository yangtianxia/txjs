import { callInterceptor } from '../src/interceptor'
import { interceptorAll } from '../src/interceptorAll'

describe('callInterceptor', () => {
  test('calls done when interceptor returns true', () => {
    const done = jest.fn()
    const canceled = jest.fn()
    callInterceptor(() => true, { done, canceled })
    expect(done).toHaveBeenCalled()
    expect(canceled).not.toHaveBeenCalled()
  })

  test('calls canceled when interceptor returns false', () => {
    const done = jest.fn()
    const canceled = jest.fn()
    callInterceptor(() => false, { done, canceled })
    expect(done).not.toHaveBeenCalled()
    expect(canceled).toHaveBeenCalled()
  })

  test('calls done when no interceptor provided', () => {
    const done = jest.fn()
    const canceled = jest.fn()
    callInterceptor(undefined, { done, canceled })
    expect(done).toHaveBeenCalled()
    expect(canceled).not.toHaveBeenCalled()
  })
})

describe('interceptorAll', () => {
  test('returns true when all interceptors return true', async () => {
    const result = await interceptorAll([
      async () => true,
      async () => true,
      () => Promise.resolve(true),
    ])
    expect(result).toBe(true)
  })

  test('returns false when any interceptor returns false', async () => {
    const result = await interceptorAll([
      async () => true,
      () => false,
      () => Promise.resolve(true),
    ])
    expect(result).toBe(false)
  })

  test('returns false when interceptor returns undefined', async () => {
    const result = await interceptorAll([
      async () => true,
      () => {},
      () => Promise.resolve(true),
    ])
    expect(result).toBe(false)
  })

  test('handles empty array', async () => {
    const result = await interceptorAll([])
    expect(result).toBe(true)
  })

  test('handles mix of sync and async interceptors', async () => {
    const result = await interceptorAll([
      async () => true,
      () => true,
      () => Promise.resolve(true),
    ])
    expect(result).toBe(true)
  })
})
