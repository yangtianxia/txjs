import { isPromise } from '@txjs/bool'
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
		const returnVal = interceptor.call(null, args)

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