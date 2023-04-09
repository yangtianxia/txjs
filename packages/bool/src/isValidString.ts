import { isString } from './isString'

/**
 * 检查 `value` 是否 `string` 类型，且不能是 `''` 文本
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
  return isString(value) && value.trim() !== ''
}
