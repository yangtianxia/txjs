# @txjs/shared

常用工具函数集合。

## 安装

```bash
pnpm add @txjs/shared
```

```ts
import { omit, cloneDeep } from '@txjs/shared'

// 子路径导入
import { omit } from '@txjs/shared/omit'
```

---

## 对象操作

### omit

删除对象中指定的键，返回新对象。

```ts
function omit<T, K extends keyof T>(target: T, keys: ReadonlyArray<K>): Omit<T, K>
```

```ts
const user = { id: 1, name: '张三', password: 'secret' }

omit(user, ['password'])
// => { id: 1, name: '张三' }
```

### pick

从对象中选取指定的键，返回新对象。

```ts
function pick<T extends object, K extends keyof T>(
  target: T,
  keys: ReadonlyArray<K>,
  ignore?: boolean
): Pick<T, K>
```

`ignore` 为 `true` 时，跳过值为 `null` / `undefined` 的键。

```ts
const user = { id: 1, name: '张三', email: 'zhang@example.com' }

pick(user, ['id', 'name'])
// => { id: 1, name: '张三' }

pick({ a: 1, b: undefined, c: null }, ['a', 'b', 'c'], true)
// => { a: 1 }
```

### shallowMerge

浅合并对象，等效于 `Object.assign`。

```ts
const shallowMerge: typeof Object.assign
```

```ts
shallowMerge({ a: 1 }, { b: 2 })        // => { a: 1, b: 2 }
shallowMerge({ a: 1 }, { a: 2, b: 3 })  // => { a: 2, b: 3 }
```

### forEachObject

遍历对象的键值对。

```ts
function forEachObject<T extends object, K extends keyof T>(
  object: T,
  iteratee: (key: K, value: T[K]) => void
): void
```

```ts
forEachObject({ name: '张三', age: 25 }, (key, value) => {
  console.log(`${key}: ${value}`)
})
// name: 张三
// age: 25
```

### cloneDeep

深度克隆对象或数组，支持 Date、RegExp 和自定义实例。

```ts
function cloneDeep<T>(value: T, instanceClone?: (value: any) => any): T
```

```ts
const original = { user: { name: '李四', tags: ['a', 'b'] } }
const cloned = cloneDeep(original)

cloned.user.name = '王五'
original.user.name  // => '李四'（不受影响）

// 自定义实例克隆
class Person { constructor(public name: string) {} }
cloneDeep(new Person('张三'), v => new Person(v.name))
```

---

## 数组

### toArray

将值包装为数组，`null` / `undefined` 返回 `[]`，已是数组则直接返回。

```ts
function toArray<T>(item?: T | T[]): T[]
```

```ts
toArray(undefined)   // => []
toArray('hello')     // => ['hello']
toArray([1, 2, 3])   // => [1, 2, 3]（同一引用）
```

### chunk

将数组拆分为多个等长子数组。

```ts
function chunk<T>(data?: T[], size?: number): T[][]
```

```ts
chunk([1, 2, 3, 4, 5], 2)  // => [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6], 3)  // => [[1, 2, 3], [4, 5, 6]]
```

---

## 字符串与数字

### padZero

数字前补零，常用于时间格式化。

```ts
function padZero(value: number | string, len?: number): string
```

```ts
padZero(1)     // => '01'
padZero(1, 3)  // => '001'

`${padZero(hours)}:${padZero(minutes)}`  // => '09:05'
```

### padString

在字符串指定位置插入字符。

```ts
function padString(text: string, value: string, index?: number): string
```

```ts
padString('hello', '-', 2)   // => 'he-llo'
padString('hello', '-', -1)  // => 'hell-o'
```

### camelize / camelToKebab

驼峰与 kebab-case 互转。

```ts
function camelize(value?: string): string
function camelToKebab(input?: string): string
```

```ts
camelize('font-size')         // => 'fontSize'
camelToKebab('backgroundColor')  // => 'background-color'
```

### clamp

将数字限制在 `[min, max]` 范围内。

```ts
function clamp(num: number, min: number, max: number): number
```

```ts
clamp(150, 0, 100)   // => 100
clamp(-5, 0, 100)    // => 0
clamp(50, 0, 100)    // => 50
```

### toFixed

四舍五入到指定小数位，返回 `number`（不是字符串）。

```ts
function toFixed(num: number, precision?: number): number
```

```ts
toFixed(3.1415926, 2)  // => 3.14
toFixed(3.1415926, 4)  // => 3.1416
```

---

## 异步与流程控制

### noop

空函数，用于回调默认值或占位。

```ts
function noop(): void
```

```ts
const onSuccess = options.onSuccess ?? noop
promise.catch(noop)
```

### callInterceptor

调用单个拦截器，根据返回值决定继续或取消。支持同步与异步。

```ts
type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void

function callInterceptor(
  interceptor: Interceptor | undefined,
  options: { args?: any[]; done: () => void; canceled?: () => void }
): void
```

- 返回 `true` / `undefined` / `void`：执行 `done`
- 返回 `false`：执行 `canceled`
- `interceptor` 为 `undefined`：直接执行 `done`

```ts
// 弹窗关闭前确认
callInterceptor(props.beforeClose, {
  args: ['close'],
  done: () => emit('close'),
  canceled: () => {},
})

// 无拦截器直接通过
callInterceptor(undefined, {
  done: () => console.log('通过'),
})
```

### interceptorAll

按顺序执行多个拦截器，全部通过返回 `true`，任一返回 `false` 则停止。

```ts
function interceptorAll(interceptors: Interceptor[], ...args: any[]): Promise<boolean>
```

```ts
// 表单提交前多项校验
async function handleSubmit(data) {
  const ok = await interceptorAll([
    () => validateRequired(data.name),
    () => validateEmail(data.email),
    async () => checkUsernameAvailable(data.name),
  ])
  if (ok) submitForm(data)
}
```
