import { request, uploadFile } from '@/plugin/request'
import type { Files } from '@/types/common';
import type { Category } from '@/types/Category';
import type { DispatchMode } from '@/types/DispatchMode';
import type { ProductRequire } from '@/types/ProductRequire';
import type { SellMode } from '@/types/SellMode';
import type { Product, ProductStatus } from '@/types/Product';
import type { Favourite } from '@/types/Favourite';
import type { OrderInfo } from '@/types/OrderInfo';
import type { Complain } from '@/types/Complain';
import type { AfterService } from '@/types/AfterService';
import type { Notice } from '@/types/Notice';
/**
 *获得所有分类
 *
 */
const allCategories = () => request<Category[]>('/categories', {}, "GET")


/**
 *获得售卖模式
 *
 */
const allSellMode = () => request<SellMode[]>('/sellMode/1', {}, "GET")


/**
 *根据售卖模式获取发货方式
 *
 * @param {number} sellModeId
 */
const dispatchModeBySell = (sellModeId: number) => request<DispatchMode[]>(`/dispatchMode/${sellModeId}`, {}, "GET")

/**
 *获取所有售卖规则对应关系
 *
 */
const allMode = () => request("/modes", {}, "GET")


/**
 *根据售卖模式id和发货方式id获取商品要求
 *
 * @param {number} sellModeId
 * @param {number} dispatchModeId
 */
const productRequireByDispatch = (sellModeId: number, dispatchModeId: number) => request<ProductRequire[]>(`/productRequire/${sellModeId}/${dispatchModeId}`, {}, "GET")


/**
 *上传单张图片
 *
 * @param {Files} data
 */
const uploadImg = (data: Files) => uploadFile<string>("/upload", data)


/**
 *发布
 *
 * @param {Product} data
 */
const releaseGoods = (data: Product) => request("/product", data, "POST")


/**
 *
 *更新商品
 * @param {Product} data
 */
const updateProduct = (data: Product) => request("/product", data, "PUT")


/**
 *根据id删除商品
 *
 * @param {number} id
 * @param {ProductStatus} status
 */
const deleteProduct = (id: number, status: ProductStatus) => request(`/product/${id}/${status}`, {}, "DELETE")

/**
 *根据商品id获取商品详情
 *
 * @param {number} productId
 */
const requestProductById = (productId: number) => request<Product>(`/product/${productId}`, {}, "GET")

/**
 *获取全部的分类
 *
 */
const allDispatchMode = () => request<DispatchMode[]>("/dispatchMode", {}, "GET")


/**
 *获取所有的商品要求
 *
 */
const allProductRequire = () => request<ProductRequire[]>("/productRequire", {}, "GET")

/**
 *
 *根据用户id获取商品
 * @param {number} id
 */
const productsByUserId = (id: number) => request(`/product?id=${id}`, {}, "GET")


/**
 *
 *根据售卖模式分页获取对应的商品
 * @param {number} sellModeId
 * @param {number} current
 * @param {number} size
 * @param {string} location
 */
const produtsBySellMode = (sellModeId: number, current: number, size: number, location: string) => request(`/product/sellMode/${sellModeId}?current=${current}&size=${size}&location=${location}`, {}, "GET")

/**
 *分页获取最新发布的商品
 *
 * @param {number} current
 * @param {number} size
 * @param {string} location
 */
const productByLatest = (current: number, size: number, location: string) => request(`/product/latest?current=${current}&size=${size}&location=${location}`, {}, "GET")


/**
 *根据分类分页获取商品
 *
 * @param {number} categoryId
 * @param {number} current
 * @param {number} size
 * @param {string} location
 */
const productByCategory = (categoryId: number, current: number, size: number, location: string) => request(`/product/category/${categoryId}?current=${current}&size=${size}&location=${location}`, {}, "GET")

/**
 * 添加收藏
 *
 * @param {Favourite} data
 */
const addFavourite = (data: Favourite) => request("/favourite", data, "POST")

/**
 * 查询当前商品是否已经被收藏了
 *
 * @param {string} userId
 * @param {string} productId
 */
const queryFavourite = (userId: string, productId: string) => request(`/favourite?userId=${userId}&productId=${productId}`, {}, "GET")


/**
 * 取消收藏
 *
 * @param {string} userId
 * @param {string} productId
 */
const cancelFavourite = (userId: string, productId: string) => request(`/favourite?userId=${userId}&productId=${productId}`, {}, "DELETE")

/**
 * 根据userId获取所有收藏
 *
 * @param {string} userId
 */
const allFavouriteByUserId = (userId: string) => request(`/favourite/all/${userId}`, {}, "GET")

/**
 * 获取收藏数量
 *
 */
const favouriteCount = () => request("/favourite/count", {}, "GET")

/**
 * 分页获取筛选数据
 *
 * @param {number} current
 * @param {number} size
 * @param {string} productName
 * @param {string} location
 * @param {string} sellMode
 * @param {string} categoryId
 */
const pageFilterProduct = (current: number, size: number, productName: string, location: string, sellMode: number, categoryId: number) => request(`/product/search?current=${current}&size=${size}&productName=${productName}&location=${location}&sellMode=${sellMode}&categoryId=${categoryId}`, {}, "GET")


/**
 * 新增订单
 *
 * @param {OrderInfo} data
 */
const addOrderInfo = (data: OrderInfo) => request("/order", data, "POST")

/**
 * 删除订单
 *
 * @param {string} orderId
 */
const deleteOrderInfo = (orderId:string)=>request(`/order?orderId=${orderId}`,{},"DELETE")

/**
 * 商品支付
 *
 * @param {string} orderId
 */
const payProduct = (orderId: string) => request<string>(`/pay?orderNo=${orderId}`, {}, "GET")


/**
 * 获取待发货订单，卖家显示
 *
 */
const dispatchProductList = () => request<OrderInfo[]>("/orders/dispatch", {}, "GET")
/**
 * 获取待收货订单，买家显示
 *
 */
const receiveProductList = () => request<OrderInfo[]>("/orders/receive", {}, "GET")

/**
 * 确认发货
 *
 * @param {string} id 订单表id
 */
const dispatchedProduct = (id: string) => request(`/order/dispatched?id=${id}`, {}, "GET")

/**
 * 确认收货
 *
 * @param {string} id 订单表id
 */
const receivedProduct = (id: string) => request(`/order/received?id=${id}`, {}, "GET")

/**
 * 出售记录
 *
 */
const sellHistory = () => request<OrderInfo[]>(`/orders/sell`, {}, "GET")

/**
 * 购买记录
 *
 */
const buyHistory = () => request<OrderInfo[]>(`/orders/buy`, {}, "GET")

/**
 * 获取待发货，待收货，交易记录数量,售后数量
 *
 */
const orderTypeCount = () => request<{
    dispatch: string,
    receive: string,
    buy: string,
    sell: string,
    profit:string,
    after:string,
	waitDeal:string
}>(`/orders/count`, {}, "GET")

/**
 * 新增商品投诉
 *
 * @param {Complain} data
 */
const complainProduct = (data:Complain)=>request("/complain",data,"POST")

/**
 * 更新商品状态
 *
 * @param {number} orderId
 * @param {OrderInfo['status']} status
 */
const updateOrderStatus = (orderId:number,status:OrderInfo['status']) => request(`/orderInfo/status?id=${orderId}&status=${status}`, {}, "GET")


/**
 * 申请售后
 *
 * @param {AfterService} data
 */
const askAfterService = (data:AfterService)=>request('/afterService',data,"POST")

/**
 * 根据购买者id和订单号获取售后信息
 *
 * @param {string} buyerId
 * @param {string} orderId
 */
const getAfterService = (buyerId:string,orderId:string)=>request<AfterService>(`/afterService?buyerId=${buyerId}&orderId=${orderId}`,{},"GET")

/**
 * 根据购买者id获取所有售后信息
 *
 * @param {string} buyerId
 */
const allAfterService = (buyerId:string)=>request(`/afterServices?buyerId=${buyerId}`,{},"GET")


/**
 * 申请平台介入
 *
 * @param {string} afterId
 * @param {string} orderId
 */
const askPlatform = (afterId:string,orderId:string)=>request(`/askPlatform?afterId=${afterId}&orderId=${orderId}`,{},"GET")

/**
 * 获取售后记录
 *
 */
const afterHistory = () => request<AfterService[]>(`/afterHistory`, {}, "GET")

/**
 * 获取用户的官方通知
 *
 */
const allNotices = () => request<Notice[]>(`/notices`, {}, "GET")

/**
 * 删除通知
 *
 */
const delNotice = (id:string)=>request<string>(`/notice/del?id=${id}`,{},"GET")

/**
 * 获取待处理的售后
 *
 */
const afterServiceToDeal = ()=> request<AfterService[]>(`/afterService/toDeal`, {}, "GET")

/**
 * 卖家处理售后
 *
 * @param {string} afterId
 * @param {string} productId
 * @param {string} orderId
 * @param {string} buyerId
 * @param {string} refuse
 * @param {(0|1)} type
 */
const dealAfterService = (afterId:string, productId:string, orderId:string, buyerId:string, refuse:string, type:0|1)=>request<string>(`/afterService/sellerDeal?afterId=${afterId}&productId=${productId}&orderId=${orderId}&buyerId=${buyerId}&refuse=${refuse}&type=${type}`, {}, "GET")

/**
 * 买家售后发货
 *
 */
const afterDispatch = (id:string)=> request<string>(`/afterService/dispatch?id=${id}`, {}, "GET")

/**
 * 买家售后发货
 *@param {string} id
 *@param {string} orderId
 */
const afterReceive = (id:string,orderId:string)=> request<string>(`/afterService/receive?id=${id}&orderId=${orderId}`, {}, "GET")

/**
 * 商家未发货退款
 *
 * @param {string} orderId
 */
const productRefund = (orderId:string)=>request(`/refund?id=${orderId}`,{},"GET")
export {
    allCategories,
    allSellMode,
    dispatchModeBySell,
    productRequireByDispatch,
    uploadImg,
    releaseGoods,
    requestProductById,
    allDispatchMode,
    allProductRequire,
    allMode,
    updateProduct,
    deleteProduct,
    productsByUserId,
    produtsBySellMode,
    productByLatest,
    productByCategory,
    addFavourite,
    queryFavourite,
    cancelFavourite,
    allFavouriteByUserId,
    favouriteCount,
    pageFilterProduct,
    addOrderInfo,
    payProduct,
    dispatchProductList,
    receiveProductList,
    dispatchedProduct,
    receivedProduct,
    sellHistory,
    buyHistory,
    orderTypeCount,
    complainProduct,
    updateOrderStatus,
    askAfterService,
    getAfterService,
    allAfterService,
    askPlatform,
    afterHistory,
    allNotices,
    afterServiceToDeal,
    dealAfterService,
	delNotice,
	afterDispatch,
	afterReceive,
	productRefund,
	deleteOrderInfo
}
