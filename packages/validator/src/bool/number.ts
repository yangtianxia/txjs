import { isNumeric } from '@txjs/bool'
import type { RuleFn } from '../types'

export const number: RuleFn = (value) => {
  return isNumeric(value)
}
