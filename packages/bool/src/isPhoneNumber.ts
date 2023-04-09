const reg = /\s+/g

/**
 * 检查 `value` 是否是手机号码，支持虚拟号段
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

	if (reg.test(value)) {
		value = value.replace(reg, '')
	}

  return /^1[3-9]\d{9}$/.test(value)
}