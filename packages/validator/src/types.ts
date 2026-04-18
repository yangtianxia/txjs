export type TriggerType = 'change' | 'blur'
export type BaseTrigger = TriggerType | TriggerType[]
export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
export type ErrorPhase = 'pre' | 'sync'

export type LocaleMessageValue = string | string[]
export type LocaleEntry = { default: LocaleMessageValue } & Record<string, LocaleMessageValue>
export type LocaleMessages = Record<string, LocaleEntry>
export type LocaleMap = Record<string, LocaleMessages>

export type RuleFn = (value: any, param?: any, type?: FieldType) => boolean

export type RuleDef = {
  type: any
  trigger?: BaseTrigger
  validator: RuleFn | RuleFn[]
}

export type RuleDefMap = Record<string, RuleDef>

// 在 schema 中使用的自定义校验函数（框架无关）
// 抛出 Error 或返回 rejected Promise 表示校验失败
export type SchemaCustomFn = (value: any) => void | Promise<void>

export type NamedRuleItem<R extends RuleDefMap> = {
  /** 规则名（引用 rules map 中的 key） */
  rule: keyof R & string
  /** 规则参数；Boolean 类型规则可省略（默认 true） */
  value?: any
  /** 覆盖该条规则的触发时机 */
  trigger?: BaseTrigger
  /** 选择 locale 消息模板 key，默认 'default' */
  template?: string
  /** 直接写死消息文本，优先于 locale */
  message?: string
}

export type CustomRuleItem = {
  /** 内联自定义校验函数 */
  validator: SchemaCustomFn
  /** 触发时机 */
  trigger?: BaseTrigger
}

export type SchemaRuleItem<R extends RuleDefMap> =
  | (keyof R & string)
  | NamedRuleItem<R>
  | CustomRuleItem

export type FieldConfig<R extends RuleDefMap> = {
  /** 字段标签，替换消息中的 [0] 占位符 */
  label?: string
  /** 字段数据类型，影响空值判断，默认 'string' */
  type?: FieldType
  /** 该字段所有规则的默认触发时机 */
  trigger?: BaseTrigger
  /** 有序规则列表 */
  rules: SchemaRuleItem<R>[]
}

export type SchemaConfig<T, R extends RuleDefMap> = {
  [K in keyof T]?: FieldConfig<R>
}
