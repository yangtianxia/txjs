# @txjs/shared

常用的 TypeScript 工具函数库，包括字符串操作、数据结构处理、对象克隆、拦截器管理等。

## 安装

```bash
# npm
npm i @txjs/shared

# pnpm
pnpm add @txjs/shared

# yarn
yarn add @txjs/shared
```

## 导入方式

```ts
// 导入全部函数
import { omit, pick, camelize } from '@txjs/shared'

// 按需导入单个函数
import { omit } from '@txjs/shared/dist/omit'
```

## 函数列表

| 函数 | 说明 |
|------|------|
| [noop](#noop) | 空函数，什么都不做 |
| [omit](#omit) | 从对象中删除指定的键 |
| [pick](#pick) | 从对象中选取指定的键 |
| [shallowMerge](#shallowmerge) | 浅合并对象 |
| [cloneDeep](#clonedeep) | 深克隆对象或数组 |
| [toArray](#toarray) | 将值转换为数组 |
| [toFixed](#tofixed) | 数字四舍五入到指定精度 |
| [chunk](#chunk) | 将数组拆分为多个小数组 |
| [clamp](#clamp) | 限制数字在指定范围内 |
| [padString](#padstring) | 在字符串指定位置插入字符 |
| [padZero](#padzero) | 数字前补零 |
| [padStr](#padstr) | 同 padString（已废弃） |
| [camelize](#camelize) | 字符串转驼峰格式 |
| [camelToKebab](#cameltokebab) | 驼峰格式转 kebab |
| [forEachObject](#foreachobject) | 遍历对象键值对 |
| [callInterceptor](#callinterceptor) | 调用拦截器（支持异步） |
| [interceptorAll](#interceptorall) | 依次调用多个拦截器 |

---

## noop

空函数，什么都不做。常用于函数参数默认值或回调占位。

```ts
function noop(): void
```

**示例：**

```ts
// 作为默认回调
const callback = options.onSuccess || noop

// Promise catch 占位
promise.catch(noop)

// 延迟函数
const defer = (fn: Function) => setTimeout(fn, 1000)
defer(noop) // 1秒后什么都不做
```

---

## omit

从对象中删除指定的键，返回新的对象（不修改原对象）。

```ts
function omit<T, K extends keyof T>(target: T, keys: ReadonlyArray<K>): Omit<T, K>
```

**参数：**
- `target` - 源对象
- `keys` - 要删除的键数组

**示例：**

```ts
const user = { id: 1, name: '张三', password: 'secret', age: 25 }

// 删除指定键
omit(user, ['password'])
// => { id: 1, name: '张三', age: 25 }

// 删除多个键
omit(user, ['id', 'age'])
// => { name: '张三', password: 'secret' }

// 删除不存在的键（安全）
omit(user, ['email'])
// => { id: 1, name: '张三', password: 'secret', age: 25 }

// 原对象不受影响
console.log(user)
// => { id: 1, name: '张三', password: 'secret', age: 25 }
```

---

## pick

从对象中选取指定的键，返回新的对象（不修改原对象）。

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
- `ignore` - 为 `true` 时忽略 `null`/`undefined` 的值

**示例：**

```ts
const user = { id: 1, name: '张三', email: 'zhang@example.com', age: 25 }

// 选取指定键
pick(user, ['id', 'name'])
// => { id: 1, name: '张三' }

// 选取时忽略 null/undefined 值
const data = { a: 1, b: undefined, c: null, d: 4 }
pick(data, ['a', 'b', 'c', 'd'], true)
// => { a: 1, d: 4 }

// 原对象不受影响
console.log(user)
// => { id: 1, name: '张三', email: 'zhang@example.com', age: 25 }
```

---

## shallowMerge

将一个或多个源对象的可枚举属性浅拷贝到目标对象，返回目标对象。

```ts
const shallowMerge: Object.assign
```

**示例：**

```ts
const target = { a: 1 }
const source = { b: 2 }

shallowMerge(target, source)
// => { a: 1, b: 2 }

// 源对象属性会覆盖目标对象属性
const obj1 = { a: 1, b: 2 }
const obj2 = { b: 3, c: 4 }
shallowMerge(obj1, obj2)
// => { a: 1, b: 3, c: 4 }

// 返回目标对象本身（修改是原地的）
const base = { x: 1 }
const result = shallowMerge(base, { y: 2 })
console.log(base === result) // => true

// 合并多个对象
shallowMerge({}, { a: 1 }, { b: 2 }, { c: 3 })
// => { a: 1, b: 2, c: 3 }
```

---

## cloneDeep

深度克隆对象或数组，支持自定义实例克隆方法。

```ts
function cloneDeep<T>(
  value: T,
  instanceClone?: (value: any) => any
): T
```

**参数：**
- `value` - 要克隆的值
- `instanceClone` - 可选的自定义克隆函数，用于特殊类型

**示例：**

```ts
// 基本类型（直接返回）
cloneDeep(123)                   // => 123
cloneDeep('hello')                // => 'hello'

// 数组克隆
cloneDeep([1, 2, 3])              // => [1, 2, 3]
cloneDeep([{ a: 1 }, { b: 2 }])   // => [{ a: 1 }, { b: 2 }]

// 对象克隆
cloneDeep({ name: '张三', age: 25 })
// => { name: '张三', age: 25 }

// 嵌套对象克隆（深拷贝）
const original = { user: { name: '李四', address: { city: '北京' } } }
const cloned = cloneDeep(original)
cloned.user.name = '王五'
console.log(original.user.name)  // => '李四' (原对象不受影响)

// 自定义实例克隆
class Person {
  constructor(public name: string) {}
}

const person = new Person('赵六')
cloneDeep(person, (value) => new Person(value.name))
// => Person { name: '赵六' }

// 日期对象克隆
cloneDeep(new Date('2023-06-12'))
// => Date { 2023-06-12T00:00:00.000Z }

// RegExp 克隆
cloneDeep(/^\s+/g)
// => /\s+/g
```

---

## toArray

将给定的值转换为数组。如果是 `null` 或 `undefined`，返回空数组。

```ts
function toArray<T>(item?: T | T[]): T[]
```

**示例：**

```ts
// nil 值返回空数组
toArray()                          // => []
toArray(undefined)                 // => []
toArray(null)                      // => []

// 数组直接返回（保持引用）
const arr = [1, 2, 3]
toArray(arr) === arr               // => true

// 非数组值包装为单元素数组
toArray('hello')                   // => ['hello']
toArray({ a: 1 })                  // => [{ a: 1 }]
toArray(123)                       // => [123]
toArray(true)                      // => [true]

// 实际应用：处理可能为数组或单个值的参数
function processIds(idOrIds) {
  const ids = toArray(idOrIds)
  return ids.map(id => fetch(`/api/${id}`))
}

processIds(1)                      // => [Promise]
processIds([1, 2, 3])             // => [Promise, Promise, Promise]
```

---

## toFixed

将数字四舍五入到指定的小数位数，返回处理后的数字（不是字符串）。

```ts
function toFixed(num: number, precision?: number): number
```

**注意：** 与原生 `Number.toFixed()` 不同，本函数返回 `number` 类型，不是字符串。

**示例：**

```ts
// 默认取整（精度为 0）
toFixed(3.1415926)                 // => 3
toFixed(3.5)                       // => 4
toFixed(3.9)                       // => 4

// 指定精度
toFixed(3.1415926, 2)              // => 3.14
toFixed(3.145, 2)                  // => 3.14
toFixed(3.1415926, 4)              // => 3.1415

// 处理大数字
toFixed(123456.789, 2)             // => 123456.78

// 与原生 toFixed 对比
(3.1415926).toFixed(2)            // => '3.14' (字符串)
toFixed(3.1415926, 2)              // => 3.14 (数字)

// 精度为 0 时等同于 Math.floor
toFixed(100.9)                     // => 100
```

---

## chunk

将数组拆分为多个小数组，每个子数组的长度由 `size` 决定。

```ts
function chunk<T>(data?: T[], size?: number): T[][]
```

**参数：**
- `data` - 要拆分的数组
- `size` - 每个子数组的长度（默认 `1`）

**示例：**

```ts
// 按单个元素拆分
chunk([1, 2, 3])                   // => [[1], [2], [3]]

// 按指定长度拆分
chunk([1, 2, 3, 4, 5], 2)         // => [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6], 3)       // => [[1, 2, 3], [4, 5, 6]]

// 最后一个数组可能小于指定长度
chunk([1, 2, 3, 4, 5], 2)         // => [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5], 4)         // => [[1, 2, 3, 4], [5]]

// 实际应用：分页处理
function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize
  const pageItems = chunk(items, pageSize)[page - 1]
  return pageItems || []
}

const allItems = [1, 2, 3, 4, 5, 6, 7]
paginate(allItems, 1, 3)           // => [1, 2, 3]
paginate(allItems, 2, 3)           // => [4, 5, 6]
paginate(allItems, 3, 3)           // => [7]

// 空数组和非法输入
chunk([])                          // => []
chunk(null)                        // => []
chunk([1, 2, 3], 0)                // => []
```

---

## clamp

限制数字在指定的最小值和最大值范围内。

```ts
function clamp(num: number, min: number, max: number): number
```

**参数：**
- `num` - 要限制的数字
- `min` - 最小值
- `max` - 最大值

**示例：**

```ts
// 值在范围内（不变）
clamp(50, 10, 99)                  // => 50
clamp(10, 10, 99)                  // => 10
clamp(99, 10, 99)                  // => 99

// 值小于最小值（返回最小值）
clamp(2, 10, 99)                   // => 10
clamp(-50, 10, 99)                 // => 10
clamp(0, 10, 99)                   // => 10

// 值大于最大值（返回最大值）
clamp(100, 10, 99)                 // => 99
clamp(1000, 10, 99)                // => 99

// 支持小数
clamp(5.5, 0, 10)                 // => 5.5
clamp(-0.5, 0, 10)                // => 0
clamp(10.5, 0, 10)                // => 10

// 支持负数范围
clamp(-5, -10, -1)                // => -5
clamp(-15, -10, -1)               // => -10
clamp(5, -10, -1)                 // => -1

// 实际应用：进度条百分比
const progress = clamp(scrollY / maxScroll, 0, 1) * 100

// CSS 动画边界
element.style.opacity = clamp(value, 0, 1)
```

---

## padString

在字符串的指定位置插入填充字符。

```ts
function padString(text: string, value: string, index?: number): string
```

**参数：**
- `text` - 要操作的字符串
- `value` - 用于填充的字符
- `index` - 填充位置（默认 `0`，即在字符串前添加）

**示例：**

```ts
// 在字符串前添加字符
padString('txjs', '-', 0)          // => '-txjs'
padString('abc', '0', 0)          // => '0abc'

// 在指定位置插入字符
padString('txjs', '-', 2)         // => 'tx-js'
padString('hello', '-', 2)        // => 'he-llo'
padString('hello', '-', 5)        // => 'hello-' (末尾)

// 负数索引（从末尾计算）
padString('abc', '-', -1)         // => 'ab-c'
padString('abc', '-', -2)         // => 'a-bc'

// 索引超出范围
padString('abc', '-', 10)         // => 'abc-'

// 实际应用：格式化日期
padString('6', '0', 0)            // => '06'
padString('15', '0', 0)           // => '15'
padString('2023', '-', 4)         // => '2023-'
```

---

## padZero

在数字前面补零，直到达到指定的长度。

```ts
function padZero(value: number | string, len?: number): string
```

**参数：**
- `value` - 要填充的数字或数字字符串
- `len` - 目标长度（默认 `2`）

**示例：**

```ts
// 默认补零到 2 位
padZero(1)                        // => '01'
padZero(5)                        // => '05'
padZero(9)                        // => '09'

// 已经是 2 位或更长（不变）
padZero(10)                       // => '10'
padZero(99)                       // => '99'
padZero(100)                      // => '100'

// 指定长度
padZero(1, 3)                     // => '001'
padZero(1, 4)                     // => '0001'
padZero(10, 4)                    // => '0010'
padZero(123, 4)                   // => '0123'

// 字符串数字
padZero('1')                      // => '01'
padZero('5', 3)                   // => '005'

// 处理 0
padZero(0)                        // => '00'
padZero(0, 3)                     // => '000'

// 实际应用：时间格式化
padZero(new Date().getHours())    // => '09' (上午9点)
padZero(9) + ':' + padZero(5)     // => '09:05'
```

---

## padStr

在字符串指定位置插入字符。与 `padString` 功能相同，已废弃，建议使用 `padString`。

```ts
function padStr(text: string, value: string, index?: number): string
```

---

## camelize

将短横线分隔或下划线分隔的字符串转换为驼峰式命名法。

```ts
function camelize(value?: string): string
```

**参数：**
- `value` - 要转换的字符串（默认 `''`）

**示例：**

```ts
// kebab-case 转 camelCase
camelize('tx-js')                 // => 'txJs'
camelize('hello-world')           // => 'helloWorld'
camelize('a-b-c-d')              // => 'aBCD'

// snake_case 转 camelCase
camelize('hello_world')          // => 'helloWorld'
camelize('a_b_c_d')              // => 'aBCD'

// 混合模式
camelize('hello-World')          // => 'helloWorld'
camelize('Hello-World')          // => 'HelloWorld'

// 空字符串
camelize('')                     // => ''

// 实际应用：CSS 属性名转 JS 属性名
camelize('font-size')            // => 'fontSize'
camelize('background-color')     // => 'backgroundColor'
camelize('border-top-left-radius') // => 'borderTopLeftRadius'
```

---

## camelToKebab

将驼峰式命名的字符串转换为短横线分隔的 kebab-case。

```ts
function camelToKebab(input?: string): string
```

**参数：**
- `input` - 要转换的字符串

**示例：**

```ts
// 驼峰转 kebab
camelToKebab('txJs')              // => 'tx-js'
camelToKebab('helloWorld')        // => 'hello-world'

// 首字母大写
camelToKebab('TxJs')              // => 'tx-js'
camelToKebab('HelloWorld')        // => 'hello-world'

// 已有分隔符（保持原样）
camelToKebab('hello-world')       // => 'hello-world'
camelToKebab('hello_world')       // => 'hello_world'

// 实际应用：JS 样式名转 CSS 属性名
camelToKebab('fontSize')          // => 'font-size'
camelToKebab('backgroundColor')   // => 'background-color'
element.style[camelToKebab(prop)]  // 设置样式
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

**参数：**
- `object` - 要遍历的对象
- `iteratee` - 回调函数，接收 key 和 value

**示例：**

```ts
const user = { name: '张三', age: 25, city: '北京' }

// 遍历对象
forEachObject(user, (key, value) => {
  console.log(`${key}: ${value}`)
})
// 输出:
// name: 张三
// age: 25
// city: 北京

// 转换为数组
const entries = []
forEachObject(user, (key, value) => {
  entries.push([key, value])
})
// => [['name', '张三'], ['age', 25], ['city', '北京']]

// 收集键或值
const keys: string[] = []
const values: any[] = []
forEachObject(user, (key, value) => {
  keys.push(key)
  values.push(value)
})

// 空对象
forEachObject({}, (key, value) => {})
// 不执行，无输出
```

---

## callInterceptor

调用拦截器函数，支持异步和同步处理。根据拦截器返回值或 Promise 结果调用 `done` 或 `canceled` 回调。

```ts
function callInterceptor(
  interceptor: Interceptor | undefined,
  options: {
    args?: any[]
    done: () => void
    canceled?: () => void
  }
): void
```

**类型定义：**

```ts
type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void
```

**参数：**
- `interceptor` - 拦截器函数
- `options.args` - 传递给拦截器的参数
- `options.done` - 拦截器返回 `true` 或 Promise resolve 时的回调
- `options.canceled` - 拦截器返回 `false` 或 Promise reject 时的回调

**示例：**

```ts
// 同步拦截器 - 返回 true
callInterceptor(
  () => true,
  {
    done() { console.log('执行操作') },
    canceled() { console.log('取消操作') }
  }
)
// 输出: "执行操作"

// 同步拦截器 - 返回 false
callInterceptor(
  () => false,
  {
    done() { console.log('执行操作') },
    canceled() { console.log('取消操作') }
  }
)
// 输出: "取消操作"

// 异步拦截器 - Promise resolve
callInterceptor(
  () => new Promise(resolve => setTimeout(() => resolve(true), 1000)),
  {
    done() { console.log('执行操作') }
  }
)
// 1秒后输出: "执行操作"

// 异步拦截器 - Promise reject
callInterceptor(
  () => Promise.reject(new Error('failed')),
  {
    done() { console.log('执行操作') },
    canceled() { console.log('取消操作') }
  }
)
// Promise 错误被吞掉，输出: "取消操作"

// 无拦截器
callInterceptor(undefined, {
  done() { console.log('执行操作') }
})
// 输出: "执行操作" (直接执行)

// 实际应用：权限校验
async function handleSubmit() {
  await callInterceptor(checkPermission, {
    args: [user.id, resource.id],
    done: () => { /* 执行操作 */ },
    canceled: () => { /* 显示无权限提示 */ }
  })
}
```

---

## interceptorAll

按顺序依次调用多个拦截器，直到一个拦截器返回 `false` 或所有拦截器执行完毕。

```ts
function interceptorAll(interceptors: Interceptor[], ...args: any[]): Promise<boolean>
```

**返回：**
- `Promise<boolean>` - 返回 `true` 表示所有拦截器都返回了 truthy 值，返回 `false` 表示有拦截器返回了 falsy 值

**参数：**
- `interceptors` - 拦截器函数数组
- `args` - 传递给每个拦截器的参数

**示例：**

```ts
// 所有拦截器都通过
const result1 = await interceptorAll([
  () => true,
  () => true,
  () => true
])
// => true

// 中途有拦截器返回 false
const result2 = await interceptorAll([
  () => true,
  () => false,  // 返回 false，后续不再执行
  () => { console.log('不会执行') }
])
// => false

// 支持异步拦截器
const result3 = await interceptorAll([
  async () => true,
  async () => true
])
// => true

// 混合同步和异步
const result4 = await interceptorAll([
  () => true,
  async () => true,
  () => true
])
// => true

// 传递参数
await interceptorAll(
  [(a, b) => a === b, (a, b) => a > 0],
  5, 5
)
// 第一个: 5 === 5 => true
// 第二个: 5 > 0 => true
// => true

// 空数组
const result5 = await interceptorAll([])
// => true

// 实际应用：表单提交前的多项校验
async function submitForm(data) {
  const validators = [
    () => validateRequired(data.name),
    () => validateEmail(data.email),
    () => validatePassword(data.password)
  ]

  const isValid = await interceptorAll(validators)
  if (isValid) {
    // 提交表单
  } else {
    // 显示错误信息
  }
}
```
