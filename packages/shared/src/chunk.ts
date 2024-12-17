/**
 * chunk
 *
 * @example
 * ```ts
 * chunk([1,2], 1)
 * // => [[1],[2]]
 * chunk([1,2,3,4,5,6], 2)
 * // => [[1,2],[3,4],[5,6]]
 * camelize([1,2,3,4,5,6], 4)
 * // => [[1,2,3,4], [5,6]]
 * ```
 */
export function chunk<T>(data: T[] = [], size: number) {
  const result = [] as T[][]
  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size))
  }
  return result
}
