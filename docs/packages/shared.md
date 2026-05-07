# @txjs/shared

常用 TypeScript 工具函数集合，包含深拷贝、对象操作、字符串转换、拦截器管理等。

## 安装

```bash
pnpm add @txjs/shared
```

## 导入

```ts
import { cloneDeep, omit, pick, camelize } from '@txjs/shared'
```

## 函数列表

| 函数 | 说明 |
|------|------|
| `noop` | 空函数 |
| `omit` | 从对象中删除指定的键 |
| `pick` | 从对象中选取指定的键 |
| `shallowMerge` | 浅合并对象 |
| `cloneDeep` | 深克隆对象或数组 |
| `toArray` | 将值转换为数组 |
| `toFixed` | 数字四舍五入到指定精度 |
| `chunk` | 将数组拆分为多个小数组 |
| `clamp` | 限制数字在指定范围内 |
| `padString` | 在字符串指定位置插入字符 |
| `padZero` | 数字前补零 |
| `camelize` | 字符串转驼峰格式 |
| `camelToKebab` | 驼峰格式转 kebab |
| `forEachObject` | 遍历对象键值对 |
| `callInterceptor` | 调用拦截器（支持异步） |
| `interceptorAll` | 依次调用多个拦截器 |

## 对象操作

```ts
import { omit, pick, cloneDeep, shallowMerge } from '@txjs/shared'

const user = { id: 1, name: '张三', password: 'secret', age: 25 }

omit(user, ['password'])
// => { id: 1, name: '张三', age: 25 }

pick(user, ['id', 'name'])
// => { id: 1, name: '张三' }

cloneDeep({ a: { b: [1, 2, 3] } })
// => 深拷贝，修改结果不影响原对象

shallowMerge({ a: 1 }, { b: 2 })
// => { a: 1, b: 2 }
```

## 数组操作

```ts
import { toArray, chunk } from '@txjs/shared'

toArray('hello')       // => ['hello']
toArray([1, 2, 3])     // => [1, 2, 3]
toArray(undefined)     // => []

chunk([1, 2, 3, 4, 5], 2)
// => [[1, 2], [3, 4], [5]]
```

## 数字操作

```ts
import { toFixed, clamp, padZero } from '@txjs/shared'

toFixed(3.14159, 2)    // => 3.14
clamp(15, 0, 10)       // => 10（超出上限）
clamp(-5, 0, 10)       // => 0（低于下限）
padZero(5)             // => '05'
padZero(12)            // => '12'
```

## 字符串操作

```ts
import { camelize, camelToKebab, padString } from '@txjs/shared'

camelize('hello-world')    // => 'helloWorld'
camelize('foo_bar')        // => 'fooBar'

camelToKebab('helloWorld') // => 'hello-world'
camelToKebab('fooBar')     // => 'foo-bar'

padString('1234567890', 3, '-')
// => '123-4567890'
```

## 拦截器

```ts
import { callInterceptor, interceptorAll } from '@txjs/shared'

// 单个拦截器（支持同步/异步/Promise）
callInterceptor(async () => {
  await someAsyncCheck()
}, {
  args: [value],
  done: () => console.log('通过'),
  canceled: () => console.log('取消'),
})

// 多个拦截器依次执行
interceptorAll([interceptor1, interceptor2], {
  args: [value],
  done: () => console.log('全部通过'),
})
```
