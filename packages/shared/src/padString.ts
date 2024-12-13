/**
 *
 * padString
 *
 * @example
 * ```ts
 * padStr('txjs', '-', 2)
 * // => tx-js
 * padStr('abc', '-', 0)
 * // => -abc
 * padStr('abc', '-', -1)
 * // => ab-c
 * ```
 */
export default function padStr(text: string, value: string, index = 0) {
	if (index === 0) {
		return `${value}${text}`
	}
	return `${text.slice(0, index)}${value}${text.slice(index)}`
}
