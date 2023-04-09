import { isArray } from '@txjs/bool'

/**
 * 转为数组
 *
 * @example
 * ```ts
 * toArray([0])
 * // => [0]
 * toArray('abc')
 * // => ['abc']
 * toArray({})
 * // => [{}]
 * ```
 */
export function toArray<T,>(item: T | T[]): T[] {
  return isArray(item) ? item : [item]
}