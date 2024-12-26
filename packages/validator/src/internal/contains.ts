import type { ValidationRuleFunc } from '../schema'

export const contains: ValidationRuleFunc = (value, parma) => {
  return value.indexOf(parma) !== -1
}
