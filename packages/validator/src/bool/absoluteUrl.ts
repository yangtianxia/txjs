import { isAbsoluteUrl } from '@txjs/bool'
import type { RuleFn } from '../types'

export const absoluteUrl: RuleFn = (value) => {
  return isAbsoluteUrl(value)
}
