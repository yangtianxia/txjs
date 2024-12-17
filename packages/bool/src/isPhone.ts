const PHONE_REGEX = /^1[3-9]\d{9}$/

/**
 * 检查 `value` 是否是手机号码（包含虚拟号段）
 *
 * @example
 * ```ts
 * isPhone('13566667777')
 * // => true
 * isPhone('134666565')
 * // => false
 * ```
 */
export function isPhone(value: unknown): value is string {
  return typeof value === 'string' && PHONE_REGEX.test(value)
}
