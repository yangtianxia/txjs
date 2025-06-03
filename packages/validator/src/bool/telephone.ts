import { isPhone } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const telephone: ValidationRuleFunc = (value) => {
  return isPhone(value)
}
