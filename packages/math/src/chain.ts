import type { ValueType } from './types'
import * as Implement from './base'

type ImplementType = keyof typeof Implement

const isNumberic = (value: any): value is number => (typeof value === 'number' && !isNaN(value)) || /^\d+(\.\d+)?$/.test(value)

export class Chain {
  private value = 0

  constructor (
    args?: ValueType | ValueType[],
    type?: ImplementType
  ) {
    this.value = this.__init(args, type)
  }

  private __exec(
    args: ValueType[],
    type: ImplementType
  ) {
    return args.reduce((ret, value) => {
      ret = Implement[type](ret, value)
      return ret
    }, this.value)
  }

  private __init(
    args?: ValueType | ValueType[],
    type?: ImplementType
  ) {
    if (typeof args === 'undefined') {
      args = [0]
    } else if (isNumberic(args)) {
      args = [args]
    }
    return this.__exec(args, type || 'addition')
  }

  multiply(multiplicand: ValueType) {
    this.value = Implement.multiply(this.value, multiplicand)
    return this
  }

  subtract(subtrahend: ValueType) {
    this.value = Implement.subtract(this.value, subtrahend)
    return this
  }

  addition(addend: ValueType) {
    this.value = Implement.addition(this.value, addend)
    return this
  }

  divide(divisor: ValueType) {
    this.value = Implement.divide(this.value, divisor)
    return this
  }

  getValue() {
    return this.value
  }
}