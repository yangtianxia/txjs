import { isInteger } from '@txjs/bool'
import type { RuleFn } from '../types'

export const integer: RuleFn = (value) => {
  return isInteger(value)
}
