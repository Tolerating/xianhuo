import type { ResponseResult, Files } from '@/types/common'
import {APP_BASE_URL,APP_URL_PORT} from '@/config/index'
import useUserStore from '@/stores/users'
let BASEURL = APP_BASE_URL +':'+ APP_URL_PORT +'/api';

type method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
type header = {
	Authorization?: string
}
const httpInterceptor = {
	invoke(options: UniApp.RequestOptions) {
		const store = useUserStore()
		const token = store.authorization
		// console.log("token",token);
		if (token) {
			options.header.Authorization = token
		}
		// 开发阶段用
		// options.header.Authorization = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNzA0OTQxMjg1LCJzdWIiOiIiLCJpc3MiOiIiLCJleHAiOjE3MDc2MTk2ODV9.ly8_wfQs8yCRhr3806AjhfqIQWywfPMzWWc9eybvnOs"

	}
}
uni.addInterceptor("request", httpInterceptor)

uni.addInterceptor("uploadFile", httpInterceptor)
const dealRespoonse = (response: any) => {
	let data = response.data as ResponseResult
	if (data.code != 200) {
		uni.showToast({
			title: data.message,
			duration: 2000
		});
	}
	// 服务端返回401，跳转到登录页面
	if (response.statusCode == 401) {
		uni.navigateTo({
			url: "/pages/login/index"
		})
		//@ts-ignore
		reject()
		return
	}
}

// const BASEURL =  'http:192.168.1.104:8080/api';
const request = <T = any>(url = '', data = {}, type: method = 'GET', header: header = {}): Promise<ResponseResult<T>> => {
	// if (uni.getStorageSync("Authorization") != "") {
	// 	header.Authorization = uni.getStorageSync("authorization");
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: BASEURL + url,
			data: data,
			header: header,
			dataType: 'json',
		}).then((response) => {
			// dealRespoonse(response)
			let data = response.data as ResponseResult
			if (data.code != 200) {
				uni.showToast({
					title: data.message,
					icon:"none"
				});
				reject(data.message)
			}
			if(data.code == 200){
				resolve(response.data as ResponseResult<T>)
			}
			// 服务端返回401，跳转到登录页面
			if (response.statusCode == 402) {
				uni.navigateTo({
					url: "/pages/login/index"
				})
				//@ts-ignore
				reject()
				return
			}
			
		}).catch(error => {
			console.log(error);
			uni.showToast({
				title: error,
				icon:"none",
			});
			reject(error);
		});
	});
}

const uploadFile = <T= any>(url: string, files: Files[] | Files, header: Object = {}):Promise<ResponseResult<T>> => {
	let options = {
		url: BASEURL + url,
		files,
		header,
	}
	if (!Array.isArray(files)) {
		let arr:Files[] = [files]
		options.files = arr
	}
	return new Promise((resolve, reject) => {
		//@ts-ignore
		uni.uploadFile(options)
			.then((response) => {
				dealRespoonse(response)
				resolve(JSON.parse(response.data) as ResponseResult)
			})
			.catch((error) => {
				uni.showToast({
					title: "网络错误",
					icon:"error",
					duration: 2000
				});
				reject(error)
			})
	})
}


export {
	request,
	uploadFile
};
