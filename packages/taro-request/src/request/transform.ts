import type { FullRequestOption, HttpResponse, XHR } from './http'
import { buildParams, getCommonOptions } from 'miniprogram-network-utils'

export type RequestParams = Omit<
	XHR.RequestOption,
	| 'success'
	| 'fail'
	| 'complete'
>

/**
 * 构建请求参数
 * @param data - 完整配置参数
 */
export function transformRequestSendDefault<TExt extends {} = {},>(data: FullRequestOption<TExt>): RequestParams {
  const TaroParam: RequestParams = {
    url: buildParams(data.url, data.params, data.baseURL),
    header: data.headers
  }

  if (data.responseType === 'arraybuffer') {
    TaroParam.responseType = 'arraybuffer'
  } else if (data.responseType === 'json') {
    TaroParam.dataType = 'json'
  }

  return getCommonOptions(TaroParam, data, [
    'data',
    'method',
    'enableCache',
    'enableChunked',
    'enableHttp2',
    'enableHttpDNS',
    'enableQuic',
    'httpDNSServiceId'
  ])
}

/**
 * 返回请求成功的响应数据data部分
 * statusCode 2xx 操作成功仅返回data数据
 * 否则抛出错误(rejected)
 * @param res - 返回结果
 * @param config - 完整配置参数
 */
export function transformRequestResponseOkData<T = any>(
  res: HttpResponse,
  config: FullRequestOption
): T {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data as any as T
  }
  throw res
}