type Numeric = number | string

export function makeNumeric(): Numeric | undefined
export function makeNumeric(defaultVal: Numeric): Numeric
export function makeNumeric(defaultVal?: Numeric) {
  return defaultVal
}