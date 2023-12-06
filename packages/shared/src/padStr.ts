/**
 * padStr - 字符串拼接
 *
 * @example
 * ```ts
 * padStr('abc', '-', 1)
 * // => a-bc
 * padStr('abc', '-', 0)
 * // => -abc
 * padStr('abc', '-', -1)
 * // => ab-c
 * ```
 */
export function padStr(text: string, value: string, index = 0) {
	if (index === 0) {
		return `${value}${text}`
	}

	return `${text.slice(0, index)}${value}${text.slice(index)}`
}
