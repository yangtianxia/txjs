import { isHttpUrl } from '@txjs/bool'
import type { RuleFn } from '../types'

export const httpUrl: RuleFn = (value) => {
  return isHttpUrl(value)
}
