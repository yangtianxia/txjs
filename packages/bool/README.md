# @txjs/bool

用于验证和判断数据类型的 TypeScript 函数库，支持 Node.js 和浏览器环境。

## 安装

```bash
# npm
npm i @txjs/bool

# pnpm
pnpm add @txjs/bool

# yarn
yarn add @txjs/bool
```

## 导入方式

```ts
import { is, isNil, isNumber } from '@txjs/bool'
```

## 函数列表

| 函数 | 说明 |
|------|------|
| [is](#is) | 通用类型验证 |
| [toString](#tostring) | 任意值转字符串 |
| [isArray](#isarray) | 是否为数组 |
| [isBoolean](#isboolean) | 是否为布尔值 |
| [isFunction](#isfunction) | 是否为函数 |
| [isAsyncFunction](#isasyncfunction) | 是否为异步函数 |
| [isInteger](#isinteger) | 是否为正整数（含 0） |
| [isNil](#isnil) | 是否为 null 或 undefined |
| [isNull](#isnull) | 是否为 null |
| [isNumber](#isnumber) | 是否为数字（不含 NaN） |
| [isNumeric](#isnumeric) | 是否为数字或数字字符串 |
| [isString](#isstring) | 是否为字符串 |
| [isSymbol](#issymbol) | 是否为 Symbol |
| [isUndefined](#isundefined) | 是否为 undefined |
| [isDate](#isdate) | 是否为有效 Date 对象 |
| [isPromise](#ispromise) | 是否为 Promise |
| [isPlainObject](#isplainobject) | 是否为普通对象（排除 null） |
| [isPhone](#isphone) | 是否为中国手机号（包含虚拟号段） |
| [isNonVirtualPhone](#isnonvirtualphone) | 是否为非虚拟手机号 |
| [isPhoneNumber](#isphonenumber) | 是否为手机号（同 isPhone，已废弃） |
| [isLandline](#islandline) | 是否为座机号码 |
| [isEmail](#isemail) | 是否为邮箱格式 |
| [isHttpUrl](#ishttpurl) | 是否为 HTTP/HTTPS URL |
| [isAbsoluteUrl](#isabsoluteurl) | 是否为绝对 URL |
| [isURL](#isurl) | 是否为网址 URL（已废弃） |
| [isValidString](#isvalidstring) | 是否为非空字符串（已废弃） |
| [isNonEmptyString](#isnonemptystring) | 是否为非空字符串 |
| [isNonEmptyObject](#isnonemptyobject) | 是否为非空对象 |
| [isBlob](#isblob) | 是否为 Blob 对象 |
| [containsHTML](#containshtml) | 是否包含 HTML 标签 |
| [notNil](#notnil) | 是否不为 null 或 undefined |

---

## is

通用类型验证函数，通过 `Object.prototype.toString` 判断值的类型。

```ts
function is<T = boolean>(value: unknown, type: string): value is T
```

**参数：**
- `value` - 要验证的值
- `type` - 类型名称（如 `'Array'`、`'Object'`、`'Number'` 等）

**示例：**

```ts
// 基本类型判断
is(123, 'Number')           // => true
is('hello', 'String')       // => true
is(true, 'Boolean')         // => true
is(undefined, 'Undefined')   // => true
is(null, 'Null')            // => true

// 引用类型判断
is([], 'Array')             // => true
is({}, 'Object')            // => true
is(new Date(), 'Date')      // => true
is(Symbol('id'), 'Symbol')  // => true

// 错误类型判断
is('123', 'Number')         // => false
is({}, 'Array')             // => false
```

---

## toString

将任意值转换为字符串，行为类似 `String()` 但使用 `Object.prototype.toString` 实现。

```ts
function toString(value: unknown): string
```

**示例：**

```ts
toString(123)              // => "123"
toString(true)             // => "true"
toString([1, 2, 3])        // => "1,2,3"
toString({ a: 1 })         // => "[object Object]"
toString(null)             // => "null"
toString(undefined)        // => "undefined"
```

---

## isArray

检查值是否为数组类型。

```ts
function isArray<T>(value: T): value is T extends Array<any> ? T : never
```

**示例：**

```ts
isArray([])                // => true
isArray([1, 2, 3])         // => true
isArray(new Array())       // => true

isArray('abc')             // => false
isArray({})                // => false
isArray(null)              // => false
```

---

## isBoolean

检查值是否为布尔类型。

```ts
function isBoolean(value: unknown): value is boolean
```

**示例：**

```ts
isBoolean(true)            // => true
isBoolean(false)            // => true

isBoolean(1)                // => false
isBoolean('true')           // => false
isBoolean(Boolean(true))    // => false (Boolean 返回对象，不是 boolean)
```

---

## isFunction

检查值是否为函数类型。

```ts
function isFunction(value: unknown): value is (...args: any[]) => any
```

**示例：**

```ts
isFunction(() => {})                   // => true
isFunction(function () {})             // => true
isFunction(Math.max)                   // => true
isFunction(async function () {})        // => true

isFunction({})                         // => false
isFunction(null)                       // => false
```

---

## isAsyncFunction

检查值是否为异步函数。

```ts
function isAsyncFunction(value: unknown): value is (...args: any[]) => Promise
```

**示例：**

```ts
const asyncFunc = async () => {}
isAsyncFunction(asyncFunc)             // => true

isAsyncFunction(() => {})              // => false
isAsyncFunction(function () {})        // => false
```

---

## isInteger

检查值是否为正整数（含 0）。支持数字和数字字符串。

```ts
function isInteger(value: unknown): value is number
```

**示例：**

```ts
// 数字
isInteger(0)                // => true
isInteger(10)               // => true
isInteger(999)              // => true

// 数字字符串
isInteger('0')              // => true
isInteger('10')             // => true
isInteger('122')            // => true

// 非整数
isInteger(3.14)             // => false
isInteger(-10)              // => false
isInteger('3.14')           // => false
isInteger('abc')            // => false
```

---

## isNil

检查值是否为 `null` 或 `undefined`。

```ts
function isNil(value: unknown): value is null | undefined
```

**示例：**

```ts
isNil(null)                 // => true
isNil(undefined)            // => true
isNil(void 0)               // => true

isNil(0)                    // => false
isNil('')                   // => false
isNil(false)                // => false
isNil({})                   // => false
```

---

## isNull

检查值是否为 `null`。

```ts
function isNull(value: unknown): value is null
```

**示例：**

```ts
isNull(null)                // => true

isNull(undefined)           // => false
isNull(0)                   // => false
isNull('')                  // => false
isNull(false)               // => false
```

---

## isNumber

检查值是否为数字类型（不包括 `NaN`）。

```ts
function isNumber(value: unknown): value is number
```

**示例：**

```ts
isNumber(0)                 // => true
isNumber(3)                 // => true
isNumber(3.14)              // => true
isNumber(-100)              // => true
isNumber(Infinity)          // => true

isNumber('3')               // => false
isNumber(NaN)               // => false
isNumber(null)              // => false
```

---

## isNumeric

检查值是否为数字或数字字符串，常用于表单验证。

```ts
function isNumeric(value: unknown): value is number | string
```

**示例：**

```ts
isNumeric(3)                // => true
isNumeric(3.14)             // => true
isNumeric('3')              // => true
isNumeric('3.14')           // => true
isNumeric('100')            // => true

isNumeric('abc')            // => false
isNumeric('')               // => false
isNumeric(null)             // => false
```

---

## isString

检查值是否为字符串类型。

```ts
function isString(value: unknown): value is string
```

**示例：**

```ts
isString('')                // => true
isString('hello')           // => true
isString('123')             // => true

isString(123)               // => false
isString(true)              // => false
isString(null)              // => false
```

---

## isSymbol

检查值是否为 Symbol 类型。

```ts
function isSymbol(value: unknown): value is symbol
```

**示例：**

```ts
const key = Symbol('key')
isSymbol(key)               // => true
isSymbol(Symbol())           // => true

isSymbol('key')              // => false
isSymbol(123)                // => false
```

---

## isUndefined

检查值是否为 `undefined`。

```ts
function isUndefined(value: unknown): value is undefined
```

**示例：**

```ts
isUndefined(undefined)       // => true
isUndefined(void 0)          // => true

isUndefined(null)            // => false
isUndefined(0)               // => false
isUndefined('')              // => false
```

---

## isDate

检查值是否为有效的 Date 对象。

```ts
function isDate(value: unknown): value is Date
```

**示例：**

```ts
isDate(new Date())                      // => true
isDate(new Date('2023-06-12'))          // => true
isDate(new Date('invalid'))             // => false (Invalid Date)

isDate('2023-06-12')                    // => false (字符串)
isDate(123456)                          // => false (时间戳)
```

---

## isPromise

检查值是否为 Promise 对象。

```ts
function isPromise<T>(value: T): value is T extends Promise<any> ? T : never
```

**示例：**

```ts
isPromise(Promise.resolve())            // => true
isPromise(new Promise(() => {}))        // => true

isPromise({ then: () => {} })           // => false (类似 Promise 的对象)
isPromise(() => {})                      // => false
isPromise(null)                          // => false
```

---

## isPlainObject

检查值是否为普通对象（不包括 `null`），即通过 `{}` 或 `new Object()` 创建的对象。

```ts
function isPlainObject<T>(value: T): value is T extends Record<any, any> ? T : never
```

**示例：**

```ts
isPlainObject({})                       // => true
isPlainObject(new Object())             // => true
isPlainObject({ a: 1, b: 2 })           // => true

isPlainObject(null)                     // => false
isPlainObject([])                       // => false
isPlainObject(new Date())               // => false
isPlainObject(new Map())                 // => false
```

---

## isPhone

检查值是否为有效的中国手机号码（包含虚拟号段 170/171/177/178/190）。

```ts
function isPhone(value: unknown): value is string
```

**支持的号段：**
- 13xxx - 139xxx（中国电信）
- 14xxx - 149xxx（中国移动）
- 15xxx - 153xxx（中国移动/电信）
- 16xxx - 166xxx（中国移动/联通/电信）
- 17xxx - 179xxx（中国移动/联通/电信/虚拟）
- 18xxx - 189xxx（中国移动/联通/电信）
- 19xxx - 199xxx（中国电信/移动/联通）

**示例：**

```ts
isPhone('13566667777')       // => true
isPhone('13812345678')       // => true
isPhone('19912345678')       // => true
isPhone('17012345678')       // => true (虚拟号段)
isPhone('17712345678')       // => true (虚拟号段)

isPhone('134666565')         // => false (位数不足)
isPhone('12345678901')       // => false (位数超限)
isPhone('abc')               // => false
isPhone(13566667777)         // => false (数字类型)
```

---

## isNonVirtualPhone

检查值是否为非虚拟号段的中国手机号码，排除 170/171/177/178/190 开头的号码。

```ts
function isNonVirtualPhone(value: unknown): value is string
```

**示例：**

```ts
isNonVirtualPhone('13566667777')     // => true
isNonVirtualPhone('13987654321')     // => true
isNonVirtualPhone('13812345678')     // => true

isNonVirtualPhone('17012345678')     // => false (虚拟号段)
isNonVirtualPhone('17112345678')     // => false (虚拟号段)
isNonVirtualPhone('17712345678')     // => false (虚拟号段)
isNonVirtualPhone('17812345678')     // => false (虚拟号段)
isNonVirtualPhone('19012345678')     // => false (虚拟号段)
```

---

## isPhoneNumber

检查值是否为手机号码，与 `isPhone` 功能相同。该函数已废弃，建议使用 `isPhone`。

```ts
function isPhoneNumber(value: unknown): value is string
```

---

## isLandline

检查值是否为有效的座机号码，支持带区号和不带区号的格式。

```ts
function isLandline(value: unknown): value is string
```

**支持的格式：**
- `010-12345678` - 区号-号码
- `0592-5966633` - 3位区号-7/8位号码
- `0592-5966633-123` - 带分机号

**示例：**

```ts
isLandline('0592-5966633')           // => true
isLandline('0592-5966633-123')        // => true
isLandline('010-12345678')           // => true
isLandline('800-8888888')             // => true (400/800 客服电话)

isLandline('13215666')               // => false (位数不足)
isLandline('123-4567890')            // => false (格式不符)
isLandline('abc')                     // => false
```

---

## isEmail

检查值是否为有效的邮箱地址。

```ts
function isEmail(value: unknown): boolean
```

**支持的邮箱格式：**
- 普通邮箱：`user@example.com`
- 带点号的邮箱：`user.name@example.com`
- 带加号的邮箱：`user+tag@example.com`
- 带域名前缀的邮箱：`user@subdomain.example.com`

**示例：**

```ts
isEmail('example@gmail.com')          // => true
isEmail('user.name@qq.com')           // => true
isEmail('user+tag@gmail.com')         // => true
isEmail('user@subdomain.example.com') // => true

isEmail('example.com')                // => false (无 @)
isEmail('@example.com')               // => false (无用户名)
isEmail('user@.com')                  // => false (域名格式错误)
```

---

## isHttpUrl

检查值是否为以 `http://` 或 `https://` 开头的 URL。

```ts
function isHttpUrl(value: unknown): value is string
```

**示例：**

```ts
isHttpUrl('http://example.com')       // => true
isHttpUrl('https://example.com')      // => true
isHttpUrl('https://example.com/path')  // => true

isHttpUrl('ftp://example.com')        // => false
isHttpUrl('www.example.com')          // => false
isHttpUrl('/path/to/resource')        // => false
```

---

## isAbsoluteUrl

检查值是否为绝对 URL（包含协议前缀）。

```ts
function isAbsoluteUrl(value: unknown): boolean
```

**示例：**

```ts
isAbsoluteUrl('https://www.example.com')  // => true
isAbsoluteUrl('http://example.com')       // => true
isAbsoluteUrl('file:///path/to/file')     // => true
isAbsoluteUrl('ftp://ftp.example.com')    // => true

isAbsoluteUrl('www.example.com')          // => false
isAbsoluteUrl('/path/to/resource')        // => false
isAbsoluteUrl('./local/path')             // => false
isAbsoluteUrl('c:\\path\\to\\file')       // => false (Windows 路径)
```

---

## isURL

检查值是否为有效的网址 URL。该函数已废弃，建议使用 `isHttpUrl` 或 `isAbsoluteUrl`。

```ts
function isURL(value: unknown): value is string
```

---

## isValidString

检查值是否为非空字符串（不含纯空白）。该函数已废弃，建议使用 `isNonEmptyString`。

```ts
function isValidString(value: unknown): value is string
```

---

## isNonEmptyString

检查值是否为非空字符串。空白字符会被 `trim()` 后再判断。

```ts
function isNonEmptyString(value: unknown): value is string
```

**示例：**

```ts
isNonEmptyString('hello')             // => true
isNonEmptyString('  hello  ')         // => true (首尾空白会被 trim)

isNonEmptyString('')                  // => false
isNonEmptyString('   ')               // => false (纯空白)
isNonEmptyString(null)                // => false
```

---

## isNonEmptyObject

检查值是否为非空对象。

```ts
function isNonEmptyObject<T>(value: T): value is T extends Record<any, any> ? T : never
```

**示例：**

```ts
isNonEmptyObject({ a: 1 })            // => true
isNonEmptyObject({ name: 'test' })    // => true

isNonEmptyObject({})                  // => false
isNonEmptyObject(null)                // => false
isNonEmptyObject([])                  // => false
```

---

## isBlob

检查值是否为 Blob 对象。

```ts
function isBlob(value: unknown): value is Blob
```

**示例：**

```ts
isBlob(new Blob())                     // => true
isBlob(new Blob(['hello'], { type: 'text/plain' })) // => true

isBlob({})                            // => false
isBlob(null)                          // => false
isBlob('blob')                         // => false
```

---

## containsHTML

检查字符串值是否包含 HTML 标签。

```ts
function containsHTML(value: unknown): value is string
```

**示例：**

```ts
containsHTML('<div>Test</div>')               // => true
containsHTML('<img src="image.jpg" />')        // => true
containsHTML('<p class="text">hello</p>')     // => true
containsHTML('<input type="text" />')          // => true

containsHTML('</>')                           // => false (不完整的标签)
containsHTML('1 < 2 && 3 > 4')                // => false (数学表达式)
containsHTML('hello world')                   // => false (纯文本)
containsHTML('<')                              // => false (单个尖括号)
```

---

## notNil

检查值是否不为 `null` 或 `undefined`，与 `isNil` 相反。

```ts
function notNil<T>(value: T): value is T extends null | undefined ? never : T
```

**示例：**

```ts
notNil(0)                    // => true
notNil('')                   // => true
notNil(false)                // => true
notNil({})                   // => true
notNil([])                   // => true
notNil('hello')              // => true
notNil(123)                  // => true

notNil(null)                 // => false
notNil(undefined)            // => false
```
