import { is } from './is'

/**
 * 检查 `value` 是否是 `promise` 类型
 *
 * @example
 * ```ts
 * isPromise(Promise.resolve())
 * // => true
 * isPromise(function() {})
 * // => false
 * ```
 */
export function isPromise<T>(value: T): value is T extends Promise<any> ? T : never {
  return is(value, 'Promise')
}