import { notNil } from '@txjs/bool'

type Writeable<T> = {
  -readonly [P in keyof T]: T[P]
}

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
  const ret = {} as Writeable<Pick<T, K>>
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    if (!ignore || notNil(target[key])) {
      ret[key] = target[key]
    }
  }
  return ret
}
