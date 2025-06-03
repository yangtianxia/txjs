import { isPlainObject } from './isPlainObject'

/**
 * 检查 `value` 是否不为空对象
 *
 * @example
 * ```ts
 * isNonEmptyObject({})
 * // => false
 * isNonEmptyObject({a: 'text1'})
 * // => true
 * ```
 */
export function isNonEmptyObject<T>(
  value: T
): value is T extends Record<any, any> ? T : never {
  return isPlainObject(value) && Object.keys(value).length !== 0
}
