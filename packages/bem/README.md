# @txjs/bem

CSS命名函数，支持CSS modules模式

## 使用 npm

```javascript
npm i @txjs/bem
```

## 使用 pnpm

```javascript
pnpm add @txjs/bem
```

## 使用 yarn

```javascript
yarn add @txjs/bem
```

## 导入方式
```javascript
import BEM from '@txjs/bem'
```

## 参数
- `mode` (类型：`match` | `always`，默认值：`match`)  
  - match：样式类名匹配不存在时，则显示为空
  - always：样式类名匹配不存在时，则显示原始值
- `prefix` (类型：`string`，可选)

## 常规使用

```ts
import BEM from '@txjs/bem'

const [name, bem] = BEM('home')

name
// => home

bem()
// => home

bem(['wrapper'])
// => home home--wrapper

bem('container')
// => home__container

bem('item', ['active'])
// => home__item home__item--active

bem('body', { safearea: false })
// => home__body

bem('body', { safearea: true })
// => home__body home__body--safearea
```

## CSS modules使用

```ts
// css-modules config
{
  enable: true,
  config: {
    auto: true,
    namingPattern: 'module',
    generateScopedName: '[local]_[hash:base64:8]'
  }
}

import BEM from '@txjs/bem'
import css from './index.module.less'

const [name, bem] = BEM('index', css)

name
// => page-index

bem()
// => index

bem('list')
// => index_sdguKKAS 
```