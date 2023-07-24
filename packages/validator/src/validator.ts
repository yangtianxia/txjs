import _defaults from './defaults'
import { omit } from '@txjs/shared'
import { notNil, isPlainObject, isNil, isValidString, isFunction, isArray } from '@txjs/bool'
import { formatTpl } from './shared/formatTpl'

type TriggerText = 'change' | 'blur'

interface BaseValidatorFunc {
	(value: any, param?: any, type?: any): boolean
}

interface Tpl extends Record<string, string> {
	readonly default: string
}

/** 基础验证配置 */
interface BaseValidatorConfig<Trigger> {
	/** 注入内容值 */
	inject?: boolean
	/** 触发事件 */
	trigger?: Trigger
	/** 预设方法 */
	preset: BaseValidatorFunc | BaseValidatorFunc[]
	/** 提示文案 */
	tpl: string | Tpl
}

export interface ValidatorConfig<Trigger> extends BaseValidatorConfig<Trigger> {
	/** 替换定义 */
	replace?: boolean
}

/** 自定义函数 */
export interface CustomValidatorFunction {
	(value: any, rule: any): Promise<boolean>
}

/** 自定义方法配置规则 */
interface CustomValidatorRule<Trigger> {
	trigger?: Trigger
	validator: CustomValidatorFunction
}

export type BaseTrigger = TriggerText | TriggerText[]

/** 定义规则方法 */
export interface RuleType<
	Value = any,
	Type = string,
	Trigger = BaseTrigger
> {
	value: Value
	type?: Type
	message?: string
	trigger?: Trigger
}

/** 内置规则 */
export type DefaultsValidatorRules<Trigger> =
	& Record<
		| 'number'
		| 'digits'
		| 'telephone'
		| 'email'
		| 'landline'
		| 'url'
		| 'xss',
		boolean | RuleType<boolean, 'default', Trigger>
	>
	& Record<
		| 'minlength'
		| 'maxlength'
		| 'min'
		| 'max',
		number | RuleType<number, 'default', Trigger>
	>
	& Record<
		| 'range'
		| 'rangelength',
		number[] | RuleType<number[], 'default', Trigger>
	>
	& {
		required: boolean | RuleType<boolean, 'select' | 'array' | 'default', Trigger>
		contains: any[] | RuleType<any[], 'default', Trigger>
	}

/** 暴露自定义规则 */
export declare interface CustomValidatorRules {
	[key: string]: any
}

export type Rule<Trigger> =
	& CustomValidatorRules
	& Partial<DefaultsValidatorRules<Trigger>>
	& {
		/** 表单 label */
		label?: string
		/** 触发事件 */
		trigger?: Trigger
		/** 自定义规则 */
		custom?: CustomValidatorRule<Trigger>[]
	}

/** 验证配置 */
export type ValidatorConfigObject<Trigger> = Record<string, ValidatorConfig<Trigger>>

export type ValidatorRules<Trigger> = Record<string, Rule<Trigger>>

export type ValidatorRule<Trigger, Message> = {
	trigger?: Trigger
	ruleName?: string
	message?: Message
	validator: CustomValidatorFunction
}

export class Validator<Trigger,	Message> {
	private defaults: ValidatorConfigObject<Trigger> = _defaults as any
	$trigger: Trigger = 'blur' as any

  constructor (config?: ValidatorConfigObject<Trigger>) {
		if (notNil(config)) {
			for (const name in config) {
				this.add(name, config[name])
			}
		}
	}

	init(options: ValidatorRules<Trigger>) {
		const rules = {} as Record<string, ValidatorRule<Trigger, Message>[]>
		for (const key in options) {
			rules[key] = this.generate(key, options[key])
		}
		return rules
	}

	trigger(values: any): Trigger {
		return values
	}

	transform(
		ruleName: string,
		{
			value,
			label,
			trigger,
			rule,
			tpl
		}: {
			value: any,
			label?: string
			trigger: Trigger,
			rule: Omit<Rule<Trigger>, 'label' | 'trigger' | 'custom'>,
			tpl: {
				type: string
				value?: string
			}
		},
		plan: ValidatorConfig<Trigger>
	): ValidatorRule<Trigger, Message> {
		trigger = this.trigger(trigger)
		return {
			ruleName,
			trigger,
			validator: (_, $$$value) => {
				return new Promise((resolve, reject) => {
					// 忽略不是必须项且不是有效值
					// 忽略值为false
					if ((isNil(rule.required) && !isValidString($$$value)) || $$$value === false) {
						resolve(true)
					} else {
						if (
							(isFunction(plan.preset) && !plan.preset($$$value, value, tpl.type)) ||
							(isArray(plan.preset) && !plan.preset.every((preset) => preset($$$value, value, tpl.type)))
						) {
							reject(
								new Error(
									formatTpl(
										tpl.value || (isPlainObject(plan.tpl) ? plan.tpl[tpl.type] : plan.tpl),
										plan.inject ? $$$value : value,
										label
									)
								)
							)
						} else {
							resolve(true)
						}
					}
				})
			}
		}
	}

	tranformCustom(
		ruleName: string,
		validator: CustomValidatorFunction,
		{
			label,
			trigger,
			rule
		}: {
			label?: string
			trigger: Trigger,
			rule: Omit<Rule<Trigger>, 'label' | 'trigger' | 'custom'>
		}
	): ValidatorRule<Trigger, Message> {
		trigger = this.trigger(trigger)
		return {
			ruleName,
			trigger,
			validator: (_, $$$value) => {
				return new Promise((resolve, reject) => {
					if (isNil(rule.required) && !isValidString($$$value)) {
						resolve(true)
					} else {
						validator(_, $$$value)
							.then(resolve)
							.catch((err) => {
								reject(
									new Error(
										formatTpl(err.message, undefined, label)
									)
								)
							})
					}
				})
			}
		}
	}

	private generate(fieldKey: string, rule: Rule<Trigger>) {
		if (!isPlainObject(rule)) {
			throw new Error(`"${fieldKey}" 必须是对象`)
		}

		const $$rules = [] as ValidatorRule<Trigger, Message>[]
		const $$custom = rule.custom
		const $$label = rule.label
		const $$rule = omit(rule, [
			'label',
			'trigger',
			'custom'
		])

		for (const name in $$rule) {
			if (!(name in this.defaults)) {
				console.warn(`"${name}" 方法不存在，可以使用 "add" 方法添加`)
				continue
			}

			const plan = this.defaults[name]

			// 当前规则配置
			const ruleOption = $$rule[name as keyof typeof $$rule]!
			// 触发事件
			let $$$trigger = rule.trigger ?? plan.trigger ?? this.$trigger
			// 规则值
			let $$$value = ruleOption
			// 消息类型
			let tplType = 'default'
			// 消息文案
			let tplValue: string | undefined

			// 配置规则设置
			if (isPlainObject(ruleOption)) {
				const {
					type,
					message,
					value,
					trigger
				} = ruleOption as RuleType<any, string, Trigger>

				// tpl 类型设置
				if (notNil(type)) {
					if (isPlainObject(plan.tpl) && type in plan.tpl) {
						tplType = type
					} else {
						console.warn(`"${name}" 不支持tpl "${type}"，默认规则未设置或不存在`)
					}
				}

				if (notNil(message)) {
					tplValue = message
				}

				if (notNil(value)) {
					$$$value = value
				} else {
					console.warn(`${name} 规则 "value" 值不能为空`)
				}

				if (notNil(trigger)) {
					$$$trigger = trigger
				}
			}

			$$rules.push(
				this.transform(name, {
					rule: $$rule,
					label: $$label,
					value: $$$value,
					trigger: $$$trigger,
					tpl: {
						type: tplType,
						value: tplValue
					}
				}, plan)
			)
		}

		if (isArray($$custom)) {
			const len = $$custom.length

			for (let i = 0; i < len; i++) {
				const { trigger, validator } = $$custom[i]

				if (isNil(validator)) {
					throw new Error(`"${fieldKey}" 自定义验证 "${i}" 必须有 "validator" 方法`)
				}

				if (!isFunction(validator)) {
					throw new Error(`"${fieldKey}" 自定义验证 "[${i}]validator" 必须是function`)
				}

				const $$$trigger = trigger || this.$trigger

				$$rules.push(
					this.tranformCustom(`${fieldKey}-custom-${i}`, validator, {
						rule: $$rule,
						label: $$label,
						trigger: $$$trigger
					})
				)
			}
		}

		return $$rules
	}

	add(
		name: string,
		config: ValidatorConfig<Trigger>
	) {
		if (!config.replace && name in this.defaults) {
			console.warn(`"${name}" 方法已存在，可以添加属性 "replace" 的值为 "true" 来替换`)
		}

		this.defaults[name] = config
	}
}