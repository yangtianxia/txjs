import { CancelToken } from 'miniprogram-cancel-token'
import { onAppShow, onAppHide, onNetworkStatusChange, getNetworkType } from '@tarojs/taro'

/**
 * 网络是否联接
 */
let isConnected = false
/**
 * 是否隐藏在后台
 */
let isHidden = false

const callbackPools: (() => void)[] = []

function checkCallbacks() {
	if (isConnected && !isHidden) {
		while (callbackPools.length > 0) {
			callbackPools.shift()!()
		}
	}
}

onAppShow(() => {
	isHidden = false
	checkCallbacks()
})

onAppHide(() => {
	isHidden = true
})

onNetworkStatusChange((res) => {
	isConnected = res.isConnected
	checkCallbacks()
})

getNetworkType({
	success(res) {
		isConnected = res.networkType !== 'none'
		checkCallbacks()
	}
})

/**
 * 确保在线时执行
 * 网络掉线或者切换到后台的情况暂停发送
 * @param callback 回调
 * @param cancelToken 取消操作
 */
export function ensureOnline(
	callback: () => void,
	cancelToken?: CancelToken
) {
	if (isConnected && !isHidden) {
		callback()
	} else {
		callbackPools.push(callback)
		if (cancelToken) {
			cancelToken.promise
				.then(() => {
					const index = callbackPools.indexOf(callback)
					if (index !== -1) {
						callbackPools.splice(index, 1)
					}
				})
		}
	}
}