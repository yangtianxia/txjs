import { isString } from './isString'

/**
 * 检查 `value` 是否是 `string` 类型，且不能是 `''` 文本
 *
 * @deprecated since version 1.1.0
 *
 * @example
 * ```ts
 * isValidString(null)
 * // => false
 * isValidString('')
 * // => false
 * isValidString('hello world')
 * // => true
 * ```
 */
export function isValidString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0
}
