import { isArray } from '@txjs/bool'

/**
 * toArray
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
export default function toArray<T>(item: T | T[]): T[] {
  return isArray(item) ? item : [item]
}
