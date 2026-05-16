import { isEmail } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const email: ValidationRuleFunc = (value) => {
  return isEmail(value)
}
