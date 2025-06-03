import clone from 'shallow-clone'
import { notNil, isFunction, isPlainObject, isArray } from '@txjs/bool'

type InstanceClone<T> = true | ((value: T) => T)

function cloneObjectDeep<T>(value: any, instanceClone?: InstanceClone<T>) {
  if (isFunction(instanceClone)) {
    return instanceClone(value)
  }
  if (instanceClone || isPlainObject(value)) {
    const shallowCopy = notNil(value.constructor)
      ? new value.constructor()
      : Object.create(null)
    for (const key in value) {
      shallowCopy[key] = cloneDeep(value[key], instanceClone)
    }
    return shallowCopy
  }
  return value
}

function cloneArrayDeep<T>(value: any, instanceClone?: InstanceClone<T>) {
  const shallowCopy = new value.constructor(value.length)
  for (let i = 0, len = value.length; i < len; i++) {
    shallowCopy[i] = cloneDeep(value[i], instanceClone)
  }
  return shallowCopy
}

/**
 * cloneDeep
 *
 * @example
 * ```ts
 * cloneDeep([1, 2])
 * => [1, 2]
 * cloneDeep({a: 1, b: 2})
 * => {a: 1, b: 2}
 * ```
 */
export function cloneDeep<T>(value: T, instanceClone?: InstanceClone<T>): T {
  if (isPlainObject(value)) {
    return cloneObjectDeep(value, instanceClone)
  }
  if (isArray(value)) {
    return cloneArrayDeep(value, instanceClone)
  }
  return clone(value)
}
