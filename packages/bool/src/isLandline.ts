import { isString } from './isString'

const LANDLINE_REGEX = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/

/**
 * 检查 `value` 是否是座机号码
 *
 * @example
 * ```ts
 * isLandline('13215666')
 * // => false
 * isLandline('0592-5966633')
 * // => true
 * isLandline('0592-5966633-123')
 * // => true
 * ```
 */
export function isLandline(value: unknown): value is string {
	return isString(value) && LANDLINE_REGEX.test(value)
}
