import type { ValidationRuleFunc } from '../schema'

export const min: ValidationRuleFunc = (value, param) => {
  return value >= param
}
