import type { ValidationRuleFunc } from '../schema'

export const minlength: ValidationRuleFunc = (value, param) => {
  return value.length >= param
}
