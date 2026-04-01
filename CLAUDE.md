# TxJS Monorepo

## 项目结构

```
txjs/
├── packages/
│   ├── bool/        # 数据类型校验函数库
│   ├── bem/         # CSS命名函数 (BEM规范)
│   ├── shared/      # 常用工具函数库
│   ├── make/        # 数字处理函数
│   ├── types/       # TypeScript类型定义（仅.d.ts）
│   └── validator/   # 表单验证（支持antd/vant）
├── scripts/          # 构建脚本 (build.ts, logger.ts, schema.json)
└── jest.config.ts   # Jest根配置（各包独立配置）
```

## 包说明

### bool

数据类型校验函数库。

**函数**: `is`, `isEqual`, `isEmail`, `isNumeric`, `isHttpUrl`, `isLandline`, `isBlob`, `containsHTML`, `isNonEmptyObject`, `isNonVirtualPhone`

### shared

常用工具函数库。

**函数**: `cloneDeep`, `camelize`, `camelToKebab`, `chunk`, `clamp`, `interceptor`, `interceptorAll`, `noop`, `omit`, `padStr`, `pick`, `toArray`, `shallowMerge`, `toFixed`, `forEachObject`

### bem

CSS命名函数，遵循BEM规范。

### make

数字处理函数库。

### types

仅发布TypeScript类型定义文件（`.d.ts`），无构建产物。

### validator

表单验证库，支持antd和vant组件集成。

## 构建与测试

### 构建流程

每个包的 `package.json` 定义了相同的构建脚本：

```bash
"scripts": {
  "clean": "rimraf ./dist",
  "lint": "eslint ./src --ext .ts",
  "build:types": "tsc -p ./tsconfig.json --emitDeclarationOnly",  # 生成 .d.ts
  "build:bundle": "ts-node ../../scripts/build.ts",               # esbuild打包
  "build": "npm run clean && npm run lint && npm run build:types && npm run build:bundle",
  "test": "jest"
}
```

**构建产物说明：**

- `dist/index.d.ts` - TypeScript声明
- `dist/index.esm.mjs` - ES Module格式
- `dist/index.cjs.js` - CommonJS格式
- `dist/index.min.js` - IIFE压缩格式（部分包）

### 命令

```bash
# 构建所有包
pnpm build

# 构建单个包
pnpm --filter @txjs/bool build

# 测试所有包
pnpm test

# 测试单个包
pnpm --filter @txjs/bool test
```

## 包配置

### build.json

每个包根目录的 `build.json` 定义esbuild入口：

```json
[
  {
    "root": true,
    "iife": true,
    "globalName": "TBool",
    "name": "index",
    "filepath": "index.ts"
  },
  { "name": "isEqual", "filepath": "isEqual.ts" }
  // ...
]
```

- `root: true` - 入口为index，生成完整bundle
- `iife: true` - 同时生成.min.js压缩版本
- `globalName` - IIFE格式的全局变量名

### tsconfig.json

子包继承根配置，排除tests目录避免构建冲突：

```json
{
  "extends": "../../tsconfig",
  "compilerOptions": { "outDir": "./dist", "declaration": true },
  "include": ["src/**/*.ts*", "types/**/*.ts*"],
  "exclude": ["**/node_modules", "**/.*/", "tests/**/*"]
}
```

## 测试

测试文件位于 `packages/<name>/tests/*.test.ts`

**导入方式：** 测试从构建产物导入

```ts
import { isEqual } from '../dist'
```

**Jest配置：** 每个有测试的子包独立配置

- `packages/bool/jest.config.ts`
- `packages/bem/jest.config.ts`
- `packages/shared/jest.config.ts`
- 使用 `ts-jest` 转换TypeScript
- `moduleNameMapper` 将 `../dist` 映射到对应的 CJS 文件

## 依赖关系

```
validator → shared → bool
bem → bool
shared → bool (workspace)
```

## 注意事项

1. **types包** 无需构建，仅包含 `.d.ts` 文件直接发布
2. **validator** 的 `antd.ts` 和 `vant.ts` 是独立的验证器集成
3. **workspace依赖** 使用 `workspace:*` 协议

## CJS 扩展名差异

构建产物中 CJS 文件扩展名不一致：

| 包 | CJS 扩展名 |
|----|-----------|
| bool | `.js` |
| shared | `.js` |
| bem | `.cjs.js` |
| validator | `.js` |
| make | `.js` |
