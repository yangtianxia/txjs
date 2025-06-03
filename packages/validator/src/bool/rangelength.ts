import type { ValidationRuleFunc } from '../validation'
import { minlength } from './minlength'
import { maxlength } from './maxlength'

export const rangelength: ValidationRuleFunc = (value, param) => {
  return minlength(value, param[0]) && maxlength(value, param[1])
}
