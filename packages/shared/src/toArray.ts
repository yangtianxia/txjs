import { isNil, isArray } from '@txjs/bool'

/**
 * toArray
 *
 * @example
 * ```ts
 * toArray()
 * // => []
 * toArray([0])
 * // => [0]
 * toArray('abc')
 * // => ['abc']
 * toArray({})
 * // => [{}]
 * ```
 */
export function toArray<T>(item?: T | T[]): T[] {
  if (isNil(item)) {
    return []
  }
  return isArray(item) ? item : [item]
}
