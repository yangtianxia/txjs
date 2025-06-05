import type { Numeric } from '@txjs/types'

export function makeNumeric(): Numeric | undefined
export function makeNumeric(defaultVal: Numeric): Numeric
export function makeNumeric(defaultVal: Numeric | undefined = void 0) {
  return defaultVal
}
