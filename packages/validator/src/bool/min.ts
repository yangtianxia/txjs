import type { ValidationRuleFunc } from '../validation'

export const min: ValidationRuleFunc = (value, param) => {
  return value >= param
}
