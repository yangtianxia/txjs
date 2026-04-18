import { notNil, isString } from '@txjs/bool'
import { isNonEmptyArray } from '../utils'
import type { RuleFn } from '../types'

export const required: RuleFn = (value, param, type) => {
  if (type === 'array') {
    return isNonEmptyArray(value)
  }
  if (isString(value)) {
    return value.trim().length > 0
  }
  return notNil(value)
}
