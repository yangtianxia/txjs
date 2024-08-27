import { Chain } from './chain'

export * from './base'

export const chain = function(...args: any[]) {
  return new Chain(...args)
}
