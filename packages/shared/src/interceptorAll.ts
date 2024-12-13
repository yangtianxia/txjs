import callInterceptor, { type Interceptor } from './interceptor'

/**
 * interceptorAll
 *
 * @example
 * ```ts
 * const a = '1'
 * const b = '2'
 *
 * const prom = function(a, b) {
 * 	return new Promise((resolve) => {
 * 		// a = 1
 * 		// b = 2
 * 		resolve(true)
 * 	})
 * }
 *
 * const fn = function () {
 * 	// a = 1
 * 	// b = 2
 * 	return false
 * }
 *
 * callInterceptor(interceptorAll, {
 * 	args: [[prom, fn], a, b],
 * 	done: () => {},
 * 	canceled: () => {}
 * })
 * ```
 */
export default function interceptorAll(interceptors: Interceptor[], ...args: any[]) {
	return new Promise<boolean>((resolve) => {
		let state = true
		interceptors
			.reduce(
				(promise, interceptor) =>
					promise.then(() => {
						if (state && interceptor) {
							return new Promise((childResolve) => {
								callInterceptor(interceptor, {
									args,
									done() {
										childResolve()
									},
									canceled() {
										state = false
										childResolve()
									}
								})
							})
						}
					}),
				Promise.resolve()
			)
			.then(() => {
				resolve(state)
			})
	})
}
