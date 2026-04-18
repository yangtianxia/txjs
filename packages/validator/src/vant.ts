import { isPromise } from '@txjs/bool'
import { BaseValidator } from './base'
import { isEmptyFieldValue, formatTpl, formatTplByValue } from './utils'
import type { BaseTrigger, TriggerType, LocaleMap, RuleDefMap } from './types'
import type { ValidatorRuleOptions, CustomRuleOptions } from './base'

// vant 4 触发时机与 antd 不同，需要映射
const TRIGGER_MAP: Record<TriggerType, string> = {
  blur: 'onBlur',
  change: 'onChange',
}

function mapTrigger(trigger: BaseTrigger): string | string[] {
  if (Array.isArray(trigger)) {
    return trigger.map((t) => TRIGGER_MAP[t] ?? t)
  }
  return TRIGGER_MAP[trigger as TriggerType] ?? trigger
}

// vant 规则格式
// validator 签名: (value, rule) => boolean | string | Promise<boolean | string>
export type VantRule = {
  trigger?: string | string[]
  validator: (value: any) => boolean | string | Promise<boolean | string>
}

export class VantValidator<
  Trigger extends BaseTrigger,
  L extends LocaleMap,
  R extends RuleDefMap,
> extends BaseValidator<Trigger, VantRule, L, R> {
  protected createValidatorRule(options: ValidatorRuleOptions<Trigger>): VantRule {
    const { type, trigger, message, validators, param, hasRequired } = options

    return {
      trigger: mapTrigger(trigger),
      validator: (value) => {
        if (!hasRequired && isEmptyFieldValue(type, value)) {
          return true
        }
        const valid = validators.every((fn) => fn(value, param, type))
        if (!valid) {
          const msg = typeof message === 'function' ? message() : message
          return formatTplByValue(msg, value) || false
        }
        return true
      },
    }
  }

  protected createCustomRule(options: CustomRuleOptions<Trigger>): VantRule {
    const { type, trigger, label, validator, hasRequired } = options

    return {
      trigger: mapTrigger(trigger),
      validator: (value) => {
        if (!hasRequired && isEmptyFieldValue(type, value)) {
          return true
        }

        const formatError = (error: Error) => {
          const msg = formatTpl({ label, message: error.message })
          return formatTplByValue(msg, value) || false
        }

        try {
          const result = validator(value)
          if (isPromise(result)) {
            return (result as Promise<void>)
              .then(() => true as const)
              .catch((err: Error) => formatError(err))
          }
          return true
        } catch (err: any) {
          return formatError(err)
        }
      },
    }
  }
}
