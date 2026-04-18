import { isPromise } from '@txjs/bool'
import { BaseValidator } from './base'
import { isEmptyFieldValue, formatTpl, formatTplByValue } from './utils'
import type { BaseTrigger, LocaleMap, RuleDefMap } from './types'
import type { ValidatorRuleOptions, CustomRuleOptions } from './base'

// antd-vue / ant-design 规则格式
// validator 签名: (rule, value) => Promise<void>
export type AntdRule = {
  type?: string
  rule?: string
  trigger?: BaseTrigger
  message?: string | (() => string)
  validator: (rule: any, value: any) => Promise<void>
}

export class AntdValidator<
  Trigger extends BaseTrigger,
  L extends LocaleMap,
  R extends RuleDefMap,
> extends BaseValidator<Trigger, AntdRule, L, R> {
  protected createValidatorRule(options: ValidatorRuleOptions<Trigger>): AntdRule {
    const { type, trigger, rule, message, validators, param, hasRequired } = options

    return {
      type,
      rule,
      trigger,
      message,
      validator: (_, value) =>
        new Promise<void>((resolve, reject) => {
          if (!hasRequired && isEmptyFieldValue(type, value)) {
            resolve()
            return
          }
          const valid = validators.every((fn) => fn(value, param, type))
          if (!valid) {
            const msg = typeof message === 'function' ? message() : message
            reject(new Error(formatTplByValue(msg, value)))
          } else {
            resolve()
          }
        }),
    }
  }

  protected createCustomRule(options: CustomRuleOptions<Trigger>): AntdRule {
    const { type, trigger, label, validator, hasRequired } = options

    return {
      type,
      trigger,
      validator: (_, value) =>
        new Promise<void>((resolve, reject) => {
          if (!hasRequired && isEmptyFieldValue(type, value)) {
            resolve()
            return
          }

          const formatError = (error: Error) => {
            const msg = formatTpl({ label, message: error.message })
            return new Error(formatTplByValue(msg, value))
          }

          try {
            const result = validator(value)
            if (isPromise(result)) {
              result.then(resolve).catch((err: Error) => reject(formatError(err)))
            } else {
              resolve()
            }
          } catch (err: any) {
            reject(formatError(err))
          }
        }),
    }
  }
}
