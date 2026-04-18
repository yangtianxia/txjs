import { isNil, isNonEmptyString, isFunction } from '@txjs/bool'
import { toArray } from '@txjs/shared'
import { printWarn, isEmptyFieldValue, formatTpl, formatTplByValue } from './utils'
import type {
  BaseTrigger,
  ErrorPhase,
  FieldType,
  LocaleMap,
  LocaleMessages,
  RuleDefMap,
  RuleFn,
  SchemaCustomFn,
  NamedRuleItem,
  CustomRuleItem,
  SchemaRuleItem,
  FieldConfig,
  SchemaConfig,
} from './types'

export interface ValidatorRuleOptions<Trigger> {
  type: FieldType
  trigger: Trigger
  rule: string
  message: string | (() => string)
  validators: RuleFn[]
  param: any
  /** 该字段是否包含 required 规则（用于决定空值时是否跳过） */
  hasRequired: boolean
}

export interface CustomRuleOptions<Trigger> {
  type: FieldType
  trigger: Trigger
  label: string
  validator: SchemaCustomFn
  hasRequired: boolean
}

export abstract class BaseValidator<
  Trigger extends BaseTrigger,
  OutputRule,
  L extends LocaleMap,
  R extends RuleDefMap,
> {
  #locale: string
  #locales: L
  #rules: R
  #trigger: Trigger
  #errorPhase: ErrorPhase

  constructor(config: {
    /** 默认语言 */
    locale: string
    /** 所有语言的消息对象 */
    locales: L
    /** 规则定义集合 */
    rules: R
    /** 全局默认触发时机，默认 'blur' */
    trigger?: Trigger
    /** 消息生成时机：'pre' 初始化时生成（静态），'sync' 校验时生成（支持动态切换语言），默认 'pre' */
    errorPhase?: ErrorPhase
  }) {
    this.#locale = config.locale
    this.#locales = config.locales
    this.#rules = config.rules
    this.#trigger = (config.trigger ?? 'blur') as Trigger
    this.#errorPhase = config.errorPhase ?? 'pre'
  }

  get locale() {
    return this.#locale
  }

  get trigger() {
    return this.#trigger
  }

  get errorPhase() {
    return this.#errorPhase
  }

  setLocale(locale: string) {
    if (locale in this.#locales) {
      this.#locale = locale
    } else {
      printWarn(`"${locale}" locale does not exist.`)
    }
  }

  setTrigger(trigger: Trigger) {
    this.#trigger = trigger
  }

  protected get currentLocale(): LocaleMessages {
    return this.#locales[this.#locale] ?? {}
  }

  protected getMessage(
    ruleName: string,
    template: string,
    label: string,
    param: any
  ): string {
    const entry = this.currentLocale[ruleName]
    if (!entry) {
      printWarn(`"${ruleName}" has no locale entry.`)
      return ''
    }
    const tpl = entry[template] ?? entry['default']
    const messages = toArray(tpl) as string[]
    // messages[0] 是消息模板，messages[1] 是内置 label（如"手机号码"）
    const baseMsg = messages[0]
    const builtinLabel = messages[1]
    return formatTpl({
      message: baseMsg,
      param,
      label: label || builtinLabel || '',
    })
  }

  schema<T extends object>(config: SchemaConfig<T, R>): Record<keyof T, OutputRule[]> {
    const result = {} as Record<keyof T, OutputRule[]>
    for (const fieldKey in config) {
      const fieldConfig = config[fieldKey as keyof T]
      if (fieldConfig) {
        result[fieldKey as keyof T] = this.#generateField(fieldKey, fieldConfig)
      }
    }
    return result
  }

  #hasRequired(rules: SchemaRuleItem<R>[]): boolean {
    return rules.some(
      (item) =>
        item === 'required' ||
        (typeof item === 'object' && 'rule' in item && item.rule === 'required')
    )
  }

  #generateField(fieldKey: string, fieldConfig: FieldConfig<R>): OutputRule[] {
    const {
      label = '',
      type = 'string' as FieldType,
      trigger: fieldTrigger,
      rules,
    } = fieldConfig

    const hasRequired = this.#hasRequired(rules)
    const output: OutputRule[] = []

    for (const item of rules) {
      if (typeof item === 'string') {
        const rule = this.#lookupRule(item, fieldKey)
        if (!rule) continue
        output.push(
          this.#buildNamedRule({
            ruleName: item,
            value: true,
            label,
            type,
            trigger: (fieldTrigger ?? rule.trigger ?? this.#trigger) as Trigger,
            template: 'default',
            message: '',
            hasRequired,
            validators: toArray(rule.validator),
          })
        )
      } else if ('validator' in item && !('rule' in item)) {
        output.push(this.#buildCustomRule(item, fieldKey, label, type, fieldTrigger, hasRequired))
      } else {
        const namedItem = item as NamedRuleItem<R>
        const rule = this.#lookupRule(namedItem.rule, fieldKey)
        if (!rule) continue

        const isBoolType = rule.type === Boolean
        const value = namedItem.value ?? (isBoolType ? true : undefined)

        if (!isBoolType && isNil(value)) {
          printWarn(`"${namedItem.rule}" requires a 'value' parameter. (field: "${fieldKey}")`)
          continue
        }

        output.push(
          this.#buildNamedRule({
            ruleName: namedItem.rule,
            value,
            label,
            type,
            trigger: (namedItem.trigger ?? fieldTrigger ?? rule.trigger ?? this.#trigger) as Trigger,
            template: namedItem.template ?? 'default',
            message: namedItem.message ?? '',
            hasRequired,
            validators: toArray(rule.validator),
          })
        )
      }
    }

    return output
  }

  #lookupRule(name: string, fieldKey: string) {
    if (!(name in this.#rules)) {
      printWarn(`"${name}" rule does not exist. (field: "${fieldKey}")`)
      return null
    }
    return this.#rules[name]
  }

  #buildNamedRule(options: {
    ruleName: string
    value: any
    label: string
    type: FieldType
    trigger: Trigger
    template: string
    message: string
    hasRequired: boolean
    validators: RuleFn[]
  }): OutputRule {
    const { ruleName, value, label, type, trigger, template, message, hasRequired, validators } =
      options

    const getMsg = () => {
      if (isNonEmptyString(message)) {
        return formatTpl({ label, message, param: value })
      }
      return this.getMessage(ruleName, template, label, value)
    }

    const resolvedMessage: string | (() => string) =
      this.#errorPhase === 'pre' ? getMsg() : getMsg

    return this.createValidatorRule({
      type,
      trigger,
      rule: ruleName,
      message: resolvedMessage,
      validators,
      param: value,
      hasRequired,
    })
  }

  #buildCustomRule(
    item: CustomRuleItem,
    fieldKey: string,
    label: string,
    type: FieldType,
    fieldTrigger: BaseTrigger | undefined,
    hasRequired: boolean
  ): OutputRule {
    if (!isFunction(item.validator)) {
      printWarn(`"${fieldKey}" validator must be a function.`)
    }
    return this.createCustomRule({
      type,
      trigger: (item.trigger ?? fieldTrigger ?? this.#trigger) as Trigger,
      label,
      validator: item.validator,
      hasRequired,
    })
  }

  protected abstract createValidatorRule(options: ValidatorRuleOptions<Trigger>): OutputRule

  protected abstract createCustomRule(options: CustomRuleOptions<Trigger>): OutputRule
}
