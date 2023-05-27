import { isValidString } from '@txjs/bool'

/**
 * 字符串填充
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
export function padStr(target: string, value: string, index: number) {
	if (!isValidString(value)) {
		return target
	}

	return target
		.slice(0, index)
		.concat(value)
		.concat(
			target.slice(index, target.length)
		)
}