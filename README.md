# txjs

一套简洁实用的 TypeScript 函数库，包括数据类型校验、CSS 命名、常用工具函数等。

## Packages

| 包                          |                                              版本                                               | 说明                    |
| --------------------------- | :---------------------------------------------------------------------------------------------: | ----------------------- |
| [@txjs/bool](#txjsbool)     |   [![npm](https://img.shields.io/npm/v/@txjs/bool)](https://www.npmjs.com/package/@txjs/bool)   | 数据类型的校验工具      |
| [@txjs/bem](#txjsbem)       |    [![npm](https://img.shields.io/npm/v/@txjs/bem)](https://www.npmjs.com/package/@txjs/bem)    | BEM 规范的 CSS 类名生成 |
| [@txjs/shared](#txjsshared) | [![npm](https://img.shields.io/npm/v/@txjs/shared)](https://www.npmjs.com/package/@txjs/shared) | 实用工具集合            |
| [@txjs/types](#txjstypes)   |  [![npm](https://img.shields.io/npm/v/@txjs/types)](https://www.npmjs.com/package/@txjs/types)  | 常用类型定义            |

---

## @txjs/bool

数据类型的校验工具，支持邮箱、手机号、URL、深度相等比较等。

**安装：**

```bash
pnpm add @txjs/bool
```

**函数列表：**

| 函数         | 说明                     |
| ------------ | ------------------------ |
| `is`         | 通用类型验证             |
| `isArray`    | 是否为数组               |
| `isBoolean`  | 是否为布尔值             |
| `isFunction` | 是否为函数               |
| `isNumber`   | 是否为数字（不含 NaN）   |
| `isString`   | 是否为字符串             |
| `isObject`   | 是否为对象               |
| `isNil`      | 是否为 null 或 undefined |
| `isEmail`    | 是否为邮箱格式           |
| `isPhone`    | 是否为中国手机号         |
| `isUrl`      | 是否为 URL               |
| `isEqual`    | 两值是否相等（深度比较） |

**示例：**

```ts
import { isEmail, isPhone, isEqual } from '@txjs/bool'

isEmail('user@example.com') // => true
isPhone('13812345678') // => true
isEqual({ a: 1 }, { a: 1 }) // => true
```

[更多函数 →](./packages/bool/README.md)

---

## @txjs/bem

遵循 BEM 规范的 CSS 类名生成工具，支持 CSS Modules。

**安装：**

```bash
pnpm add @txjs/bem
```

**示例：**

```ts
import { BEM } from '@txjs/bem'

const [name, bem] = BEM('button')

bem()
// => 'button'

bem('text', { small: true })
// => 'button__text button__text--small'

// CSS Modules 模式
const [name, bem] = BEM('button', styles)
bem('text')
// => 'button__text_abc123'
```

[更多用法 →](./packages/bem/README.md)

---

## @txjs/shared

实用工具集合，包含深拷贝、对象操作、字符串转换、拦截器等。

**安装：**

```bash
pnpm add @txjs/shared
```

**函数列表：**

| 函数           | 说明             |
| -------------- | ---------------- |
| `cloneDeep`    | 深度克隆         |
| `omit`         | 删除对象指定属性 |
| `pick`         | 选取对象指定属性 |
| `camelize`     | 字符串转驼峰     |
| `camelToKebab` | 驼峰转 kebab     |
| `clamp`        | 限制数值范围     |
| `chunk`        | 数组分块         |
| `toArray`      | 转数组           |
| `toFixed`      | 保留小数位       |
| `noop`         | 空函数           |

**示例：**

```ts
import { cloneDeep, omit, pick } from '@txjs/shared'

// 深拷贝
cloneDeep({ a: { b: 1 } })

// 删除属性
omit({ a: 1, b: 2, c: 3 }, ['c'])
// => { a: 1, b: 2 }

// 选取属性
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// => { a: 1, c: 3 }
```

[更多函数 →](./packages/shared/README.md)

---

## @txjs/types

常用 TypeScript 类型定义。

**安装：**

```bash
pnpm add @txjs/types
```

---

## 开发

### 环境要求

- Node.js >= 18.12
- pnpm >= 9.x

### 安装依赖

```bash
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

---

## License

MIT © yangtianxia
