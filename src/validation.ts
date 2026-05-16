import extend from 'extend'
import type { BaseTrigger, FieldType } from './types'

export type ValidationRuleFunc = (
  value: any,
  param?: any,
  type?: FieldType
) => boolean

export interface ValidationRule<Trigger> {
  type: any
  trigger?: Trigger
  validator: ValidationRuleFunc | ValidationRuleFunc[]
}

export type ValidationObject<Trigger> = Record<string, ValidationRule<Trigger>>

export class Validation<T extends ValidationObject<BaseTrigger>> {
  #defaults: T

  constructor(rules: T) {
    this.#defaults = rules
  }

  get value() {
    return this.#defaults
  }

  hasItem<K extends keyof T>(name: K) {
    return name in this.value
  }

  getItem<K extends keyof T>(name: K) {
    return this.value[name]
  }
}

export function createValidation<T extends ValidationObject<BaseTrigger>>(
  ...sources: T[]
) {
  return new Validation<T>(extend(true, ...sources))
}
