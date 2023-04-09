import type { GeneralCallbackResult } from 'miniprogram-network-utils'
import type { BaseConfiguration, ExtraConfiguration, SuccessParam, TaroOptions, TaroTask } from './configuration'
import { isNil, isPlainObject, isFunction, isInteger } from '@txjs/bool'
import { env } from '@tarojs/taro'
import { mergeConfig } from './configuration'
import { ensureOnline } from './network'
import { Listeners } from './listeners'

interface TimeRecorder {
	send?: number
	response?: number
}

interface ExtraCompleteRes {
	/**
	 * 请求时间戳
	 */
	time?: TimeRecorder
}

/** 超时错误标记 */
function timeoutErrorThrow(
	result: GeneralCallbackResult,
	time?: number
) {
	let errMsg = result.errMsg
	result.errMsg = errMsg ? errMsg.replace(':fail abort', `:fail timeout ${time}`) : `network:fail timeout ${time}`
	result.timeout = true
	return result
}

export abstract class LifeCycle<
	TTaroOptions extends TaroOptions,
	TTaroTask extends TaroTask,
	TInitConfig extends BaseConfiguration<TFullOptions, TTaroOptions>,
	TFullOptions extends TInitConfig & ExtraConfiguration = TInitConfig & ExtraConfiguration
> {
	/**
   * 默认全局配置
   * 对此实例的每个请求生效,优先级低于每个请求的自定义配置
   * 除`header`属性会将请求自定义配置和默认配置进行合并
   * 其余设置会直接覆盖
   */
	readonly Defaults: TInitConfig

	/**
   * 全局事件监听列表 Listeners
   * 每次触发特定类型事件会通知对应的全部 Listeners
   * 包括 `onResponse`,`onResponse`,`onComplete`,`onRejected`,`onAbort`
   * 原则上不应该在事件回调中修改数据
   */
	readonly Listeners: Readonly<
		Listeners<
			TFullOptions,
			SuccessParam<TTaroOptions>
		>
	>

	readonly handle: (option: TTaroOptions) => TTaroTask

	protected constructor(
		operator: (option: TTaroOptions) => TTaroTask,
		config: TInitConfig,
		listeners: Readonly<
			Listeners<
				TFullOptions,
				SuccessParam<TTaroOptions>
			>
		> = new Listeners()
	) {
		this.handle = operator
		this.Defaults = config
		this.Listeners = listeners

		if (isNil(config.retry)) {
			this.Defaults.retry = 1
		}

		if (isNil(config.headers)) {
			this.Defaults.headers = {}
		}
	}

	/**
   * 处理请求
   * @param options 请求参数,不包括默认参数
   */
	protected process<T = SuccessParam<TTaroOptions>>(options: TFullOptions): Promise<T> {
		options = mergeConfig(options, this.Defaults)
		return this.onSend(options)
			.then((param) => {
				if (options.timestamp) {
					if (isPlainObject(options.timestamp)) {
						options.timestamp.response = Date.now()
					} else {
						options.__sendTime = Date.now()
					}
				}
				return this.send<T>(param as TTaroOptions, options)
			})
	}

	/**
   * 请求发送之前处理数据
   * @param options 完整参数
   */
	private onSend(options: TFullOptions): Promise<Omit<TTaroOptions, 'complete' | 'success' | 'fail'>> {
		this.Listeners.onSend.forEach((fn) => {
			fn(options)
		})
		return Promise
			.resolve(options)
			.then(options.transformSend)
	}

	/**
   * 发送网络请求,并自动重试
   * @param data 发送参数
   * @param options 全部配置
   */
	private send<T>(data: TTaroOptions, options: TFullOptions): Promise<T> {
		return new Promise((resolve, reject) => {
			/** 是否结束 */
			let completed = false
			/**
       * 超时定时器
       * * null 表示未启用
       * * 0 表示已经触发超时
       * * 正数 表示真在计时中(未超时)
       */
			let timeoutHandle: number | null

			const cancelToken = options.cancelToken
			if (cancelToken) {
				cancelToken.throwIfRequested()
			}

			data.success = (res: SuccessParam<TTaroOptions>) => {
				completed = true
				this.response<T>(res, options)
					.then(resolve, reject)
			}

			// try retry
			data.fail = (res: GeneralCallbackResult) => {
				if (timeoutHandle === 0) {
					timeoutErrorThrow(res, options.timeout)
				}

				if (cancelToken && cancelToken.isCancelled()) {
					// 用户主动取消，直接结束不再重连
					res.cancel = true
				} else if (isFunction(options.retry)) {
					// 自定义retry函数
					Promise.resolve()
						.then(() => (options.retry! as Function)(data, res))
						.then(
							// 继续重试
							(retryData: TTaroOptions) => {
								this.send<T>(retryData, options)
									.then(resolve, reject)
							},
							// 放弃重试
							(reason: GeneralCallbackResult) => {
								this.onFail(reason, options)
									.then(reject, reject)
								this.complete(reason, options)
							}
						)
					return
				} else if (isInteger(options.retry) && options.retry-- > 0) {
					this.send<T>(data, options)
						.then(resolve, reject)
					return
				}
				// 结束请求
				completed = true
				this.onFail(res, options)
					.then(reject, reject)
			}

			data.complete = (res: GeneralCallbackResult & ExtraCompleteRes) => {
				if (timeoutHandle) {
					clearTimeout(timeoutHandle)
					timeoutHandle = null
				} else if (timeoutHandle === 0 && !res.timeout) {
					// 触发过自定义超时,并且尚未注入timeout
					timeoutErrorThrow(res, options.timeout)
				}

				if (completed) {
					this.complete(res, options)
				}
			}

			const run = () => {
				const task = this.handle(data)

				if (options.timeout! > 0) {
					// @ts-ignore
					timeoutHandle = setTimeout(() => {
						timeoutHandle = 0
						task.abort()
					}, options.timeout!)
				}

				if (options.onHeadersReceived) {
					task.onHeadersReceived(options.onHeadersReceived)
				}

				if (options.onProgressUpdate && task.onProgressUpdate) {
					task.onProgressUpdate(options.onProgressUpdate)
				}

				if (cancelToken) {
					cancelToken.promise
						.then((reason) => {
							task.abort()
							this.onAbort(reason, options)
						}, reject)
				}
			}

			if (options.disableOnline) {
				run()
			} else {
				ensureOnline(run, cancelToken)
			}
		})
	}

	/**
   * 结束时调用 按需注入时间
   * @param res result
   * @param options all options
   */
	private complete(
		res: GeneralCallbackResult & ExtraCompleteRes,
		options: TFullOptions
	) {
		if (options.timestamp) {
			if (isPlainObject(options.timestamp)) {
				options.timestamp.response = Date.now()
				res.time = options.timestamp
			} else {
				res.time = {
					send: options.__sendTime,
					response: Date.now()
				}
			}
		}
		this.onComplete(res, options)
	}

	/**
   * 处理服务器返回数据
   * @param res 返回参数
   * @param options 全部配置
   */
	private response<T>(res: SuccessParam<TTaroOptions>, options: TFullOptions): Promise<T> {
		this.Listeners.onResponse.forEach((fn) => {
			fn(res, options)
		})

		if (options.transformResponse) {
			return Promise
				.resolve(res)
				.then((result) => options.transformResponse!(result, options))
				.catch((reason: GeneralCallbackResult) => this.onFail(reason, options))
		} else {
			return Promise.resolve(res)
		}
	}

	/**
   * 请求发送失败
   * @param res 返回参数
   * @param options 全部配置
   */
	private onFail(res: GeneralCallbackResult, options: TFullOptions): Promise<GeneralCallbackResult> {
		this.Listeners.onRejected.forEach((fn) => {
			fn(res, options)
		})

		if (env.TARO_ENV === 'alipay' && options.transformResponse) {
			return Promise
				.resolve(res)
				.then((result) => options.transformResponse!(result, options))
				.catch((reason: GeneralCallbackResult) => Promise.reject(reason))
		} else {
			return Promise.reject(res)
		}
	}

	/**
   * 请求完成
   * @param res 返回参数
   * @param options 全部配置
   */
	private onComplete(
		res:
			& Partial<SuccessParam<TTaroOptions>>
			& GeneralCallbackResult
			& ExtraCompleteRes,
		options: TFullOptions
	) {
		this.Listeners.onComplete.forEach((fn) => {
			fn(res as any, options)
		})
	}

	/**
   * 请求完成
   * @param res 返回参数
   * @param options 全部配置
   */
	private onAbort(reason: any, options: TFullOptions) {
		this.Listeners.onAbort.forEach((fn) => {
			fn(reason, options)
		})
	}
}