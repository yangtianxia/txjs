const { build } = require('./build.base')

// 兼容旧构建流程
build({
  filename: 'index',
  root: true
})