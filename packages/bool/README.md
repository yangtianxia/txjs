# @txjs/bool

用于验证和判断数据类型的实用函数

## 使用 npm

```javascript
npm i @txjs/bool
```

## 使用 pnpm

```javascript
pnpm add @txjs/bool
```

## 使用 yarn

```javascript
yarn add @txjs/bool
```

## 导入方式
```javascript
import { is, isNil } from '@txjs/bool'
// 或
import { isNil } from '@txjs/bool/dist/isNil'
```

## 函数列表
+ [toString](#toString)
+ [is](#is)
+ [isArray](#isArray)
+ [isBoolean](#isBoolean)
+ [isFunction](#isFunction)
+ [isAsyncFunction](#isAsyncFunction)
+ [isInteger](#isInteger)
+ [isNil](#isNil)
+ [isNull](#isNull)
+ [isNumber](#isNumber)
+ [isNumeric](#isNumeric)
+ [isPhone](#isPhone)
+ [isNonVirtualPhone](#isNonVirtualPhone)
+ [isPlainObject](#isPlainObject)
+ [isPromise](#isPromise)
+ [isString](#isString)
+ [isSymbol](#isSymbol)
+ [isUndefined](#isUndefined)
+ [isHttpUrl](#isHttpUrl)
+ [isAbsoluteUrl](#isAbsoluteUrl)
+ [isEqual](#isEqual)
+ [isEmail](#isEmail)
+ [isLandline](#isLandline)
+ [containsHTML](#containsHTML)

## toString

将值转为字符串。

```ts
function toString(value: unknown): string;
```

示例:

```ts
toString(123); // "123"
toString(true); // "true"
toString([1, 2, 3]); // "1,2,3"
```

## is

验证 `value` 值类型

```ts
function is(value: unknown, type: string): value is T;
```

示例:

```ts
is(123, 'number'); // true
is({}, 'object'); // true
is([], 'array'); // true
```

## isArray

检查 `value` 是否是 `Array` 类型

```ts
function isArray(value: T): value is T extends Array ? T : never;
```

示例:

```ts
isArray([1, 2, 3]); // true
isArray('abc'); // false
```

## isBoolean

检查 `value` 是否是 `boolean` 类型

```ts
function isBoolean(value: unknown): value is boolean;
```

示例:

```ts
isBoolean(true); // true
isBoolean('true'); // false
```

## isFunction

检查 `value` 是否是 `function` 类型

```ts
function isFunction(value: unknown): value is (...args: any[]) => any;
```

示例:

```ts
isFunction(() => {}); // true
isFunction('string'); // false
```

## isAsyncFunction

检查 `value` 是否是 `async function` 类型

```ts
function isAsyncFunction(value: unknown): value is (...args: any[]) => Promise;
```

示例:

```ts
isAsyncFunction(async () => {}); // true
isAsyncFunction(() => {}); // false
```

## isInteger

检查 `value` 是否是整数，包含 `0`

```ts
function isInteger(value: unknown): value is number;
```

示例:

```ts
isInteger(10); // true
isInteger(3.14); // false
```

## isNil

检查 `value` 是否是 `undefined` 或 `null` 类型

```ts
function isNil(value: unknown): value is null | undefined;
```

示例:

```ts
isNil(null); // true
isNil(undefined); // true
```

## isNull

检查 `value` 是否是 `null` 类型

```ts
function isNull(value: unknown): value is null;
```

示例:

```ts
isNull(null); // true
isNull(undefined); // false
```

## isNumber

检查 `value` 是否是 `number` 类型，值不能为 `NaN`

```ts
function isNumber(value: unknown): value is number;
```

示例:

```ts
isNumber(3); // true
isNumber('3'); // false
```

## isNumeric

检查 `value` 是否是 `number` 类型，支持字符串校验

```ts
function isNumeric(value: unknown): value is number | string;
```

示例:

```ts
isNumeric(3); // true
isNumeric('3'); // true
isNumeric('abc'); // false
```

## isPhone

检查 `value` 是否是手机号码（包含虚拟号段）

```ts
function isPhone(value: unknown): value is string;
```

示例:

```ts
isPhone('13566667777'); // true
isPhone('17012345678'); // false
```

## isNonVirtualPhone

检查 `value` 是否为手机号码（不包含虚拟号段）

```ts
function isNonVirtualPhone(value: unknown): value is string;
```

示例:

```ts
isNonVirtualPhone('13987654321'); // true
isNonVirtualPhone('17712345678'); // false
```

## isPlainObject

检查 `value` 是否是 `object` 类型，不包含 `null` 类型

```ts
function isPlainObject(value: T): value is T extends Record ? T : never;
```

示例:

```ts
isPlainObject({}); // true
isPlainObject(null); // false
```

## isPromise

检查 `value` 是否是 `promise` 类型

```ts
function isPromise(value: T): value is T extends Promise ? T : never;
```

示例:

```ts
isPromise(Promise.resolve()); // true
isPromise({}); // false
```

## isString

检查 `value` 是否是 `string` 类型

```ts
function isString(value: unknown): value is string;
```

示例:

```ts
isString('hello'); // true
isString(123); // false
```

## isSymbol

检查 `value` 是否是 `symbol` 类型

```ts
function isSymbol(value: unknown): value is symbol;
```

示例:

```ts
isSymbol(Symbol('symbol')); // true
isSymbol('symbol'); // false
```

## isUndefined

检查 `value` 是否是 `undefined` 类型

```ts
function isUndefined(value: unknown): value is undefined;
```

示例:

```ts
isUndefined(undefined); // true
isUndefined(null); // false
```

## isHttpUrl

检查 `value` 是否是以 `http` 或 `https` 开头的url

```ts
function isHttpUrl(value: unknown): value is string;
```

示例:

```ts
isHttpUrl('http://example.com'); // true
isHttpUrl('ftp://example.com'); // false
```

## isAbsoluteUrl

检查 `value` 是否是绝对的 URL

```ts
function isAbsoluteUrl(value: unknown): boolean;
```

示例:

```ts
isAbsoluteUrl('http://example.com'); // true
isAbsoluteUrl('/example'); // false
```

## isEqual

检查两个值是否相等

```ts
function isEqual(value: any, other: any, seen?: WeakMap): boolean;
```

示例:

```ts
isEqual({a: 1}, {a: 1}); // true
isEqual([1, 2], [1, 2]); // true
isEqual(1, '1'); // false
```

## isEmail

检查 `value` 是否是 `email` 格式

```ts
export declare function isEmail(value: unknown): boolean;
```

示例:

```ts
isEmail('example@gmail.com'); // true
isEmail('example.com'); // false
```

## isLandline

检查 `value` 是否是座机号码

```ts
export declare function isLandline(value: unknown): value is string;
```

示例:

```ts
isLandline('13215666'); // false
isLandline('0592-5966633'); // true
isLandline('0592-5966633-123'); // true
```

## containsHTML

检查 `value` 是否是包含 `HTML`

```ts
export declare function containsHTML(value: unknown): value is string;
```

示例:

```ts
containsHTML('<div>Test</div>'); // true
containsHTML('<img src='image.jpg' />'); // true
containsHTML('</>'); // false
containsHTML('1 < 2 && 3 > 4'); // false
```
