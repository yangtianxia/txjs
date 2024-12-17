/**
 * padString
 *
 * @example
 * ```ts
 * padString('txjs', '-', 2)
 * // => tx-js
 * padString('abc', '-', 0)
 * // => -abc
 * padString('abc', '-', -1)
 * // => ab-c
 * ```
 */
export function padString(text: string, value: string, index = 0) {
	if (index === 0) {
		return `${value}${text}`
	}
	return `${text.slice(0, index)}${value}${text.slice(index)}`
}
