import { isAbsoluteUrl } from '@txjs/bool'
import type { ValidationRuleFunc } from '../validation'

export const absoluteUrl: ValidationRuleFunc = (value) => {
  return isAbsoluteUrl(value)
}
