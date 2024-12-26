import { isString } from './isString'

const PHONE_REGEX = /^1(3[0-9]|4[5-9]|5[0-3,5-9]|6[5-9]|7[0-6]|8[0-9]|9[1-9])\d{8}$/

const VIRTUAL_PHONE_REGEX = /^(170|171|177|178|190)\d{8}$/

/**
 * 检查 `value` 是否为手机号码（不包含虚拟号段）
 *
 * @example
 * ```ts
 * isNonVirtualPhone('13566667777')
 * // => true
 * isNonVirtualPhone('17012345678')
 * // => false (虚拟号段)
 * isNonVirtualPhone('17712345678')
 * // => false (虚拟号段)
 * isNonVirtualPhone('19012345678')
 * // => false (虚拟号段)
 * isNonVirtualPhone('13987654321')
 * // => true
 * ```
 */
export function isNonVirtualPhone(value: unknown): value is string {
	if (!isString(value)) {
		return false
	}
	if (VIRTUAL_PHONE_REGEX.test(value)) {
		return false
	}
  return PHONE_REGEX.test(value)
}
