const bundleMultiple = require('../../scripts/build.multiple')

bundleMultiple([
  {
    filename: 'index',
    root: true
  },
  {
    filename: 'noop'
  },
  {
    filename: 'omit'
  },
  {
    filename: 'padStr'
  },
  {
    filename: 'padString'
  },
  {
    filename: 'padZero'
  },
  {
    filename: 'pick'
  },
  {
    filename: 'toArray'
  },
  {
    filename: 'interceptor'
  },
  {
    filename: 'interceptorAll'
  },
  {
    filename: 'camelize'
  },
  {
    filename: 'clamp'
  },
  {
    filename: 'shallowMerge'
  },
  {
    filename: 'cloneDeep'
  },
  {
    filename: 'toFixed'
  },
  {
    filename: 'chunk'
  },
  {
    filename: 'camelToKebab'
  }
])