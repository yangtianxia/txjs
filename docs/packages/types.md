# @txjs/types

常用 TypeScript 工具类型，无运行时代码。

## 安装

```bash
pnpm add @txjs/types
```

```ts
import type { Numeric, Writeable } from '@txjs/types'
```

---

## 类型

### Numeric

数字或数字字符串的联合类型。

```ts
type Numeric = number | string
```

```ts
function setWidth(width: Numeric) {
  element.style.width = typeof width === 'number' ? `${width}px` : width
}
```

### Writeable

移除对象所有属性的 `readonly` 修饰符。

```ts
type Writeable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

```ts
interface Config {
  readonly host: string
  readonly port: number
}

function updateConfig(config: Writeable<Config>) {
  config.host = 'localhost'
  config.port = 8080
}
```

### NonNullableProps

将对象所有属性值去除 `null` 和 `undefined`。

```ts
type NonNullableProps<T> = {
  [p in keyof T]: NonNullable<T[p]>
}
```

```ts
interface Form {
  name?: string | null
  age?: number | null
}

// NonNullableProps<Form> = { name: string; age: number }
function submit(data: NonNullableProps<Form>) { ... }
```

### NonNullableParams

将函数参数类型去除 `null` 和 `undefined`。

```ts
type NonNullableParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never
```

```ts
type Handler = (id: number | null, name?: string) => void
type StrictHandler = NonNullableParams<Handler>
// => (id: number, name: string) => void
```

### UnknownCallback

通用回调函数类型。

```ts
type UnknownCallback<T = unknown, U = void> = (...args: T[]) => U
```

```ts
const handler: UnknownCallback<string, boolean> = (...args) => {
  return args.every(s => s.length > 0)
}
```

### KebabCase

将驼峰字符串字面量类型转为 kebab-case（仅类型层面）。

```ts
type KebabCase<S extends string> = ...
```

```ts
type A = KebabCase<'helloWorld'>       // => 'hello-world'
type B = KebabCase<'backgroundColor'>  // => 'background-color'
```

移除对象所有属性的 `readonly` 修饰符。

```ts
type Writeable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

```ts
interface Config {
  readonly host: string
  readonly port: number
}

function updateConfig(config: Writeable<Config>) {
  config.host = 'localhost'
  config.port = 8080
}
```

### NonNullableProps

将对象所有属性值去除 `null` 和 `undefined`。

```ts
type NonNullableProps<T> = {
  [p in keyof T]: NonNullable<T[p]>
}
```

```ts
interface Form {
  name?: string | null
  age?: number | null
}

// NonNullableProps<Form> = { name: string; age: number }
function submit(data: NonNullableProps<Form>) { ... }
```

### NonNullableParams

将函数参数类型去除 `null` 和 `undefined`。

```ts
type NonNullableParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never
```

```ts
type Handler = (id: number | null, name?: string) => void
type StrictHandler = NonNullableParams<Handler>
// => (id: number, name: string) => void
```

### UnknownCallback

通用回调函数类型。

```ts
type UnknownCallback<T = unknown, U = void> = (...args: T[]) => U
```

```ts
const handler: UnknownCallback<string, boolean> = (...args) => {
  return args.every(s => s.length > 0)
}
```

### KebabCase

将驼峰字符串字面量类型转为 kebab-case（仅类型层面）。

```ts
type KebabCase<S extends string> = ...
```

```ts
type A = KebabCase<'helloWorld'>       // => 'hello-world'
type B = KebabCase<'backgroundColor'>  // => 'background-color'
```
