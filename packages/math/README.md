# @txjs/math

> 加减乘除计算

## npm安装

```javascript
npm i @txjs/math
```

## 支持方法

```typescript
import { Chain, multiply, subtract, addition, divide } from 'fixmath'

type ValueType = number

type ImplementType = 'multiply' | 'subtract' | 'addition' | 'divide'

/** 链式运算 */
export function Chain(numb?: ValueType | ValueType[], type?: ImplementType): {
  /** 乘法 */
  multiply(multiplicand: ValueType): ReturnType<typeof Chain>
  /** 减法 */
  subtract(subtract): ReturnType<typeof Chain>
  /** 加法 */
  addition(addend: ValueType): ReturnType<typeof Chain>
  /** 除法 */
  divide(divisor: ValueType): ReturnType<typeof Chain>
  /** 结果值 */
  getValue(): number
}

/** 乘法 */
export function multiply(multiplier: ValueType, multiplicand: ValueType): number

/** 减法 */
export function subtract(minuend: ValueType, subtrahend: ValueType): number

/** 加法 */
export function addition(augend: ValueType, addend: ValueType): number

/** 除法 */
export function divide(dividend: ValueType, divisor: ValueType): number
```

## e.g

```typescript
import { Chain, multiply, subtract, addition, divide } from 'fixmath'

/** 链式运算 */
const num = new Chain(1)
num.addition(1)
num.getValue() // 2
// 或
num.value

/** 乘法 */
multiply(0.1, 0.2) // 0.02
// 默认
0.1 * 0.2 // 0.020000000000000004

/** 减法 */
subtract(0.3, 0.2) // 0.1
// 默认
0.3 - 0.2 // 0.09999999999999998

/** 加法 */
addition(0.1, 0.2) // 0.3
// 默认
0.1 + 0.2 // 0.30000000000000004

/** 除法 */
divide(0.3, 0.1) // 3
// 默认
0.3 / 0.1 // 2.9999999999999996
```