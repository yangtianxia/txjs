const bundleMultiple = require('../../scripts/build.multiple')

bundleMultiple([
  {
    filename: 'index',
    root: true
  },
  {
    filename: 'is'
  },
  {
    filename: 'isArray'
  },
  {
    filename: 'isBoolean'
  },
  {
    filename: 'isFunction'
  },
  {
    filename: 'isAsyncFunction'
  },
  {
    filename: 'isInteger'
  },
  {
    filename: 'isNil'
  },
  {
    filename: 'isNull'
  },
  {
    filename: 'isNumber'
  },
  {
    filename: 'isNumeric'
  },
  {
    filename: 'isPhoneNumber'
  },
  {
    filename: 'isPhone'
  },
  {
    filename: 'isNonVirtualPhone'
  },
  {
    filename: 'isPlainObject'
  },
  {
    filename: 'isPromise'
  },
  {
    filename: 'isString'
  },
  {
    filename: 'isSymbol'
  },
  {
    filename: 'isUndefined'
  },
  {
    filename: 'isURL'
  },
  {
    filename: 'isHttpUrl'
  },
  {
    filename: 'isAbsoluteUrl'
  },
  {
    filename: 'isValidString'
  },
  {
    filename: 'isNonEmptyString'
  },
  {
    filename: 'notNil'
  },
  {
    filename: 'isDate'
  },
  {
    filename: 'isEqual'
  },
  {
    filename: 'isEmail'
  },
  {
    filename: 'isLandline'
  },
  {
    filename: 'containsHTML'
  }
])