import type { ValidationRuleFunc } from '../schema'
import { minlength } from './minlength'
import { maxlength } from './maxlength'

export const rangelength:ValidationRuleFunc = (value, param) => {
  return minlength(value, param[0]) && maxlength(value, param[1])
}
