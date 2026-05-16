import { isNumeric } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const number: ValidationRuleFunc = (value) => {
  return isNumeric(value)
}
