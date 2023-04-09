import { Http } from './request/http'

export { CancelToken, type ICancelTokenSource } from 'miniprogram-cancel-token'
export * from './life-cycle'
export * from './request/http'
export * from './request/transform'

export const REQUEST = new Http()