/**
 * toAsync - 异步try-catch
 * - 解决异步方法try-catch问题
 */
export function toAsync<T, U = Error>(
	prom: Promise<T>,
	errorExt?: object
): Promise<[U, undefined] | [null, T]> {
	return prom
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((err: U) => {
			if (errorExt) {
				const parsedError = Object.assign({}, err, errorExt)
				return [parsedError, void 0]
			}
			return [err, void 0]
		})
}

export default toAsync