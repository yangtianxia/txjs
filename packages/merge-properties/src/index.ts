export type MergePropertiesFunc = (...args: any[]) => any

const bindWrap = <F extends MergePropertiesFunc, T extends any>(
	func: F,
	thisArg: T,
	...args: Parameters<F>
) => {
  function wrap (...moreArgs: Parameters<F>) {
    func.apply(thisArg, args.concat(moreArgs))
  }

	Object.defineProperty(wrap, 'name', { value: func.name })

	return wrap
}

/**
 * mergeProperties
 *
 * 从源对象合并属性和方法到目标对象中
 *
 * @template T - 目标对象的类型
 * @template C - 源对象的类型
 * @template P - 要合并的属性的类型
 *
 * @param {T} target - 目标对象，将要合并属性到此对象
 * @param {C} source - 源对象，从此对象获取属性
 * @param {P} props - 将要合并到目标对象的属性
 *
 * @returns {T & C} 带有从源对象合并属性的目标对象
 */
export const mergeProperties = <T extends object, C extends object, P>(
	func: T,
	thisArg: C,
	props: P
) => {
  const names = Object.getOwnPropertyNames(props)

	for (const name of names) {
		const property = Reflect.get(thisArg, name)
		Reflect.set(
			func,
			name,
			property && typeof property === 'function'
				? bindWrap(property as MergePropertiesFunc, thisArg)
				: property
		)
	}

	return func
}

export default mergeProperties