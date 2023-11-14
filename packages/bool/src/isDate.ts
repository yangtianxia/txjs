import { is } from './is'

/**
 * 检查 `value` 是否是日期
 *
 * @example
 * ```ts
 * isDate(new Date())
 * // => true
 * isDate('2012-10-06')
 * // => false
 * ```
 */
export function isDate(value: any): value is Date {
	return is<Date>(value, 'Date') && !Number.isNaN(value.getTime())
}
