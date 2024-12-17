const { callInterceptor } = require('../dist/interceptor')
const { interceptorAll } = require('../dist/interceptorAll')

describe('interceptor test', () => {
  test('callInterceptor canceled', async () => {
    await expect(callInterceptor(async () => {
      return false
    }, {
      done() {
        console.log('done')
      },
      canceled() {
        console.log('canceled')
      }
    })).toBe()
  })

  test('callInterceptor done', async () => {
    await expect(callInterceptor(async () => {
      return true
    }, {
      done() {
        console.log('done')
      },
      canceled() {
        console.log('canceled')
      }
    })).toBe()
  })

  test('interceptorAll true', async () => {
    await expect(interceptorAll([
      async () => {
        return true
      },
      () => {
        return new Promise((resolve) => {
          resolve(true)
        })
      }
    ])).resolves.toBe(true)
  })

  test('interceptorAll false', async () => {
    await expect(interceptorAll([
      async () => {
        return true
      },
      () => {},
      () => {
        return new Promise((resolve) => {
          resolve(true)
        })
      }
    ])).resolves.toBe(false)
  })
})