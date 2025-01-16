const bundleMultiple = require('../../scripts/build.multiple')

bundleMultiple([
  {
    filename: 'index',
    root: true
  },
  {
    filename: 'instance'
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