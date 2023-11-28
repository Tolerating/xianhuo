export type ResponseResult <T = any> = {
	code:500 | 200 | 411,
	data:{
		data:T,
		token?:string
	},
	message?:string
}
type Header = {
	Authorization:string
}
export type RequestParams = {
	url: string,
	data?: Object,
	method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE",
	header?: Header
}