import { isNil, notNil, isNonEmptyString, isArray, isPlainObject } from '@txjs/bool'
import { toArray } from '@txjs/shared'
import type { FieldType } from './types'

interface FormatTplOptions {
	message: string
	param?: any
	label?: string
}

const LABEL_REGEX = /\[0\]?/

const PARAM_REGEX = /\{\d+\}?/

const VALUE_REGEX = /%\d+%?/

export function printWarn(...args: any[]) {
	console.warn('[@txjs/validator] ', ...args)
}

export function throwError(error: string, options?: ErrorOptions) {
	throw new Error(`[@txjs/validator] ${error}`, options)
}

export function isNonEmptyArray(value: any) {
	return isArray(value) && value.length > 0
}

export function isNonEmptyObject(value: any) {
	if (isPlainObject(value)) {
		for (const key in value) {
			return true
		}
	}
	return false
}

export function isEmptyFieldValue(type: FieldType, value: any) {
	switch (type) {
		case 'string':
		case 'url':
		case 'email':
		case 'hex':
			return !isNonEmptyString(value)
		case 'array':
			return !isNonEmptyArray(value)
		case 'object':
		case 'enum':
			return !isNonEmptyObject(value)
		default:
			return isNil(value)
	}
}

export function formatTpl(options: FormatTplOptions) {
	const { param, label = '' } = options
	let { message } = options
	if (isNonEmptyString(message) && LABEL_REGEX.test(message)) {
		message = message.replace(new RegExp(LABEL_REGEX, 'g'), label)
	}
	if (notNil(param) && param !== false && PARAM_REGEX.test(message)) {
		const params = toArray(param)
		for (let i = 0, len = params.length; i < len; i++) {
			message = message.replace(new RegExp(`\\{${i}\\}`, 'g'), () => String(params[i]))
		}
	}
  return message
}

export function formatTplByValue(message: string, value: any) {
	if (isNonEmptyString(message) && VALUE_REGEX.test(message)) {
		const values = toArray(value)
		for (let i = 0, len = values.length; i < len; i++) {
			message = message.replace(new RegExp(`%${i}%`, 'g'), () => String(values[i]))
		}
	}
	return message
}
