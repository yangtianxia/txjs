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
 * BEM()
 * // => 'home'
 * BEM('wrapper')
 * // => 'home__wrapper'
 * BEM(['wrapper'])
 * // => home home--wrapper
 * BEM({ wrapper: true })
 * // => home home--wrapper
 * BEM('button', { block: true })
 * // => home__button home__button--block
 * BEM('button', ['block'])
 * // => home__button home__button--block
 * ```
 */
function BEM(name: string): [string, ReturnType<typeof bemCls>]
function BEM(name: string, cls: Cls): [string, ReturnType<typeof bemCls>]
function BEM(name: string, cls?: Cls): [string, ReturnType<typeof bemCls>]
function BEM(name: string, cls?: Cls) {
  const bem = bemCls(name)
  return isPlainObject(cls) ? [name, moduleCls(cls, bem)] : [name, bem]
}

BEM.config = function (partial: Partial<ConfigOption>) {
  Object.assign(config, partial || {})
}

export { BEM }

/**
 * @deprecated `import { BEM } from '@txjs/bem'`
 */
export default BEM
