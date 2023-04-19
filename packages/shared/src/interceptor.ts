import { isPromise, isNil } from '@txjs/bool'
import { noop } from './noop'

export declare interface Interceptor {
	(...args: any[]): Promise<boolean> | boolean | undefined | void
}

/**
 * callIntercaptor
 *
 * @example
 * ```ts
 * const prom = new Promise((resolve) => {
 * 	setTimeout(() => {
 * 		resolve(true)
 * 	}, 1000)
 * })
 *
 * callInterceptor(prom, {
 * 	done() {
 * 		console.log('done')
 * 	},
 * 	canceled() {
 * 		console.log('canceled')
 * 	}
 * })
 * ```
 */
export const callInterceptor = (
	interceptor: Interceptor | undefined,
	{
		args = [],
		done,
		canceled
	}: {
		args?: any[]
		done: () => void
		canceled?: () => void
	}
) => {
	if (interceptor) {
		const returnVal = interceptor.apply(null, args)

		if (isPromise(returnVal)) {
			returnVal
				.then((confirm) => {
					if (confirm) {
						done()
					} else if (canceled) {
						canceled()
					}
				})
				.catch(noop)
		} else if (returnVal) {
			done()
		} else if (canceled) {
			canceled()
		}
	} else {
		done()
	}
}

/**
 * interceptorAll
 *
 * @example
 * ```ts
 * const prom = new Promise((resolve) => {
 * 	resolve(true)
 * })
 *
 * const fn = function () {
 * 	return false
 * }
 *
 * callInterceptor(interceptorAll, {
 * 	args: [[Interceptor, Interceptor, ...], ...args],
 *  done: () => {},
 *	canceled: () => {}
 * })
 * ```
 */
export const interceptorAll = (interceptors: Interceptor[], ...args: any[]) => {
	return new Promise<boolean>((resolve) => {
		Promise.all(
			interceptors.reduce(
				(tasks, interceptor) => {
					tasks.push(
						isNil(interceptor) ? Promise.resolve(true) : new Promise<boolean>((resolve) => {
							callInterceptor(interceptor, {
								args,
								done() {
									resolve(true)
								},
								canceled() {
									resolve(false)
								}
							})
						})
					)
					return tasks
				}, [] as Promise<boolean>[]
			)
		)
			.then((confirm) => {
				if (confirm.includes(false)) {
					resolve(false)
				} else {
					resolve(true)
				}
			})
	})
}