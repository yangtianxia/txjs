import { isNil, isString, isArray, notNil, isPlainObject } from '@txjs/bool'
import extend from 'extend'

type Base = string | Record<string, any>
type Mods = Base | Base[]
type Cls = Record<string, string>
type ConfigOption = {
	debugger: boolean
	prefixer: {
		page?: string
		comp?: string
	}
}

const $$$config = {
	debugger: false,
	prefixer: {
		comp: undefined,
		page: undefined
	}
} as ConfigOption

function rootCls(name: string, mods?: Mods): string {
	if (isNil(mods)) {
		return ''
	}

	if (isString(mods)) {
		return ` ${name}--${mods}`
	}

	if (isArray(mods)) {
		return mods.reduce<string>(
			(ret, curr) => ret + rootCls(name, curr), ''
		)
	}

	return Object
		.keys(mods)
		.reduce(
			(ret, curr) => ret + (mods[curr] ? rootCls(name, curr) : ''), ''
		)
}

function bemCls(name: string) {
	return (el?: Mods, mods?: Mods) => {
		if (notNil(el) && !isString(el)) {
			mods = el
			el = ''
		}

		el = el ? `${name}__${el}` : name
		return `${el}${rootCls(el, mods)}`
	}
}

function moduleCls(cls: Cls, bem: ReturnType<typeof bemCls>) {
	return (el?: Mods, mods?: Mods) => {
		const str = bem(el, mods)
		const modules = str
			.split(' ')
			.map((item) => $$$config.debugger ? cls[item] || item : cls[item])
			.join(' ')
		return modules || (isString(el) ? cls[el] : $$$config.debugger ? str : '')
	}
}

/**
 * Bem
 *
 * @example
 * ```ts
 * const [name, bem] = Bem('home')
 *
 * name
 * // => 'home'
 * bem()
 * // => 'home'
 * bem('wrapper')
 * // => 'home__wrapper'
 * bem(['wrapper'])
 * // => home home--wrapper
 * bem({ wrapper: true })
 * // => home home--wrapper
 * bem('button', { block: true })
 * // => home__button home__button--block
 * bem('button', ['block'])
 * // => home__button home__button--block
 * ```
 */
function Bem(name: string): [string, ReturnType<typeof bemCls>]
function Bem(name: string, cls: Cls): [string, ReturnType<typeof bemCls>]
function Bem(name: string, cls?: Cls): [string, ReturnType<typeof bemCls>]
function Bem(name: string, cls?: Cls) {
	const { comp, page } = $$$config?.prefixer || {}

	if (isNil(cls) && comp) {
		name = `${comp}-${name}`
	}

	const bem = bemCls(name)

	if (isPlainObject(cls)) {
		if (page) {
			name = `${page}-${name}`
		}
		return [name, moduleCls(cls, bem)]
	}

	return [name, bem]
}

Bem.config = function (config: Partial<ConfigOption>) {
	if (isPlainObject(config)) {
		extend(true, $$$config, config)
	}
}

export default Bem