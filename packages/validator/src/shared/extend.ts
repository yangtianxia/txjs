import { isFunction } from '@txjs/bool'

const bind = <F extends Function, T extends any>(func: F, thisArg: T) => {
  return function wrap () {
    func.apply(thisArg, arguments)
  }
}

export const extend = <T extends object, C extends object, P>(func: T, thisArg: C, props: P) => {
  const names = Object.getOwnPropertyNames(props)

  for (let i = 0, len = names.length; i < len; i++) {
    const name = names[i]
    const fn = Reflect.get(thisArg, name)

    if (fn && isFunction(fn)) {
      Reflect.set(func, name, bind(fn, thisArg))
    } else {
      Reflect.set(func, name, fn)
    }
  }

  return func
}
