# TxJS Monorepo

## 项目结构

```
txjs/
├── packages/
│   ├── bool/        # 数据类型校验函数库
│   ├── bem/         # BEM 规范 CSS 类名生成工具
│   ├── shared/      # 通用工具函数库
│   ├── types/       # TypeScript 类型定义（仅 .d.ts，无构建）
│   └── validator/   # 表单验证库（支持 antd / vant）
├── scripts/         # 构建脚本（build.ts、logger.ts、schema.json）
├── jest.config.ts   # Jest 根配置（所有包共用）
└── package.json     # 根工作区配置
```

## 各包说明

| 包 | npm 名称 | 说明 |
|----|---------|------|
| `bool` | `@txjs/bool` | 类型判断与数据校验（邮箱、手机、URL、深比较等） |
| `shared` | `@txjs/shared` | 通用工具集（深拷贝、对象操作、字符串转换、拦截器等） |
| `bem` | `@txjs/bem` | BEM 规范 CSS 类名生成，支持 CSS Modules |
| `types` | `@txjs/types` | 纯 TypeScript 类型定义，直接发布 `.d.ts`，无构建产物 |
| `validator` | `@txjs/validator` | 轻量级表单验证，含 `antd.ts` / `vant.ts` 独立集成入口 |

### bool — 导出函数

`is` · `isEqual` · `isEmail` · `isNumeric` · `isHttpUrl` · `isLandline` · `isBlob` · `containsHTML` · `isNonEmptyObject` · `isNonVirtualPhone` · `isArray` · `isString` · `isNumber` · `isBoolean` · `isFunction` · `isDate` · `isNil` · `notNil` 等

### shared — 导出函数

`cloneDeep` · `camelize` · `camelToKebab` · `chunk` · `clamp` · `interceptor` · `interceptorAll` · `noop` · `omit` · `padStr` · `pick` · `toArray` · `shallowMerge` · `toFixed` · `forEachObject`

## 依赖关系

```
validator → shared → bool
bem       → bool
```

所有跨包依赖使用 `workspace:*` 协议。

## 构建

### 每个包的构建脚本

```bash
clean        # rimraf ./dist
lint         # eslint ./src --ext .ts
build:types  # tsc --emitDeclarationOnly  →  生成 dist/index.d.ts
build:bundle # ts-node ../../scripts/build.ts  →  esbuild 打包
build        # clean → lint → build:types → build:bundle
dev          # build --w（watch 模式）
```

### 构建产物

每个包的 `dist/` 目录包含：

| 文件 | 格式 |
|------|------|
| `index.d.ts` | TypeScript 声明文件 |
| `index.esm.mjs` | ES Module |
| `index.cjs.js` | CommonJS |
| `index.min.js` | IIFE 压缩版（设置了 `iife: true` 的包） |

> `types` 包无需构建，直接发布 `index.d.ts`。

### build.json

每个包根目录的 `build.json` 是 esbuild 的入口配置：

```json
{
  "root": true,
  "iife": true,
  "name": "index",
  "filepath": "index.ts",
  "globalName": "txjs_bool"
}
```

- `root: true` — 构建完整 bundle（入口为 `index.ts`）
- `iife: true` — 额外生成 `index.min.js`（IIFE 格式）
- `globalName` — IIFE 全局变量名

### tsconfig.json（子包）

```json
{
  "extends": "../../tsconfig",
  "compilerOptions": { "outDir": "./dist", "declaration": true },
  "include": ["src/**/*.ts*", "types/**/*.ts*"],
  "exclude": ["**/node_modules", "**/.*/", "tests/**/*"]
}
```

排除 `tests/` 避免测试文件混入构建产物。

## 测试

### 运行命令

```bash
# 所有包
pnpm test

# 单个包（以 bool 为例）
pnpm --filter @txjs/bool test
```

### 配置

测试统一使用根目录 `jest.config.ts`，各包通过 `--testPathPattern` 过滤：

```bash
# packages/bool/package.json 中的 test 脚本
jest --config ../../jest.config.ts --testPathPattern=packages/bool
```

根配置的 `moduleNameMapper` 将 `@txjs/*` 指向对应包的 **源码**（`src/`），测试无需先构建：

```ts
'^@txjs/bool(.*)$':   '<rootDir>/packages/bool/src$1'
'^@txjs/shared(.*)$': '<rootDir>/packages/shared/src$1'
'^@txjs/bem(.*)$':    '<rootDir>/packages/bem/src$1'
```

### 测试文件位置

```
packages/<name>/tests/*.test.ts
```

## 常用命令

```bash
# 构建所有包
pnpm build

# 构建单个包
pnpm --filter @txjs/bool build

# 测试所有包
pnpm test

# 测试单个包
pnpm --filter @txjs/bool test

# 清理所有 dist
pnpm run clean:dist

# 清理所有 node_modules
pnpm run clean:nm
```
