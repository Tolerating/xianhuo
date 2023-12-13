type ResponseResult <T = any> = {
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
type RequestParams = {
	url: string,
	data?: Object,
	method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE",
	header?: Header
}

// 咸货首页的商品分类（横向滑动块），例如：猜你喜欢、最近发布.....
 type DiscoveryType = {
	id:number,
	title:string
}


type HomeReachBottomType = {
	id:number,
	title:string,
	isReachBottom:boolean
}
export type {
	ResponseResult,
	Header,
	RequestParams,
	DiscoveryType,
	HomeReachBottomType
	
}