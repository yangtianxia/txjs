/**
 * 检查 `value` 是否是手机号码，包含虚拟号段
 *
 * @example
 * ```ts
 * isPhoneNumber('13566667777')
 * // => true
 * isPhoneNumber('4666565')
 * // => false
 * ```
 */
export function isPhoneNumber(value: any): value is string {
	if (typeof value !== 'string') {
		return false
	}

  return /^1[3-9]\d{9}$/.test(value)
}
