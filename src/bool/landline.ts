import { isLandline } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const landline: ValidationRuleFunc = (value) => {
  return isLandline(value)
}
