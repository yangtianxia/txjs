# @txjs/types

项目包含了一些通用的 TypeScript 类型定义，可以简化代码中的类型处理，提升代码的安全性和可读性。

## 全局类型定义

### 1. `Numeric`

`Numeric` 类型用于表示一个数值，该数值可以是 `number` 或 `string` 类型。

```typescript
type Numeric = number | string
```

#### 示例：

```typescript
let id: Numeric = 123
id = '456' // 允许数字或字符串类型
```

### 2. `UnknownCallback<T = unknown, U = void>`

`UnknownCallback` 用于表示一个通用的回调函数类型，接收未知类型的参数并返回指定类型的值（默认 `void`）

```typescript
type UnknownCallback<T = unknown, U = void> = (...args: T[]) => U
```

#### 示例：

```typescript
const callback: UnknownCallback<string, number> = (arg1, arg2) => {
  console.log(arg1, arg2)
  return arg1.length + arg2.length
}
```

### 3. `Writeable<T>`

`Writeable` 类型将对象 `T` 的所有属性设为可写属性。适用于对象属性默认 `readonly`，但需要临时更改的场景

```typescript
type Writeable<T> = { -readonly [P in keyof T]: T[P] }
```

#### 示例：

```typescript
interface ReadOnlyProps {
  readonly name: string
  readonly age: number
}

const writablePerson: Writeable<ReadOnlyProps> = { name: 'John', age: 30 }
writablePerson.age = 31 // 可以修改 age 属性
```

### 4. `NonNullableProps<T>`

`NonNullableProps` 将对象 `T` 的所有属性去除 `null` 和 `undefined` 类型，保证属性不为空

```typescript
type NonNullableProps<T> = { [P in keyof T]: NonNullable<T[P]> }
```

#### 示例：

```typescript
interface NullableProps {
  name?: string | null
  age?: number | null
}

const nonNullablePerson: NonNullableProps<NullableProps> = { name: 'Alice', age: 25 }
```

### 5. `NonNullableParams<T>`

`NonNullableParams` 用于将函数类型 `T` 的参数去除 `null` 和 `undefined` 类型，确保参数不为空

```typescript
type NonNullableParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never
```

#### 示例：

```typescript
type FuncWithNullableParams = (a?: string, b?: number) => void

const func: NonNullableParams<FuncWithNullableParams> = (a, b) => {
  console.log(a, b)
}

func('hello', 123) // 正确使用
```

### 6. `KebabCase`

`KebabCase` 类型用于将一个字符串类型转换为`kebab-case`格式（即所有字母小写，单词之间用连字符 `-` 连接）。该类型采用递归的方式处理字符串，将字符串中的大写字母转换为小写，并在大写字母前插入 `-` 连接符。

```typescript
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S
```

#### 示例：

```typescript
type KebabExample = KebabCase<'HelloWorld'> // 结果为 'hello-world'
type KebabExample2 = KebabCase<'FooBarBaz'> // 结果为 'foo-bar-baz'
``` 

## 贡献

如有改进建议或其他类型需求，欢迎提交 Issue 或 PR。希望这些类型定义能够在小程序开发中为您提供帮助
