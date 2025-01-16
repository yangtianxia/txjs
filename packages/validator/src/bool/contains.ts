import type { ValidationRuleFunc } from '../validation'

export const contains: ValidationRuleFunc = (value, parma) => {
  return value.indexOf(parma) !== -1
}
