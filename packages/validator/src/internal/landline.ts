import { isLandline } from '@txjs/bool'
import type { ValidationRuleFunc } from '../schema'

export const landline: ValidationRuleFunc = (value) => {
  return isLandline(value)
}
