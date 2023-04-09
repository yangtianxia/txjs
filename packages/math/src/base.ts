import type { ValueType } from './types'

/** 乘法 */
export const multiply = (
  multiplier: ValueType,
  multiplicand: ValueType
) => {
  let cardinality = 0
  const _multiplier = multiplier.toString()
  const _multiplicand = multiplicand.toString()

  try {
    cardinality += _multiplier.split('.')[1].length
  } catch {
    /** ignore */
  }

  try {
    cardinality += _multiplicand.split('.')[1].length
  } catch {
    /** ignore */
  }

  return Number(_multiplier.replace('.', '')) * Number(_multiplicand.replace('.', '')) / Math.pow(10, cardinality)
}

/** 减法 */
export const subtract = (
  minuend: ValueType,
  subtrahend: ValueType
) => {
  let _minuend = 0
  let _subtrahend = 0

  try {
    _minuend = minuend.toString().split('.')[1].length
  } catch {
    /** ignore */
  }

  try {
    _subtrahend = subtrahend.toString().split('.')[1].length
  } catch {
    /** ignore */
  }

  const cardinality = Math.pow(10, Math.max(_minuend, _subtrahend))

  return (multiply(minuend, cardinality) - multiply(subtrahend, cardinality)) / cardinality
}

/** 加法 */
export const addition = (
  augend: ValueType,
  addend: ValueType
) => {
  let _augend = 0
  let _addend = 0

  try {
    _augend = augend.toString().split('.')[1].length
  } catch {
    /** ignore */
  }

  try {
    _addend = addend.toString().split('.')[1].length
  } catch {
    /** ignore */
  }

  const cardinality = Math.pow(10, Math.max(_augend, _addend))

  return (multiply(augend, cardinality) + multiply(addend, cardinality)) / cardinality
}

/** 除法 */
export const divide = (
  dividend: ValueType,
  divisor: ValueType
) => {
  let _dividend = 0
  let _divisor = 0
  const __dividend = dividend.toString()
  const __divisor = divisor.toString()

  try {
    _dividend = __dividend.split('.')[1].length
  } catch {
    /** ignore */
  }

  try {
    _divisor = __divisor.split('.')[1].length
  } catch {
    /** ignore */
  }

  return multiply(
    Number(__dividend.replace('.', '')) / Number(__divisor.replace('.', '')),
    Math.pow(10, _divisor - _dividend)
  )
}