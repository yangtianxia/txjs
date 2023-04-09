import { isNil, isString, isPhoneNumber, isInteger, isURL } from '@txjs/bool'

export { isPhoneNumber as telephone, isInteger as integer, isURL as url }

/**
 * 必填项
 *
 * @example
 * ```ts
 * required(null)
 * // => false
 * required('')
 * // => false
 * required(void 0)
 * // => false
 * required(true)
 * // => true
 * required(false)
 * // => true
 * required(0)
 * // => true
 * ```
 */
export const required = (value: any, _: any, type: string) => {
  if (type === 'array') {
    return !!(value ?? []).length
  } else if (isNil(value)) {
    return !1
  } else if (isString(value)) {
    return !value.match(/^[ ]*$/)
  } else {
    return !0
  }
}

/**
 * 数字项，正则校验
 *
 * @example
 * ```ts
 * number(null)
 * // => false
 * number('1.2')
 * // => true
 * number(-1)
 * // => true
 * ```
 */
export const number = (value: any) => {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 包含项
 *
 * @example
 * ```ts
 * contains('hello world', 'hello')
 * // => true
 * contains('123', '5')
 * // => false
 * ```
 */
export const contains = (value: any, parma: any) => {
  return value.indexOf(parma) !== -1
}

/**
 * 最小长度
 *
 * @example
 * ```ts
 * minlength('hello', 10)
 * // => false
 * minlength('hello', 2)
 * // => true
 * ```
 */
export const minlength = (value: string, param: number) => {
  return value.length >= param
}

/**
 * 最大长度
 *
 * @example
 * ```ts
 * maxlength('hello', 10)
 * // => true
 * maxlength('hello', 2)
 * // => false
 * ```
 */
export const maxlength = (value: string, param: number) => {
  return value.length <= param
}

/**
 * 区间长度
 *
 * @example
 * ```ts
 * rangelength('hello', [5, 10])
 * // => true
 * rangelength('hello' [2, 10])
 * // => false
 * ```
 */
export const rangelength = (value: string, param: number[]) => {
  return minlength(value, param[0]) && maxlength(value, param[1])
}

export const min = (value: number, param: number) => {
  return value >= param
}

export const max = (value: number, param: number) => {
  return value <= param
}

export const range = (value: number, param: number[]) => {
  return value >= param[0] && value <= param[1]
}

/**
 * email
 *
 * @example
 * ```ts
 * email('123')
 * // => false
 * email('1122@qq.com')
 * // => true
 * ```
 */
export const email = (value: any) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
}

/**
 * 座机号码
 *
 * @example
 * ```ts
 * landline('13215666')
 * // => false
 * landline('0592-5966633')
 * // => true
 * landline('0592-5966633-123')
 * // => true
 * ```
 */
export const landline = (value: any) => {
  return /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)
}

/**
 * xss注入内容不包含标签闭合
 *
 * @example
 * ```ts
 * xss('<>')
 * // => true
 * xss('</>')
 * // => false
 * xss('<span></span>')
 * // => false
 * ```
 */
export const xss = (value: any) => {
  return !(/<[^>]+>/.test(value))
}