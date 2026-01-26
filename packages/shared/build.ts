import { batchBuilder } from '../../scripts/build'

batchBuilder([
  {
    root: true,
    iife: true,
    globalName: 'TShared',
    name: 'index',
    filepath: 'index.ts',
  },
  {
    name: 'noop',
    filepath: 'noop.ts',
  },
  {
    name: 'omit',
    filepath: 'omit.ts',
  },
  {
    name: 'padStr',
    filepath: 'padStr.ts',
  },
  {
    name: 'padString',
    filepath: 'padString.ts',
  },
  {
    name: 'padZero',
    filepath: 'padZero.ts',
  },
  {
    name: 'pick',
    filepath: 'pick.ts',
  },
  {
    name: 'toArray',
    filepath: 'toArray.ts',
  },
  {
    name: 'interceptor',
    filepath: 'interceptor.ts',
  },
  {
    name: 'interceptorAll',
    filepath: 'interceptorAll.ts',
  },
  {
    name: 'camelize',
    filepath: 'camelize.ts',
  },
  {
    name: 'clamp',
    filepath: 'clamp.ts',
  },
  {
    name: 'shallowMerge',
    filepath: 'shallowMerge.ts',
  },
  {
    name: 'cloneDeep',
    filepath: 'cloneDeep.ts',
  },
  {
    name: 'toFixed',
    filepath: 'toFixed.ts',
  },
  {
    name: 'chunk',
    filepath: 'chunk.ts',
  },
  {
    name: 'camelToKebab',
    filepath: 'camelToKebab.ts',
  },
  {
    name: 'forEachObject',
    filepath: 'forEachObject.ts',
  },
])
