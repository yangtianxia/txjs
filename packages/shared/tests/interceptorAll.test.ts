import { interceptorAll } from '../src/interceptorAll'

describe('interceptorAll', () => {
  test('resolves to true when all interceptors return true', async () => {
    const interceptors = [
      () => true,
      () => true,
      () => true,
    ]

    const result = await interceptorAll(interceptors, 'arg1', 'arg2')
    expect(result).toBe(true)
  })

  test('resolves to false when any interceptor returns false', async () => {
    const interceptors = [
      () => true,
      () => false,
      () => true,
    ]

    const result = await interceptorAll(interceptors)
    expect(result).toBe(false)
  })

  test('resolves to false when first interceptor returns undefined', async () => {
    const interceptors = [() => {}]

    const result = await interceptorAll(interceptors)
    expect(result).toBe(false)
  })

  test('stops processing after first interceptor cancels', async () => {
    let secondInterceptorCalled = false
    const interceptors = [
      () => {},
      () => {
        secondInterceptorCalled = true
        return true
      },
    ]

    const result = await interceptorAll(interceptors)
    expect(result).toBe(false)
    expect(secondInterceptorCalled).toBe(false)
  })

  test('handles async interceptors', async () => {
    const interceptors = [
      async () => true,
      async () => true,
    ]

    const result = await interceptorAll(interceptors)
    expect(result).toBe(true)
  })

  test('handles mixed sync and async interceptors', async () => {
    const interceptors = [
      () => true,
      async () => true,
      () => true,
    ]

    const result = await interceptorAll(interceptors)
    expect(result).toBe(true)
  })

  test('handles empty interceptors array', async () => {
    const result = await interceptorAll([])
    expect(result).toBe(true)
  })
})
