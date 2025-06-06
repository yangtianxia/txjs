import { isNil, isString, notNil, isArray, isPlainObject } from '@txjs/bool'

type ModeType = 'match' | 'always'

type Base = string | Record<string, any>

type Mods = Base | Base[]

type Cls = Record<string, string>

type ConfigOption = {
  mode: ModeType
}

const config: ConfigOption = {
  mode: 'match',
}

function rootCls(name: string, mods?: Mods): string {
  if (isNil(mods)) {
    return ''
  }

  if (isString(mods)) {
    return ` ${name}--${mods}`
  }

  if (isArray(mods)) {
    return mods.reduce<string>((ret, cur) => ret + rootCls(name, cur), '')
  }

  return Object.keys(mods).reduce(
    (ret, cur) => ret + (mods[cur] ? rootCls(name, cur) : ''),
    ''
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
    const isAlways = config.mode === 'always'
    const str = bem(el, mods)
    const modules = str
      .split(' ')
      .map((item) => (isAlways ? cls[item] || item : cls[item]))
      .join(' ')
    return modules || (isString(el) ? cls[el] : isAlways ? str : '')
  }
}

/**
 * CSS命名函数
 *
 * @example
 * ```ts
 * const [name, bem] = BEM('home')
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
function bem(name: string): [string, ReturnType<typeof bemCls>]
function bem(name: string, cls: Cls): [string, ReturnType<typeof bemCls>]
function bem(name: string, cls?: Cls): [string, ReturnType<typeof bemCls>]
function bem(name: string, cls?: Cls) {
  const bem = bemCls(name)
  return isPlainObject(cls) ? [name, moduleCls(cls, bem)] : [name, bem]
}

bem.prototype.config = function (partial: Partial<ConfigOption>) {
  Object.assign(config, partial || {})
}

export { bem as BEM }
