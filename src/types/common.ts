type ResponseResult<T = any> = {
	code: 500 | 200 | 411,
	data: T,
	message?: string
}

type Header = {
	Authorization: string
}
type RequestParams = {
	url: string,
	data?: Object,
	method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE",
	header?: Header
}

// 咸货首页的商品分类（横向滑动块），例如：猜你喜欢、最近发布.....
type DiscoveryType = {
	id: number,
	title: string,
	/**
	 * 0表示最新发布，1表示售卖模式，2表示商品类别
	 *
	 * @type {(0 | 1 | 2)}
	 */
	type:0 | 1 | 2
}


type HomeReachBottomType = {
	id: number,
	title: string,
	isReachBottom: boolean
}

// 上传文件类型
type Files = {
	// 后端上传接口中对应的参数名
	name?: "file",
	file?: any,
	// 例如：blob:http://localhost:5173/96ce0485-2932-4ff9-afb4-7c99e00084c4
	uri: string
}

type FileSelect = {
	file: {
		
		/**
		 *文件名
		 *
		 * @type {string}
		 */
		name:string,
		size:number,
		
		/**
		 *通url一样，是一个blob流
		 *
		 * @type {string}
		 */
		thumb:string,
		/**
		 *文件类型
		 *
		 * @type {string}
		 */
		type:string,
		url:string
	}[],
	index: number,
	/**
	 *uv-upload组件上的name属性值
	 *
	 * @type {string}
	 */
	name:string
}

type UVFileList = {

	/**
	 *图片状态
	 *
	 * @type {("uploading" |"success" |"failed")}
	 */
	status:"uploading" |"success" |"failed" ,
	/**
	 * 文件名字
	 *
	 * @type {string}
	 */
	name:string,
	url:string
}

type AMAPLocation = {
	typecode: string,
	// 区县
	district: string,
	adcode: string,
	// 联系方式
	phone: string,
	// poi类别
	type: string,
	// 所在城市
	city: string,
	// poi名字
	name: string,
	// 定位
	location: {
		longitude: number,
		latitude: number
	},
	distance: -1,
	postcode: string,
	// 详细地址
	address:string,
	// 省份
	province: string
}

// 跳转到商品筛选页面的传参列表类型
type ProductFilterPrams ={
	key:string,
	category:number,
	// 售卖模式
	sell:number,
}

export type {
	ResponseResult,
	Header,
	RequestParams,
	DiscoveryType,
	HomeReachBottomType,
	Files,
	FileSelect,
	ProductFilterPrams,
	AMAPLocation,
	UVFileList
}