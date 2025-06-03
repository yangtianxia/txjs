import type { ValueType } from './types'
import * as methods from './base'

type MethodType = keyof typeof methods

const isNumberic = (value: any): value is number =>
  (typeof value === 'number' && !Number.isNaN(value)) ||
  /^\d+(\.\d+)?$/.test(value)

export class Chain {
  private value = 0

  constructor(args?: ValueType | ValueType[], type?: MethodType) {
    this.value = this.__init(args, type)
  }

  private __exec(args: ValueType[], type: MethodType) {
    return args.reduce((ret, value) => {
      ret = (methods as any)[type](ret, value)
      return ret
    }, this.value)
  }

  private __init(args?: ValueType | ValueType[], type?: MethodType) {
    if (typeof args === 'undefined') {
      args = [0]
    } else if (isNumberic(args)) {
      args = [args]
    }
    return this.__exec(args, type || 'addition')
  }

  multiply(multiplicand: ValueType) {
    this.value = methods.multiply(this.value, multiplicand)
    return this
  }

  subtract(subtrahend: ValueType) {
    this.value = methods.subtract(this.value, subtrahend)
    return this
  }

  addition(addend: ValueType) {
    this.value = methods.addition(this.value, addend)
    return this
  }

  divide(divisor: ValueType) {
    this.value = methods.divide(this.value, divisor)
    return this
  }

  getValue() {
    return this.value
  }
}
