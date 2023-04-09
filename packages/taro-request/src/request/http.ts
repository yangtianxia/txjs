import type { GeneralCallbackResult, ParamsType } from 'miniprogram-network-utils'
import type { BaseConfiguration, ExtraConfiguration, SuccessParam } from '../life-cycle'
import { LifeCycle } from '../life-cycle'
import { transformRequestSendDefault } from './transform'
import { request } from '@tarojs/taro'
import extend from 'extend'

/**
 * Request Data支持的全部数据格式
 */
type BaseData = string | object | ArrayBuffer | undefined

/**
 * 构造函数 默认配置信息
 * (创建Request的配置信息)
 */
export interface RequestInit<
	T extends {} = {},
	TReturn = any
> extends BaseConfiguration<
	FullRequestOption<T>,
	T & XHR.RequestOption,
	TReturn
> {
	/** response data type */
	responseType?: 'json' | 'text' | 'arraybuffer'
}

export type RequestConfig<
	TParams = ParamsType,
	TExt extends {} = {},
	TReturn = HttpResponse
> = Partial<TExt> & Partial<RequestInit<TExt, TReturn> & ExtraConfiguration> & {
	/**
	 * 路径参数
	 * URL Path Params
	 * the path parameters to be replace in path
	 * Must be a plain `object` or `array`
	 * @example
	 *  url = "/{ID}/status"
	 *  param = {ID: 12345}
	 *  request url will be /1234/status
	 */
	params?: TParams
}

interface UniqueRequestOption<TData> {
	/**
	 * 请求的地址
	 */
	url: string
	/**
	 * 请求方法
	 * HTTP request mthod: GET POST ...
	 */
	method?: XHR.RequestOption['method']
	/**
	 * 请求数据
	 * reqeust data
	 * * **data 数据说明：**
	 *
	 * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
	 *
	 * * 对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
	 * * 对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
	 * * 对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string
	 * （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
	 */
	data?: TData
}

/**
 * 每个HTTP Request请求的全部可配置信息
 * @template TData 数据data的类型限制
 * @template TParams 参数类型
 * @template TExt 扩展信息
 */
export type RequestOption<
	TData extends BaseData = BaseData,
	TParams = ParamsType,
	TExt extends {} = {},
	TReturn = HttpResponse
> = RequestConfig<TParams, TExt, TReturn> & UniqueRequestOption<TData>

/**
 * 发送一个请求的完整可配置信息
 * @template TExtend 扩展信息
 * @template TData 数据data的类型限制
 */
export interface FullRequestOption<
	TExt extends {} = {},
	TData extends BaseData = BaseData,
	TReturn extends any = any
> extends RequestInit<TExt, TReturn>, ExtraConfiguration, UniqueRequestOption<TData> {}

export interface HttpResponse extends GeneralCallbackResult {
	/**
	 * 开发者服务器返回的 HTTP Response Header
	 * 最低基础库： `1.2.0`
	 */
	header: object
	/** 开发者服务器返回的 HTTP 状态码 */
	statusCode: number
	/** 开发者服务器返回的数据 */
	data: string | object | ArrayBuffer
	/**
	 * cookie信息2.4.2以上版本有
	 * 非正式支持
	 */
	cookies?: ({
		domain: string
		httpOnly: boolean
		name: string
		path: string
		value: string
	} | string)[]
}

export declare namespace XHR {
	function reqeust(option: RequestOption): RequestTask
	interface RequestOption {
		/** 开发者服务器接口地址 */
		url: string
		/**
		 * 响应的数据类型
		 * 可选值：
		 * - 'text': 响应的数据为文本
		 * - 'arraybuffer': 响应的数据为 ArrayBuffer
		 *
		 * 最低基础库： `1.7.0`
		 */
		responseType?: 'text' | 'arraybuffer'
		/**
		 * 返回的数据格式
		 * 可选值：
		 * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
		 * - '其他': 不对返回的内容进行 JSON.parse
		 */
		dataType?: 'json' | '其他'
		/**
		 * HTTP 请求方法
		 * 可选值：
		 * - 'OPTIONS': HTTP 请求 OPTIONS
		 * - 'GET': HTTP 请求 GET
		 * - 'HEAD': HTTP 请求 HEAD
		 * - 'POST': HTTP 请求 POST
		 * - 'PUT': HTTP 请求 PUT
		 * - 'DELETE': HTTP 请求 DELETE
		 * - 'TRACE': HTTP 请求 TRACE
		 * - 'CONNECT': HTTP 请求 CONNECT
		 */
		method?: 'OPTIONS' | 'GET' | 'HEAD'	| 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
		/**
		 * 设置请求的 header，header 中不能设置 Referer
		 * `content-type` 默认为 `application/json
		 */
		header?: object
		/**
		 * 请求的参数
		 */
		data?: string | object | ArrayBuffer
		/**
		 * 开启 http2
		 */
		enableHttp2?: boolean
		/**
		 * 开启 quic
		 */
		enableQuic?: boolean
		/**
		 * 开启 缓存
		 */
		enableCache?: boolean
		/**
		 * 开启 HttpDNS
		 */
		enableHttpDNS?: boolean
		/**
		 * HttpDNS 服务商 Id。 HttpDNS 用法详见 移动解析HttpDNS
		 */
		httpDNSServiceId?: string
		/**
		 * 开启 transfer-encoding chunked。
		 */
		enableChunked?: boolean
		/**
		 *  接口调用结束的回调函数（调用成功、失败都会执行）
		 */
		complete?(res: { errMsg: string }): void
		/**
		 *  接口调用失败的回调函数
		 */
		fail?(res: { errMsg: string }): void
		/**
		 *  接口调用成功的回调函数
		 */
		success?(result: HttpResponse): void
	}

	interface RequestTask {
		/**
		 * [RequestTask.abort()](RequestTask.abort.md)
		 * 中断请求任务
		 *
		 * 最低基础库： `1.4.0`
		 */
		abort(): void
		/**
		 * [RequestTask.onHeadersReceived(function callback)](RequestTask.onHeadersReceived.md)
		 * 监听HTTP Response Header 事件，会比请求完成事件更早
		 *
		 * 最低基础库： `2.1.0`
		 */
		onHeadersReceived(
			/** HTTP Response Header 事件的回调函数 */
			callback: (result?: { header: object }) => void
		): void
	}
}

export class Http<TExt extends {} = {}> extends LifeCycle<
	TExt & XHR.RequestOption,
	XHR.RequestTask,
	RequestInit<TExt>,
	FullRequestOption<TExt>
> {
	constructor(
		config?: RequestInit<TExt>,
		_request?: (options: TExt & XHR.RequestOption) => XHR.RequestTask,
		listeners?: Http<TExt>['Listeners']
	) {
		super(
			_request || request,
			config || { transformSend: transformRequestSendDefault } as RequestInit<TExt>,
			listeners
		)
	}

	/**
	 * Object 参数发起请求
	 * @param options 每个请求的全部配置信息，未设置内容使用默认全局配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData request请求参数的格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	request<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(options: RequestOption<TData, TParams, TExt, TReturn>): Promise<TReturn>
	/**
	 * 发送一个 request请求
	 * @param method 操作方法，和小程序一致
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 可转未query string
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData request请求参数的格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	request<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		method: NonNullable<XHR.RequestOption['method']>,
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn>
	request<
		TReturn = SuccessParam<XHR.RequestOption>
	>(): Promise<TReturn> {
		const argsLen = arguments.length
		const options: FullRequestOption<TExt> = argsLen === 1 ? arguments[0] : (arguments[3] || {})

		if (argsLen > 1) {
			options.method = arguments[0] as FullRequestOption['method']
			options.url = arguments[1] as string

			if (argsLen > 2) {
				options.data = arguments[2]
			}
		}

		return this.process(options)
	}

	/**
	 * GET
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 可转为query string
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData get query data请求参数的格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	get<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		return this.request<TReturn>('GET', action, data, config)
	}

	/**
	 * POST
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 操作数据,默认会以json方式上传
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData post data参数格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	post<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		return this.request<TReturn>('POST', action, data, config)
	}

	/**
	 * PUT
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 操作数据,默认会以json方式上传
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData post data参数格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	put<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		return this.request<TReturn>('PUT', action, data, config)
	}

	/**
	 * DELETE
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 操作数据,默认会以json方式上传
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData post data参数格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	delete<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		return this.request<TReturn>('DELETE', action, data, config)
	}

	/**
	 * HEAD
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 操作数据,默认会以json方式上传
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData post data参数格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	head<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		return this.request<TReturn>('HEAD', action, data, config)
	}

	/**
	 * PATCH
	 * 由于小程序不支持PATCH 方法
	 * 采用X-HTTP-Method-Override兼容处理，需要服务器端支持
	 * @param action 请求操作URL,支持{name}格式参数
	 * @param data 操作数据,默认会以json方式上传
	 * @param config 可覆盖默认配置
	 * @template TReturn Promise 返回的格式类型,默认返回微信原始返回数据格式
	 * @template TData patch data参数格式类型,默认 any
	 * @template TParams 路径参数(如`/items/{id}`或者`/{0}/{1}`)的格式类型,默认 任意object或数组
	 */
	patch<
		TReturn = SuccessParam<XHR.RequestOption>,
		TData extends BaseData = BaseData,
		TParams = ParamsType
	>(
		action: string,
		data?: TData,
		config?: RequestConfig<TParams, TExt, TReturn>
	): Promise<TReturn> {
		config ??= {}
		extend(true, config, {
			headers: { 'X-HTTP-Method-Override': 'PATCH' }
		})
		return this.request<TReturn>('HEAD', action, data, config)
	}
}