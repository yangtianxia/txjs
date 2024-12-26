import type { ValidationRuleFunc } from '../schema'

export const maxlength: ValidationRuleFunc = (value, param) => {
  return value.length <= param
}
