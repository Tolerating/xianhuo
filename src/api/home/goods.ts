import {request,uploadFile} from '@/plugin/request'
import type { Files } from '@/types/common';
import type { Category } from '@/types/Category';
import type { DispatchMode } from '@/types/DispatchMode';
import type { ProductRequire } from '@/types/ProductRequire';
import type { SellMode } from '@/types/SellMode';
import type { Product } from '@/types/Product';
// 获得所有分类
const allCategories = () => request<Category[]>('/categories', {}, "GET")

// 获得售卖模式
const allSellMode = ()=>request<SellMode[]>('/sellMode/1',{},"GET")

// 根据售卖模式获取发货方式
const dispatchModeBySell = (sellModeId:number)=>request<DispatchMode[]>(`/dispatchMode/${sellModeId}`,{},"GET")
// 获取所有售卖规则对应关系
const allMode = ()=>request("/modes",{},"GET")

// 根据售卖模式id和发货方式id获取商品要求
const productRequireByDispatch = (sellModeId:number,dispatchModeId:number)=>request<ProductRequire[]>(`/productRequire/${sellModeId}/${dispatchModeId}`,{},"GET")

// 上传单张图片
const uploadImg = (data:Files)=>uploadFile<string>("/upload",data)

// 发布
const releaseGoods = (data:Product)=>request("/product",data,"POST")

// 更新商品
const updateProduct = (data:Product)=>request("/product",data,"PUT")

// 根据id删除商品
const deleteProduct = (id:number)=>request(`/product/${id}`,{},"DELETE")
// 根据商品id获取商品详情
const requestProductById = (productId:number)=>request<Product>(`/product/${productId}`,{},"GET")

// 获取全部的分类
const allDispatchMode = ()=>request<DispatchMode[]>("/dispatchMode",{},"GET")

// 获取所有的商品要求
const allProductRequire = ()=>request<ProductRequire[]>("/productRequire",{},"GET")
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
    deleteProduct
}
