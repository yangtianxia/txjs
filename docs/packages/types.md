# @txjs/types

常用 TypeScript 类型定义，纯类型包，无运行时代码。

## 安装

```bash
pnpm add @txjs/types
```

## 使用

所有导入必须使用 `import type`：

```ts
import type { Numeric, Interceptor } from '@txjs/types'
```

## 类型列表

### Numeric

数字或数字字符串的联合类型，常用于接受两种形式输入的场景。

```ts
type Numeric = number | string
```

**示例：**

```ts
function setWidth(width: Numeric) {
  element.style.width = typeof width === 'number' ? `${width}px` : width
}

setWidth(100)     // 数字
setWidth('100px') // 字符串
```

---

### Interceptor

拦截器函数类型，与 `@txjs/shared` 中的 `callInterceptor` 配合使用。

```ts
type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void
```

**说明：**
- 返回 `true` 或 `undefined`/`void`：表示通过，继续执行
- 返回 `false`：表示拦截，停止执行
- 返回 `Promise<boolean>`：支持异步场景

**示例：**

```ts
import type { Interceptor } from '@txjs/types'
import { callInterceptor } from '@txjs/shared'

const beforeClose: Interceptor = async () => {
  return await confirmDialog('确定关闭？')
}

callInterceptor(beforeClose, {
  done: () => closeModal(),
  canceled: () => console.log('取消关闭'),
})
```

---

### UnknownCallback

通用回调函数类型，接受任意类型参数并返回指定类型。

```ts
type UnknownCallback<T = unknown, U = void> = (...args: T[]) => U
```

**示例：**

```ts
import type { UnknownCallback } from '@txjs/types'

const handler: UnknownCallback<string, boolean> = (...args) => {
  return args.every(s => s.length > 0)
}
```

---

### Writeable

移除对象类型中所有属性的 `readonly` 修饰符。

```ts
type Writeable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

**示例：**

```ts
import type { Writeable } from '@txjs/types'

interface Config {
  readonly host: string
  readonly port: number
}

// Writeable<Config> = { host: string; port: number }
function updateConfig(config: Writeable<Config>) {
  config.host = 'localhost'  // 可以修改
  config.port = 8080
}
```

---

### NonNullableProps

将对象类型中所有属性的值类型去除 `null` 和 `undefined`。

```ts
type NonNullableProps<T> = {
  [p in keyof T]: NonNullable<T[p]>
}
```

**示例：**

```ts
import type { NonNullableProps } from '@txjs/types'

interface Form {
  name?: string | null
  age?: number | null
}

// NonNullableProps<Form> = { name: string; age: number }
function submit(data: NonNullableProps<Form>) {
  // 此时 data.name 和 data.age 保证非空
}
```

---

### NonNullableParams

将函数参数类型中所有参数去除 `null` 和 `undefined`。

```ts
type NonNullableParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never
```

**示例：**

```ts
import type { NonNullableParams } from '@txjs/types'

type Handler = (id: number | null, name?: string) => void
// NonNullableParams<Handler> = (id: number, name: string) => void
```

---

### KebabCase

将驼峰字符串类型字面量转换为 kebab-case 类型字面量（类型层面的转换）。

```ts
type KebabCase<S extends string> = ...
```

**示例：**

```ts
import type { KebabCase } from '@txjs/types'

type A = KebabCase<'helloWorld'>    // => 'hello-world'
type B = KebabCase<'fontSize'>      // => 'font-size'
type C = KebabCase<'backgroundColor'> // => 'background-color'
```
