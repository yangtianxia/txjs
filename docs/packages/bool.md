# @txjs/bool

数据类型判断与校验工具库，支持 Node.js 和浏览器环境。

## 安装

```bash
pnpm add @txjs/bool
```

## 导入

```ts
import { isEmail, isPhone, isNil } from '@txjs/bool'
```

## 函数列表

| 函数 | 说明 |
|------|------|
| `is` | 通用类型验证（基于 `Object.prototype.toString`） |
| `toString` | 任意值转字符串 |
| `isArray` | 是否为数组 |
| `isBoolean` | 是否为布尔值 |
| `isFunction` | 是否为函数 |
| `isAsyncFunction` | 是否为异步函数 |
| `isInteger` | 是否为正整数（含 0） |
| `isNil` | 是否为 null 或 undefined |
| `isNull` | 是否为 null |
| `isNumber` | 是否为数字（不含 NaN） |
| `isNumeric` | 是否为数字或数字字符串 |
| `isString` | 是否为字符串 |
| `isSymbol` | 是否为 Symbol |
| `isUndefined` | 是否为 undefined |
| `isDate` | 是否为有效 Date 对象 |
| `isPromise` | 是否为 Promise |
| `isPlainObject` | 是否为普通对象（排除 null） |
| `isPhone` | 是否为中国手机号（含虚拟号段） |
| `isNonVirtualPhone` | 是否为非虚拟手机号 |
| `isLandline` | 是否为座机号码 |
| `isEmail` | 是否为邮箱格式 |
| `isHttpUrl` | 是否为 HTTP/HTTPS URL |
| `isAbsoluteUrl` | 是否为绝对 URL |
| `isNonEmptyString` | 是否为非空字符串 |
| `isNonEmptyObject` | 是否为非空对象 |
| `isBlob` | 是否为 Blob 对象 |
| `containsHTML` | 是否包含 HTML 标签 |
| `notNil` | 是否不为 null 或 undefined |

## 示例

```ts
import { isEmail, isPhone, isNil, isNonEmptyString } from '@txjs/bool'

isEmail('user@example.com')   // => true
isPhone('13800138000')        // => true
isNil(null)                   // => true
isNil(undefined)              // => true
isNonEmptyString('  hello  ') // => true
isNonEmptyString('   ')       // => false
```

## 格式校验

```ts
import { isPhone, isNonVirtualPhone, isLandline, isEmail, isHttpUrl } from '@txjs/bool'

// 手机号（含虚拟号段）
isPhone('13800138000')        // => true
isPhone('17012345678')        // => true（虚拟号段）

// 手机号（不含虚拟号段）
isNonVirtualPhone('13800138000') // => true
isNonVirtualPhone('17012345678') // => false

// 座机
isLandline('010-12345678')    // => true
isLandline('0592-5966633')    // => true

// 邮箱
isEmail('user@example.com')   // => true
isEmail('user+tag@gmail.com') // => true

// HTTP URL
isHttpUrl('https://example.com') // => true
isHttpUrl('ftp://example.com')   // => false
```
