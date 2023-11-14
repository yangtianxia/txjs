import { isNumber } from './isNumber'

/**
 * 检查 `value` 是否是 `number` 类型，支持字符串校验
 *
 * @example
 * ```ts
 * isNumeric(3) // true
 * isNumeric('3.1415926') // true
 * ```
 */
export function isNumeric(value: any): value is number {
	return isNumber(value) || /^(\d|-\d)+(\.\d+)?$/.test(value)
}
