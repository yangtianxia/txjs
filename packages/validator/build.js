const bundleMultiple = require('../../scripts/build.multiple')

bundleMultiple([
  {
    filename: 'index',
    root: true
  },
  {
    filename: 'defaults'
  },
  {
    filename: 'locale/zhCN'
  },
  {
    filename: 'locale/enUS'
  }
])