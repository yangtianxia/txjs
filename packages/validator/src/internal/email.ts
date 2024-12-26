import { isEmail } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const email: ValidationRuleFunc = (value) => {
  return isEmail(value)
}
