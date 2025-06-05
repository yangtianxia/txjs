import { notNil } from '@txjs/bool'
import type { Writeable } from '@txjs/types'

/**
 * pick
 *
 * @example
 * ```ts
 * const object = {a: 1, b: 2, c: 3}
 *
 * pick(object, ['a', 'c'])
 * // => {a: 1, c: 3}
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  target: T,
  keys: ReadonlyArray<K>,
  ignore?: boolean
) {
  return keys.reduce(
    (ret, key) => {
      if (!ignore || notNil(target[key])) {
        ret[key] = target[key]
      }
      return ret
    },
    {} as Writeable<Pick<T, K>>
  )
}
