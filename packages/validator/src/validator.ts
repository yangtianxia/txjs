import { isPlainObject, isNil, isNonEmptyString, isFunction, isArray, notNil, isPromise } from '@txjs/bool'
import { omit, toArray } from '@txjs/shared'
import { MessageSchema, ValidationSchema, type MessageLocaleObject, type ValidationObject, type ValidationRule } from './schema'
import { throwError, printWarn, formatTpl, formatTplByValue } from './utils'
import type { BaseTrigger, FieldType } from './types'

import defaultMessage from './message'
import defaultValidation from './validation'

type ExtractProp<T, K> = K extends keyof T ? T[K] : never

type PropConstructor<T = any> =
	| { new (...args: any[]): T & object }
	| { (): T }

export type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

type Prop<T = any> = PropType<T>

type InferPropType<P> =
	P extends Prop<infer T>
		? unknown extends T
			? any
			: T
		: any

interface CustomValidatorRule<Trigger, Custom> {
	/** 触发事件 */
	trigger?: Trigger
	/** 自定义验证函数 */
	validator: Custom
}

export interface CustomValidatorFunc {
	(value: any, rule: any): Promise<void> | void
}

type ValidatorRuleValue<T> =
	T extends boolean
		? { value?: T }
		: { value: T }

type ValidatorRuleOption<Value, Tpl, Trigger> = ValidatorRuleValue<Value> & {
	/** 消息类型 */
	tpl?: Tpl
	/** 触发事件 */
	trigger?: Trigger
	/** 消息文本 */
	message?: string
}

type ExtractValidatorRules<Trigger, VO, MO> = {
	[K in keyof VO]:
		| InferPropType<ExtractProp<VO[K], 'type'>>
		| ValidatorRuleOption<InferPropType<ExtractProp<VO[K], 'type'>>, keyof ExtractProp<MO, K>, Trigger>
}

type ValidatorRule<Trigger, Custom, VO, MO> = Partial<ExtractValidatorRules<Trigger, VO, MO>> & {
	/** 数据类型 */
	type?: FieldType
	/** 标签文本 */
	label?: string
	/** 触发事件 */
	trigger?: Trigger
	/** 自定义函数 */
	custom?:
		| CustomValidatorRule<Trigger, Custom>
		| CustomValidatorRule<Trigger, Custom>[]
}

type ValidatorRules<U, Trigger, Custom, VO, MO> = Partial<Record<keyof U, ValidatorRule<Trigger, Custom, VO, MO>>>

type ReturnRuleType<Trigger, Custom, MessageType> = {
	type?: FieldType
	trigger?: Trigger
	rule?: string
	message?: MessageType
	validator: Custom
}

export class Validator<
	Trigger extends BaseTrigger,
	Custom extends CustomValidatorFunc,
	MessageType extends string,
	VO extends ValidationObject<Trigger>,
	MO extends MessageLocaleObject
> {
	#validation: ValidationSchema<VO>
	#message: MessageSchema<MO>
	#trigger: Trigger

	constructor (config: {
		/** 全局默认触发事件 */
		trigger?: Trigger
		/** 验证器配置 */
		validation: ValidationSchema<VO>
		/** 消息配置 */
		message: MessageSchema<MO>
		/** 语言 */
		locale?: keyof MO
	}) {
		const {
			validation,
			message,
			locale,
			trigger = 'blur' as Trigger,
		} = config
		if (locale) {
			message.setLocale(locale)
		}
		this.#trigger = trigger
		this.#validation = validation
		this.#message = message
	}

	static message = defaultMessage

	static validation = defaultValidation

	get currentLocale() {
		return this.#message.locale
	}

	hasValidator(name: string) {
		return !!this.#validation.getItem(name)
	}

	hasMessage(name: string) {
		return !!this.#message.getMessage(name)
	}

	setTrigger(value: Trigger) {
		this.#trigger = value
	}

	setLocale(locale: keyof MO) {
		this.#message.setLocale(locale)
	}

	schema<U extends object>(config: ValidatorRules<U, Trigger, Custom, VO, MO>) {
		const rules = {} as Record<keyof U, ReturnRuleType<Trigger, Custom, MessageType>[]>
		for (const key in config) {
			rules[key] = this.#generate(key, config[key] || {})
		}
		return rules
	}

	#generate<K>(key: K, rule: ValidatorRule<Trigger, Custom, VO, MO>) {
		if (!isPlainObject(rule)) {
			throwError(`"${key}" the value of a must be an object.`)
		}

		// 转换结果
		const ruleList = [] as ReturnRuleType<Trigger, Custom, MessageType>[]
		// 其余配置
		const rest = omit(rule, ['type', 'label', 'trigger', 'custom'])

		const {
			custom,
			label = '',
			type = 'string'
		} = rule

		// 转换配置
		for (const name in rest) {
			// ❌ 验证规则是否存在
			if (!this.hasValidator(name)) {
				printWarn(`"${name}" rule does not exist. Will be skipped.`)
				continue
			}

			// 验证规则
			const validation = this.#validation.getItem(name)
			// 当前规则配置
			const ruleOption = rest[name as keyof typeof rest]
			// 当前配置
			const option = {
				param: ruleOption,
				trigger: rule.trigger || validation.trigger,
				tpl: 'default',
				message: ''
			}

			// 🔧 规则配置应用
			if (isPlainObject(ruleOption)) {
				const {
					value,
					trigger,
					message,
					tpl,
				} = ruleOption

				if (trigger) {
					option.trigger = trigger
				}

				if (notNil(value)) {
					option.param = value
				} else if (validation.type === Boolean) {
					option.param = true as any
				} else {
					throwError(`"${name}" rule 'value' cannot be empty.`)
				}

				if (isNonEmptyString(message)) {
					option.message = message
				} else if (tpl) {
					option.tpl = tpl
				}
			}

			ruleList.push(
				this.convert(
					name,
					rule,
					validation,
					{ type, label, ...option }
				)
			)
		}

		if (custom) {
			const customs = toArray(custom)
			for (let i = 0, len = customs.length; i < len; i++) {
				const { trigger, validator } = customs[i]
				if (!isFunction(validator)) {
					throwError(`"${key}" 'custom${[i]}.validator' value must be a function.`)
				}
				ruleList.push(
					this.convertCustom(
						`${key}-i`,
						rule,
						validator,
						{ type, label, trigger }
					)
				)
			}
		}

		return ruleList
	}

	convert(
		name: string,
		rule: Omit<ValidatorRule<Trigger, Custom, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validation: ValidationRule<Trigger>,
		other: {
			type?: FieldType
			label?: string
			param: any
			trigger?: Trigger
			tpl: string
			message: string
		}
	): ReturnRuleType<Trigger, Custom, MessageType> {
		const {
			type,
			label,
			param,
			trigger,
			tpl
		} = other
		return {
			type,
			rule: name,
			trigger: trigger || this.#trigger,
			validator: ((_, value) => {
				return new Promise<void>((resolve, reject) => {
					if (
						// ✅ 不是必填项，且需要验证的值无效，则直接通过
						(isNil(rule.required) && !isNonEmptyString(value)) ||
						// ✅ 规则关闭，直接通过
						param === false
					) {
						resolve()
					} else if (
						// ❌ 方法验证结果
						(isFunction(validation.validator) && !validation.validator(value, param, type)) ||
						// ❌ 多个方法验证结果
						(isArray(validation.validator) && !validation.validator.every((fn) => fn(value, param, type)))
					) {
						let message = other.message
						// 🔧 消息格式化
						if (isNonEmptyString(message)) {
							message = formatTpl({ label, message, param })
						} else if (tpl) {
							// 消息配置
							const messages = toArray(this.#message.getMessage(name)[tpl])
							if (label) {
								messages.splice(1, 1, label)
							}
							message = formatTpl({
								param,
								message: messages[0],
								label: messages[1]
							})
						} else {
							printWarn(`"${name}" rule 'tpl' value does not exist.`)
						}

						reject(new Error(formatTplByValue(message, value)))
					} else {
						resolve()
					}
				})
			}) as Custom
		}
	}

	convertCustom(
		name: string,
		rule: Omit<ValidatorRule<Trigger, Custom, VO, MO>, 'type' | 'label' | 'trigger' | 'custom'>,
		validator: Custom,
		{
			type,
			label,
			trigger
		}: {
			type?: FieldType
			label: string
			trigger?: Trigger
		}
	): ReturnRuleType<Trigger, Custom, MessageType>  {
		return {
			type,
			rule: name,
			trigger: trigger || this.#trigger,
			validator: ((_, value) => {
				return new Promise<void>((resolve, reject) => {
					// ✅ 不是必填项，且需要验证的值无效，则直接通过
					if (isNil(rule.required) && !isNonEmptyString(value)) {
						resolve()
					} else {
						const promify = validator(_, value)
						if (isPromise(promify)) {
							promify
								.then(resolve)
								.catch((error: Error) => {
									const message = formatTpl({
										label,
										message: error.message
									})
									reject(new Error(formatTplByValue(message, value)))
								})
						} else {
							resolve()
						}
					}
				})
			}) as Custom
		}
	}
}
