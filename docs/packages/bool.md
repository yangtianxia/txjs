# @txjs/bool

类型判断与格式校验工具库。所有函数均为 TypeScript 类型守卫，可在条件分支中自动收窄类型。

## 安装

```bash
pnpm add @txjs/bool
```

```ts
import { isEmail, isNil, notNil } from '@txjs/bool'

// 子路径导入
import { isEmail } from '@txjs/bool/isEmail'
```

---

## 类型判断

### isNil / notNil

```ts
function isNil(value: unknown): value is null | undefined
function notNil<T>(value: T): value is NonNullable<T>
```

```ts
isNil(null)       // true
isNil(undefined)  // true
isNil(0)          // false

notNil(0)         // true
notNil(null)      // false
```

### isString / isNumber / isBoolean

```ts
function isString(value: unknown): value is string
function isNumber(value: unknown): value is number   // NaN 返回 false
function isBoolean(value: unknown): value is boolean
```

```ts
isString('hello')   // true
isNumber(3.14)      // true
isNumber(NaN)       // false
isBoolean(false)    // true
```

### isArray

```ts
function isArray<T>(value: T): value is T extends Array<any> ? T : never
```

```ts
isArray([1, 2, 3])  // true
isArray('abc')      // false
```

### isFunction / isAsyncFunction

```ts
function isFunction(value: unknown): value is (...args: any[]) => any
function isAsyncFunction(value: unknown): value is (...args: any[]) => Promise<any>
```

```ts
isFunction(Math.max)         // true
isAsyncFunction(async () => {})  // true
isAsyncFunction(() => {})        // false
```

### isPlainObject

```ts
function isPlainObject<T>(value: T): value is T extends Record<any, any> ? T : never
```

`{}` 或 `new Object()` 创建的对象返回 `true`，`null`、数组、Date、Map 等返回 `false`。

```ts
isPlainObject({ a: 1 })   // true
isPlainObject([])          // false
isPlainObject(new Map())   // false
```

### isDate / isPromise / isSymbol / isBlob

```ts
function isDate(value: unknown): value is Date        // Invalid Date 返回 false
function isPromise<T>(value: T): value is T extends Promise<any> ? T : never
function isSymbol(value: unknown): value is symbol
function isBlob(value: unknown): value is Blob
```

```ts
isDate(new Date())               // true
isDate(new Date('invalid'))      // false
isPromise(Promise.resolve())     // true
```

### isNull / isUndefined

```ts
function isNull(value: unknown): value is null
function isUndefined(value: unknown): value is undefined
```

### isInteger / isNumeric

```ts
function isInteger(value: unknown): value is number  // 正整数（含 0），支持数字字符串
function isNumeric(value: unknown): value is number | string
```

```ts
isInteger(10)     // true
isInteger('10')   // true
isInteger(3.14)   // false

isNumeric('3.14') // true
isNumeric('abc')  // false
```

### is / toString

```ts
function is<T = boolean>(value: unknown, type: string): value is T
function toString(value: unknown): string
```

```ts
is([], 'Array')       // true
is({}, 'Object')      // true
toString(null)        // "null"
toString([1, 2])      // "1,2"
```

---

## 字符串与对象

### isNonEmptyString

```ts
function isNonEmptyString(value: unknown): value is string
```

`trim()` 后判断，纯空白返回 `false`。

```ts
isNonEmptyString('hello')   // true
isNonEmptyString('   ')     // false
isNonEmptyString('')        // false
```

### isNonEmptyObject

```ts
function isNonEmptyObject<T>(value: T): value is T extends Record<any, any> ? T : never
```

```ts
isNonEmptyObject({ a: 1 })  // true
isNonEmptyObject({})        // false
```

### containsHTML

```ts
function containsHTML(value: unknown): value is string
```

```ts
containsHTML('<div>test</div>')  // true
containsHTML('hello world')     // false
```

---

## 格式校验

### isPhone / isNonVirtualPhone

```ts
function isPhone(value: unknown): value is string
function isNonVirtualPhone(value: unknown): value is string
```

`isPhone` 包含虚拟号段（170/171/177/178/190），`isNonVirtualPhone` 排除。

```ts
isPhone('13566667777')         // true
isPhone('17012345678')         // true（虚拟号段）
isNonVirtualPhone('17012345678')  // false
```

### isLandline

```ts
function isLandline(value: unknown): value is string
```

支持格式：`010-12345678`、`0592-5966633-123`（含分机号）。

```ts
isLandline('010-12345678')      // true
isLandline('0592-5966633-123')  // true
```

### isEmail

```ts
function isEmail(value: unknown): boolean
```

```ts
isEmail('user@example.com')   // true
isEmail('example.com')        // false
```

### isHttpUrl / isAbsoluteUrl

```ts
function isHttpUrl(value: unknown): value is string   // 必须 http:// 或 https://
function isAbsoluteUrl(value: unknown): boolean       // 任意协议前缀
```

```ts
isHttpUrl('https://example.com')   // true
isHttpUrl('ftp://example.com')     // false

isAbsoluteUrl('ftp://example.com') // true
isAbsoluteUrl('/path/to/file')     // false
```
