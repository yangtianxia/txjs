# @txjs/shared

一些常用的函数，包括字符串操作、数据结构处理、数组和对象的深度克隆、拦截器管理等，帮助日常更快捷开发。

## 使用 npm

```javascript
npm i @txjs/shared
```

## 使用 pnpm

```javascript
pnpm add @txjs/shared
```

## 使用 yarn

```javascript
yarn add @txjs/shared
```

## 导入方式
```javascript
import { omit } from '@txjs/shared'
// 或
import { omit } from '@txjs/shared/dist/omit'
```

## 函数列表
+  [noop](#noop)：空函数，什么都不做。
+  [omit](#omit)：从对象中移除指定的属性。
+  [padString](#padstring)：在指定位置插入指定的填充字符。
+  [padZero](#padzero)：在数字前面填充零，直到达到指定的长度。  
+  [pick](#pick)：从对象中选取指定的属性。
+  [toArray](#toarray)：将单个值转换为数组。
+  [callInterceptor](#callinterceptor)：调用并处理拦截器，支持异步和同步处理。
+  [interceptorAll](#interceptorall)：按顺序调用多个拦截器，并处理每个拦截器的返回结果。
+   [camelize](#camelize)：将字符串从 `kebab-case` 或 `snake_case` 转换为 `camelCase` 格式。
+   [clamp](#clamp)：限制一个数字在指定的范围内。
+   [shallowMerge](#shallowmerge)：将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象。
+   [cloneDeep](#clonedeep)：深度克隆对象或数组，支持自定义实例克隆方法。
+   [toFixed](#tofixed)：将数字四舍五入到指定的小数位数。
+   [chunk](#chunk)：将数组拆分为多个子数组，每个子数组的长度由指定的大小决定。
+   [camelToKebab](#cameltoKebab)：将 `camelCase` 格式的字符串转换为 `kebab-case` 格式。

## noop

一个空函数，什么都不做。

### 参数

无

### 示例

```ts
noop()
```

---

## omit

从对象中删除指定的键，并返回新的对象。

### 参数

- `target` （类型：`T`）  
  要操作的原始对象。

- `keys` （类型：`ReadonlyArray<K>`）  
  要删除的键的数组。

### 示例

```ts
const object = { a: 1, b: 2, c: 3 }
omit(object, ['a', 'c'])
// => { b: 2 }
```

---

## padString

在字符串的指定位置填充指定字符。

### 参数

- `text` （类型：`string`）  
  要操作的字符串。

- `value` （类型：`string`）  
  用于填充的字符。

- `index` （类型：`number`，默认值：`0`）  
  填充的位置，默认为 `0`，即在字符串前添加字符。

### 示例

```ts
padString('txjs', '-', 2)
// => tx-js

padString('abc', '-', 0)
// => -abc

padString('abc', '-', -1)
// => ab-c
```

---

## padZero

将数字或字符串填充为指定的长度，使用零进行填充。

### 参数

- `value` （类型：`number | string`）  
  要填充的数字或字符串。

- `len` （类型：`number`，默认值：`2`）  
  填充后的目标长度，默认为 `2`。

### 示例

```ts
padZero(1)
// => 01

padZero(5)
// => 05

padZero(10)
// => 10

padZero(1, 3)
// => 001
```

---

## pick

从对象中选择指定的键，并返回一个新对象。

### 参数

- `target` （类型：`T`）  
  要操作的原始对象。

- `keys` （类型：`ReadonlyArray<K>`）  
  需要选择的键的数组。

- `ignore` （类型：`boolean`，可选，默认值：`false`）  
  是否忽略 `null` 或 `undefined` 的值。

### 示例

```ts
const object = { a: 1, b: 2, c: 3 };
pick(object, ['a', 'c']);
// => { a: 1, c: 3 }
```

---

## toArray

将给定的值转换为数组。如果已经是数组，则返回原数组；如果不是数组，则将其包装成一个数组。

### 参数

- `item` （类型：`T | T[]`）  
  可以是单个值或数组。

### 示例

```ts
toArray([0])
// => [0]

toArray('abc')
// => ['abc']

toArray({})
// => [{}]
```

---

## callInterceptor

调用拦截器，支持异步和同步处理。

### 参数

- `interceptor` （类型：`Interceptor`）  
  拦截器函数。

- `args` （类型：`any[]`，可选）  
  传递给拦截器的参数。

- `done` （类型：`() => void`）  
  拦截器执行完成后的回调。

- `canceled` （类型：`() => void`，可选）  
  拦截器被取消时的回调。

### 示例

```ts
const prom = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, 1000)
})

callInterceptor(prom, {
  done() {
    console.log('done')
  },
  canceled() {
    console.log('canceled')
  }
})
```

---

## interceptorAll

依次调用多个拦截器，直到一个拦截器返回 `false` 或者全部完成。

### 参数

- `interceptors` （类型：`Interceptor[]`）  
  拦截器数组。

- `args` （类型：`any[]`，可选）  
  传递给拦截器的参数。

### 返回值

返回一个 `Promise<boolean>`，表示所有拦截器是否成功执行。

### 示例

```ts
const prom = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, 1000)
})

interceptorAll([prom], a, b)
  .then((result) => console.log(result))
```

---

## camelize

将短横线分隔的字符串转换为驼峰式命名法。

### 参数

- `value` （类型：`string`，默认值：`''`）  
  要转换的字符串。

### 示例

```ts
camelize('tx-js')
// => txJs

camelize('Hello-World')
// => HelloWorld

camelize('a_bc')
// => aBC
```

---

## clamp

限制一个数字在指定的范围内。

### 参数

- `num` （类型：`number`）  
  要限制的数字。

- `min` （类型：`number`）  
  最小值。

- `max` （类型：`number`）  
  最大值。

### 示例

```ts
clamp(2, 10, 99)
// => 10

clamp(100, 10, 99)
// => 99
```

---

## shallowMerge

将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象。

### 参数

- `target` （类型：`T`）  
  目标对象，接收属性复制的对象。

- `sources` （类型：`ReadonlyArray<U>`）  
  一个或多个源对象，从中复制属性到目标对象。

---

## cloneDeep

创建一个对象的深拷贝，支持数组和对象。

### 参数

- `value` （类型：`T`）  
  要进行深拷贝的值。

- `instanceClone` （类型：`InstanceClone<T>`，可选）  
  自定义克隆函数，用于特殊类型的克隆。

### 示例

```ts
cloneDeep([1, 2])
// => [1, 2]

cloneDeep({ a: 1, b: 2 })
// => { a: 1, b: 2 }
```

---

## toFixed

将数字四舍五入到指定的小数位数，并返回结果。

### 参数

- `num` （类型：`number`）  
  要进行四舍五入的数字。

- `precision` （类型：`number`，默认值：`0`）  
  小数位数，默认为 `0`，表示取整。

### 示例

```ts
toFixed(100)
// => 100

toFixed(100, 2)
// => 100

toFixed(3.1415926)
// => 3

toFixed(3.1415926, 2)
// => 3.14
```

---

## chunk

将数组分割成多个小数组。

### 参数

- `data` （类型：`T[]`，默认值：`[]`）  
  要分割的数组。

- `size` （类型：`number`）  
  每个小数组的最大长度。

### 示例

```ts
chunk([1, 2], 1)
// => [[1], [2]]

chunk([1, 2, 3, 4, 5, 6], 2)
// => [[1, 2], [3, 4], [5, 6]]

chunk([1, 2, 3, 4, 5, 6], 4)
// => [[1, 2, 3, 4], [5, 6]]
```

---

## camelToKebab

将驼峰式命名法的字符串转换为短横线分隔的字符串。

### 参数

- `input` （类型：`string`）  
  要转换的字符串。

### 示例

```ts
camelToKebab('TxJs')
// => tx-js

camelToKebab('helloWorld')
// => hello-world
```
