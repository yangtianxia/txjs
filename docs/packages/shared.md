# @txjs/shared

常用 TypeScript 工具函数集合，包含对象操作、数组处理、字符串转换、拦截器管理等。

## 安装

```bash
pnpm add @txjs/shared
```

## 函数列表

| 函数 | 说明 |
|------|------|
| [`noop`](#noop) | 空函数 |
| [`omit`](#omit) | 从对象中删除指定的键 |
| [`pick`](#pick) | 从对象中选取指定的键 |
| [`shallowMerge`](#shallowmerge) | 浅合并对象 |
| [`cloneDeep`](#clonedeep) | 深克隆对象或数组 |
| [`toArray`](#toarray) | 将值转换为数组 |
| [`toFixed`](#tofixed) | 数字四舍五入到指定精度 |
| [`chunk`](#chunk) | 将数组拆分为多个小数组 |
| [`clamp`](#clamp) | 限制数字在指定范围内 |
| [`padString`](#padstring) | 在字符串指定位置插入字符 |
| [`padZero`](#padzero) | 数字前补零 |
| [`camelize`](#camelize) | 字符串转驼峰格式 |
| [`camelToKebab`](#cameltokebab) | 驼峰格式转 kebab |
| [`forEachObject`](#foreachobject) | 遍历对象键值对 |
| [`callInterceptor`](#callinterceptor) | 调用拦截器（支持异步） |
| [`interceptorAll`](#interceptorall) | 依次调用多个拦截器 |

---

## noop

空函数，什么都不做，常用于函数参数默认值或回调占位。

```ts
function noop(): void
```

**示例：**

```ts
const callback = options.onSuccess ?? noop

promise.catch(noop)
```

---

## omit

从对象中删除指定的键，返回新的对象，不修改原对象。

```ts
function omit<T, K extends keyof T>(target: T, keys: ReadonlyArray<K>): Omit<T, K>
```

**参数：**
- `target` - 源对象
- `keys` - 要删除的键数组

**示例：**

```ts
const user = { id: 1, name: '张三', password: 'secret', age: 25 }

omit(user, ['password'])
// => { id: 1, name: '张三', age: 25 }

omit(user, ['id', 'age'])
// => { name: '张三', password: 'secret' }
```

---

## pick

从对象中选取指定的键，返回新的对象，不修改原对象。

```ts
function pick<T extends object, K extends keyof T>(
  target: T,
  keys: ReadonlyArray<K>,
  ignore?: boolean
): Pick<T, K>
```

**参数：**
- `target` - 源对象
- `keys` - 要选取的键数组
- `ignore` - 为 `true` 时跳过值为 `null`/`undefined` 的键

**示例：**

```ts
const user = { id: 1, name: '张三', email: 'zhang@example.com', age: 25 }

pick(user, ['id', 'name'])
// => { id: 1, name: '张三' }

// 跳过空值
const data = { a: 1, b: undefined, c: null, d: 4 }
pick(data, ['a', 'b', 'c', 'd'], true)
// => { a: 1, d: 4 }
```

---

## shallowMerge

将源对象的属性浅拷贝到目标对象，等同于 `Object.assign`。

```ts
const shallowMerge: typeof Object.assign
```

**示例：**

```ts
shallowMerge({ a: 1 }, { b: 2 })
// => { a: 1, b: 2 }

// 后面的对象属性覆盖前面的
shallowMerge({ a: 1, b: 2 }, { b: 3, c: 4 })
// => { a: 1, b: 3, c: 4 }

// 修改是原地的，返回目标对象本身
const base = { x: 1 }
shallowMerge(base, { y: 2 }) === base  // => true
```

---

## cloneDeep

深度克隆对象或数组，支持自定义实例克隆。

```ts
function cloneDeep<T>(value: T, instanceClone?: (value: any) => any): T
```

**参数：**
- `value` - 要克隆的值
- `instanceClone` - 可选的自定义克隆函数，用于处理特殊类型

**示例：**

```ts
// 嵌套对象深拷贝
const original = { user: { name: '李四', address: { city: '北京' } } }
const cloned = cloneDeep(original)
cloned.user.name = '王五'
console.log(original.user.name)  // => '李四'（不受影响）

// 自定义类实例克隆
class Person {
  constructor(public name: string) {}
}

cloneDeep(new Person('张三'), (v) => new Person(v.name))
// => Person { name: '张三' }

// 支持 Date 和 RegExp
cloneDeep(new Date('2023-01-01'))   // => Date 对象（深拷贝）
cloneDeep(/^\s+/g)                  // => /^\s+/g（新实例）
```

---

## toArray

将给定的值转换为数组。`null` 或 `undefined` 返回空数组，已是数组则直接返回。

```ts
function toArray<T>(item?: T | T[]): T[]
```

**示例：**

```ts
toArray(undefined)    // => []
toArray(null)         // => []
toArray('hello')      // => ['hello']
toArray(123)          // => [123]

// 已是数组直接返回（保持同一引用）
const arr = [1, 2, 3]
toArray(arr) === arr  // => true

// 处理可能为单值或数组的参数
function processIds(idOrIds: number | number[]) {
  return toArray(idOrIds).map(id => fetch(`/api/${id}`))
}
```

---

## toFixed

将数字四舍五入到指定的小数位数，返回 `number`（不是字符串）。

```ts
function toFixed(num: number, precision?: number): number
```

**参数：**
- `num` - 要处理的数字
- `precision` - 保留的小数位数（默认 `0`）

**示例：**

```ts
toFixed(3.1415926)     // => 3（默认取整）
toFixed(3.1415926, 2)  // => 3.14
toFixed(3.145, 2)      // => 3.14
toFixed(3.1415926, 4)  // => 3.1416

// 与原生 toFixed 的区别
(3.14).toFixed(1)      // => '3.1'（字符串）
toFixed(3.14, 1)       // => 3.1（数字）
```

---

## chunk

将数组拆分为多个小数组，每个子数组的长度不超过 `size`。

```ts
function chunk<T>(data?: T[], size?: number): T[][]
```

**参数：**
- `data` - 要拆分的数组
- `size` - 每个子数组的最大长度（默认 `1`）

**示例：**

```ts
chunk([1, 2, 3, 4, 5], 2)   // => [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6], 3) // => [[1, 2, 3], [4, 5, 6]]
chunk([1, 2, 3])             // => [[1], [2], [3]]

chunk([])                    // => []
chunk(null)                  // => []
```

---

## clamp

限制数字在指定的最小值和最大值范围内。

```ts
function clamp(num: number, min: number, max: number): number
```

**示例：**

```ts
clamp(50, 0, 100)    // => 50（在范围内）
clamp(-5, 0, 100)    // => 0（低于最小值）
clamp(150, 0, 100)   // => 100（超出最大值）

// 常见场景
element.style.opacity = String(clamp(value, 0, 1))
const progress = clamp(scrollY / maxScroll, 0, 1)
```

---

## padString

在字符串的指定位置插入填充字符。

```ts
function padString(text: string, value: string, index?: number): string
```

**参数：**
- `text` - 原始字符串
- `value` - 要插入的字符
- `index` - 插入位置（默认 `0`，即字符串开头；负数从末尾计算）

**示例：**

```ts
padString('hello', '-', 2)    // => 'he-llo'
padString('hello', '-', 0)    // => '-hello'
padString('hello', '-', -1)   // => 'hell-o'
```

---

## padZero

在数字前补零，直到达到指定长度。

```ts
function padZero(value: number | string, len?: number): string
```

**参数：**
- `value` - 要补零的数字或数字字符串
- `len` - 目标长度（默认 `2`）

**示例：**

```ts
padZero(1)       // => '01'
padZero(10)      // => '10'
padZero(1, 3)    // => '001'
padZero(0)       // => '00'

// 时间格式化
`${padZero(hours)}:${padZero(minutes)}`  // => '09:05'
```

---

## camelize

将短横线或下划线分隔的字符串转换为驼峰命名。

```ts
function camelize(value?: string): string
```

**示例：**

```ts
camelize('hello-world')     // => 'helloWorld'
camelize('hello_world')     // => 'helloWorld'
camelize('font-size')       // => 'fontSize'
camelize('background-color') // => 'backgroundColor'
```

---

## camelToKebab

将驼峰命名的字符串转换为短横线分隔的 kebab-case。

```ts
function camelToKebab(input?: string): string
```

**示例：**

```ts
camelToKebab('helloWorld')       // => 'hello-world'
camelToKebab('fontSize')         // => 'font-size'
camelToKebab('backgroundColor')  // => 'background-color'
```

---

## forEachObject

遍历对象的键值对。

```ts
function forEachObject<T extends object, K extends keyof T>(
  object: T,
  iteratee: (key: K, value: T[K]) => void
): void
```

**示例：**

```ts
const user = { name: '张三', age: 25 }

forEachObject(user, (key, value) => {
  console.log(`${key}: ${value}`)
})
// name: 张三
// age: 25
```

---

## callInterceptor

调用单个拦截器函数，根据返回值决定执行 `done` 还是 `canceled`。支持同步和异步拦截器。

```ts
function callInterceptor(
  interceptor: Interceptor | undefined,
  options: {
    args?: any[]
    done: () => void
    canceled?: () => void
  }
): void

type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void
```

**参数：**
- `interceptor` - 拦截器函数；`undefined` 时直接调用 `done`
- `options.args` - 传给拦截器的参数
- `options.done` - 拦截器返回 `true`/`undefined`/`void` 或 Promise resolve 时执行
- `options.canceled` - 拦截器返回 `false` 或 Promise reject 时执行

**示例：**

```ts
// 同步拦截 - 通过
callInterceptor(() => true, {
  done() { console.log('通过') },
  canceled() { console.log('取消') },
})
// => '通过'

// 同步拦截 - 拦截
callInterceptor(() => false, {
  done() { console.log('通过') },
  canceled() { console.log('取消') },
})
// => '取消'

// 异步拦截
callInterceptor(() => fetch('/api/check').then(r => r.ok), {
  done() { submitForm() },
  canceled() { showError() },
})

// 无拦截器时直接执行 done
callInterceptor(undefined, {
  done() { console.log('直接通过') },
})
```

---

## interceptorAll

按顺序依次调用多个拦截器，全部通过时返回 `true`，任一返回 `false` 则停止并返回 `false`。

```ts
function interceptorAll(interceptors: Interceptor[], ...args: any[]): Promise<boolean>
```

**示例：**

```ts
// 全部通过
await interceptorAll([() => true, () => true])  // => true

// 第二个拦截，后续不再执行
await interceptorAll([
  () => true,
  () => false,
  () => { console.log('不会执行') },
])
// => false

// 支持异步
await interceptorAll([
  async () => true,
  async () => true,
])
// => true

// 传递参数
await interceptorAll(
  [(a, b) => a > 0, (a, b) => b > 0],
  5, 10
)
// => true

// 实际应用：表单提交前多项校验
async function handleSubmit(data) {
  const ok = await interceptorAll([
    () => validateRequired(data.name),
    () => validateEmail(data.email),
    () => validatePassword(data.password),
  ])
  if (ok) submitForm(data)
}
```
