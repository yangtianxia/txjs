import { isNumber } from './isNumber'

const INTEGER_REGEX = /^(?:0|(?:[1-9]\d*))$/

/**
 * 检查 `value` 是否是正整数，包含 `0`
 *
 * @example
 * ```ts
 * isInteger(10)
 * // => true
 * isInteger('122')
 * // => true
 * isInteger(3.1415926)
 * // => false
 * isInteger(0.1)
 * // => false
 * ```
 */
export function isInteger(value: unknown): value is number {
	if (isNumber(value) && Number.isInteger(value) && value >= 0) {
		return true
	}
	if (typeof value === 'string' && INTEGER_REGEX.test(value)) {
		return true
	}
  return false
}
