import type { ValidationRuleFunc } from '../validation'
import { min } from './min'
import { max } from './max'

export const range: ValidationRuleFunc = (value, param) => {
  return min(value, param[0]) && max(value, param[1])
}
