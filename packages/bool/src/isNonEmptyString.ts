import { isString } from './isString'

/**
 * 检查 `value` 是否是长度不为0 `string` 类型
 *
 * @example
 * ```ts
 * isNonEmptyString(null)
 * // => false
 * isNonEmptyString('')
 * // => false
 * isNonEmptyString('hello world')
 * // => true
 * ```
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0
}
