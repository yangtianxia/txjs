import type { ValidationRuleFunc } from '../validation'

export const minlength: ValidationRuleFunc = (value, param) => {
  return value.length >= param
}
