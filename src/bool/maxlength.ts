import type { ValidationRuleFunc } from '../validation'

export const maxlength: ValidationRuleFunc = (value, param) => {
  return value.length <= param
}
