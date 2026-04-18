import { isPromise } from '@txjs/bool'
import { BaseValidator } from './base'
import { formatTpl, formatTplByValue } from './utils'
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

// 对齐 Vant 4 FieldRule 类型
// https://github.com/youzan/vant - packages/vant/src/field/types.ts
export type VantRuleMessage = string | ((value: any, rule: VantRule) => string)

export type VantRule = {
  trigger?: string | string[]
  // false = 空值时跳过验证（等价于非 required 字段），默认 true
  validateEmpty?: boolean
  message?: VantRuleMessage
  validator?: (value: any, rule: VantRule) => boolean | string | Promise<boolean | string>
}

export class VantValidator<
  Trigger extends BaseTrigger,
  L extends LocaleMap,
  R extends RuleDefMap,
> extends BaseValidator<Trigger, VantRule, L, R> {
  protected createValidatorRule(options: ValidatorRuleOptions<Trigger>): VantRule {
    const { type, trigger, message, validators, param, hasRequired } = options

    // 用 Vant 内置的 validateEmpty 控制空值跳过逻辑，无需在 validator 内手动判断
    // hasRequired=false 时 validateEmpty=false，Vant 会跳过空值校验
    return {
      trigger: mapTrigger(trigger),
      validateEmpty: hasRequired,
      // message 对齐 Vant FieldRuleMessage 签名：(value, rule) => string
      message:
        typeof message === 'function'
          ? (_value: any, _rule: VantRule) => (message as () => string)()
          : message,
      validator: (value) => validators.every((fn) => fn(value, param, type)),
    }
  }

  protected createCustomRule(options: CustomRuleOptions<Trigger>): VantRule {
    const { type, trigger, label, validator, hasRequired } = options

    return {
      trigger: mapTrigger(trigger),
      validateEmpty: hasRequired,
      validator: (value) => {
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
