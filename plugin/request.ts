import type {ResponseResult} from '@/types/Common'
import useUserStore from '../stores/users'
const BASEURL = 'http://localhost:8080/api';
type method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
type header = {
	Authorization?:string
}
const httpInterceptor = {
	invoke(options:UniApp.RequestOptions){
		const store = useUserStore()
		const token = store.authorization
		console.log("token",token);
		if(token){
			 options.header.Authorization = token
		}
	}
}
uni.addInterceptor("request",httpInterceptor)
// const BASEURL =  'http:192.168.1.104:8080/api';
const request = (url = '', data = {}, type:method = 'GET', header:header = {}):Promise<ResponseResult> => {
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
			console.log(response);
			let data = response.data as ResponseResult
			if(data.code!=200){
				uni.showToast({
					title: data.message,
					duration: 2000
				});
			}
			// 服务端返回401，跳转到登录页面
			if(response.statusCode == 401){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			}
			resolve(response.data as ResponseResult)
		}).catch(error => {
			console.log(error);
			reject(error);
		});
	});
}
export default request;
