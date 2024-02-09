import {request,uploadFile} from '@/plugin/request'
import type { Files } from '@/types/common';
import type { Category } from '@/types/Category';
import type { DispatchMode } from '@/types/DispatchMode';
import type { ProductRequire } from '@/types/ProductRequire';
import type { SellMode } from '@/types/SellMode';
import type { Product, ProductStatus } from '@/types/Product';
/**
 *获得所有分类
 *
 */
const allCategories = () => request<Category[]>('/categories', {}, "GET")


/**
 *获得售卖模式
 *
 */
const allSellMode = ()=>request<SellMode[]>('/sellMode/1',{},"GET")

 
/**
 *根据售卖模式获取发货方式
 *
 * @param {number} sellModeId
 */
const dispatchModeBySell = (sellModeId:number)=>request<DispatchMode[]>(`/dispatchMode/${sellModeId}`,{},"GET")

/**
 *获取所有售卖规则对应关系
 *
 */
const allMode = ()=>request("/modes",{},"GET")


/**
 *根据售卖模式id和发货方式id获取商品要求
 *
 * @param {number} sellModeId
 * @param {number} dispatchModeId
 */
const productRequireByDispatch = (sellModeId:number,dispatchModeId:number)=>request<ProductRequire[]>(`/productRequire/${sellModeId}/${dispatchModeId}`,{},"GET")


/**
 *上传单张图片
 *
 * @param {Files} data
 */
const uploadImg = (data:Files)=>uploadFile<string>("/upload",data)

 
/**
 *发布
 *
 * @param {Product} data
 */
const releaseGoods = (data:Product)=>request("/product",data,"POST")


/**
 *
 *更新商品
 * @param {Product} data
 */
const updateProduct = (data:Product)=>request("/product",data,"PUT")


/**
 *根据id删除商品
 *
 * @param {number} id
 * @param {ProductStatus} status
 */
const deleteProduct = (id:number,status:ProductStatus)=>request(`/product/${id}/${status}`,{},"DELETE")

/**
 *根据商品id获取商品详情
 *
 * @param {number} productId
 */
const requestProductById = (productId:number)=>request<Product>(`/product/${productId}`,{},"GET")

/**
 *获取全部的分类
 *
 */
const allDispatchMode = ()=>request<DispatchMode[]>("/dispatchMode",{},"GET")


/**
 *获取所有的商品要求
 *
 */
const allProductRequire = ()=>request<ProductRequire[]>("/productRequire",{},"GET")

/**
 *
 *根据用户id获取商品
 * @param {number} id
 */
const productsByUserId = (id:number)=>request(`/product?id=${id}`,{},"GET")


/**
 *
 *根据售卖模式获取对应的商品
 * @param {number} sellModeId
 * @param {number} current
 * @param {number} size
 * @param {string} location
 */
const produtsBySellMode = (sellModeId:number,current:number,size:number,location:string)=>request(`/product/sellMode/${sellModeId}?current=${current}&size=${size}&location=${location}`,{},"GET")
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
    produtsBySellMode
}
