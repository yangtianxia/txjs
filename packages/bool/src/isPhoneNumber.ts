const PHONE_NUMBER_REGEX = /^1[3-9]\d{9}$/

/**
 * 检查 `value` 是否是手机号码（包含虚拟号段）
 *
 * @deprecated since version 1.1.0
 *
 * @example
 * ```ts
 * isPhoneNumber('13566667777')
 * // => true
 * isPhoneNumber('4666565')
 * // => false
 * ```
 */
export function isPhoneNumber(value: unknown): value is string {
  return typeof value === 'string' && PHONE_NUMBER_REGEX.test(value)
}
