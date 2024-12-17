import { is } from './is'

/**
 * 检查 `value` 是否是 `Date` 类型
 *
 * @example
 * ```ts
 * isDate(new Date())
 * // => true
 * isDate('2012-10-06')
 * // => false
 * ```
 */
export function isDate(value: unknown): value is Date {
	return is<Date>(value, 'Date') && !Number.isNaN(value.getTime())
}
