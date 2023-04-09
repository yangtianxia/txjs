# @txjs/bem

> css命名方法，支持css-modules绑定使用

## npm安装

```javascript
npm i @txjs/bem
```

## 常规使用

```ts
import Bem from '@txjs/bem'

const [name, bem] = Bem('home')

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

## css-modules使用

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

import Bem from '@txjs/bem'
import css from './index.module.less'

const [name, bem] = Bem('index', css)

name
// => index

bem()
// => index

bem('list')
// => index__sdguKKAS 
```