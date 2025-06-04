/**
 * forEachObject
 *
 * @example
 * ```ts
 * const obj = {a: 1, b: 1}
 *
 * forEachObject(obj, (key, value) => {
 *  console.lo(key, value)
 * })
 * ```
 */
export function forEachObject<T extends object, K extends keyof T>(
  object: T,
  iteratee: (key: K, value: T[K]) => void
) {
  const keys = Object.keys(object)
  let i = 0
  while (i < keys.length) {
    const key = keys[i] as K
    iteratee(key, object[key])
    i++
  }
}
