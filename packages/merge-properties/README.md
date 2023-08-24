# @txjs/merge-properties

`mergeProperties` 函数用于将属性和方法从一个源对象合并到一个目标对象中。这对于在对象组合和继承场景下，将功能从一个对象传递到另一个对象非常有用。

## 安装

```ts
npm i @txjs/merge-properties
```

## 函数签名和参数

- `target`：目标对象，将要合并属性到此对象。
- `source`：源对象，从此对象获取属性。
- `props`：要合并到目标对象的属性和方法。

```ts
/**
 * 合并属性
 *
 * 从源对象合并属性和方法到目标对象中。
 *
 * @template T - 目标对象的类型。
 * @template C - 源对象的类型。
 * @template P - 要合并的属性的类型。
 *
 * @param {T} target - 目标对象，将要合并属性到此对象。
 * @param {C} source - 源对象，从此对象获取属性。
 * @param {P} props - 将要合并到目标对象的属性。
 *
 * @returns {T & C} 带有从源对象合并属性的目标对象。
 */
const mergeProperties = (target, source, props) => {
  // 实现细节...
}
```

## 使用示例

假设我们有一个名为 `calculator` 的对象，它有一个 `add` 方法和一个 `constant` 属性。我们想要将 `add` 方法绑定到 `calculator` 上，并且合并一个新的属性 `result`。

示例1

```ts
const calculator = {
  constant: 10,
  add(a, b) {
    return a + b + this.constant
  }
}

// 合并属性和方法到一个新对象中
const mergedCalculator = mergeProperties({}, calculator, {
  result: 0
})

// 将 add 方法绑定到 mergedCalculator 上
mergedCalculator.add = mergedCalculator.add.bind(mergedCalculator)

// 使用合并后的属性和方法
console.log(mergedCalculator.add(3, 5))  // 输出：18，因为 3 + 5 + 10（constant） = 18
console.log(mergedCalculator.result)     // 输出：0，初始值
```

示例2

```ts
// 基类 Shape
class Shape {
  constructor(color) {
    this.color = color;
  }

  draw() {
    console.log(`Drawing a shape with color ${this.color}`);
  }
}

const instance = new Shape('red')

function wrap() {}

mergeProperties(wrap, instance, Shape.prototype)
```