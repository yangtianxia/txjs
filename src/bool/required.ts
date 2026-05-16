import { notNil, isString } from '@txjs/bool'
import { isNonEmptyArray } from '../utils'
import type { ValidationRuleFunc } from '../validation'

export const required: ValidationRuleFunc = (value, param, type) => {
  if (type === 'array') {
    return isNonEmptyArray(value)
  }
  if (isString(value)) {
    return value.trim().length > 0
  }
  return notNil(value)
}
