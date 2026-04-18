import { isEmail } from '@txjs/bool'
import type { RuleFn } from '../types'

export const email: RuleFn = (value) => {
  return isEmail(value)
}
