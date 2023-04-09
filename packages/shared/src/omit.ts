/**
 * omit
 *
 * @example
 * ```ts
 * const object = { a: 1, b: 2, c: 3 }
 *
 * omit(object, ['a', 'c'])
 * // => { b: 2 }
 * ```
 */
export function omit<T, K extends keyof T>(
  target: T,
  keys: ReadonlyArray<K>
) {
  const shallowCopy = Object.assign({}, target)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    delete shallowCopy[key]
  }
  return shallowCopy as Omit<T, K>
}