# @txjs/make

> 方法仅用于typescript定义字段

## 支持方法

- [makeString](#makestring)
- [makeStringMap](#makestringmap)
- [makeNumber](#makenumber)
- [makeNumberMap](#makenumbermap)
- [makeArray](#makearray)
- [makeNumeric](#makenumeric)

## 使用示例

### makeString

```ts
const str1 = makeString()
// => string | undefined

const str2 = makeString('Hello, World!')
// => string

type FruitType = 'apple' | 'banana'
const str3 = makeString<FruitType>('apple')
// => FruitType
```

### makeStringMap

```ts
const strMap = makeStringMap(['key1', 'key2'])
// => {key1: number | undefined, key2: number | undefined}

const strMap2 = makeStringMap(['key1', 'key2'], (key) => `${key}-hello world`)
// => {key1: string, key2: string}
```

### makeNumber

```ts
const num1 = makeNumber()
// => number | undefined

const num2 = makeNumber(100)
// => number
```

### makeNumberMap

```ts
const numMap = makeNumberMap(['key1', 'key2'])
// => {key1: number | undefined, key2: number | undefined}

const numMap2 = makeNumberMap(['key1', 'key2'], () => 0)
// => {key1: number, key2: number}
```

### makeArray

```ts
const arr1 = makeArray()
// => any[] | undefined

const arr2 = makeArray([])
// => any[]

const arr3 = makeArray<number>([])
// => number[]

interface Option {
  title: string
  desc: string
}

const arr4 = makeArray<Option>([])
// => Option[]
```

### makeNumeric

> type Numeric = number | string

```ts
const numeric1 = makeNumeric()
// => Numeric | undefined

const numeric2 = makeNumeric(100)
// => Numeric

const numeric3 = makeNumeric('hello world')
// => Numeric
```