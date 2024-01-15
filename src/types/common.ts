type ResponseResult <T = any> = {
	code:500 | 200 | 411,
	data: T,
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

// 上传文件类型
type Files = {
	// 后端上传接口中对应的参数名
	name?: string,
	file?: any,
	// 例如：blob:http://localhost:5173/96ce0485-2932-4ff9-afb4-7c99e00084c4
	uri: string
}
export type {
	ResponseResult,
	Header,
	RequestParams,
	DiscoveryType,
	HomeReachBottomType,
	Files
	
}