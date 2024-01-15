import {request,uploadFile} from '@/plugin/request'
import type { Files } from '@/types/common';
import type { Category } from '@/types/Category';
import type { DispatchMode } from '@/types/DispatchMode';
import type { ProductRequire } from '@/types/ProductRequire';
import type { SellMode } from '@/types/SellMode';
import type { Product } from '@/types/Product';
const Authorization = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNzA0OTQxMjg1LCJzdWIiOiIiLCJpc3MiOiIiLCJleHAiOjE3MDc2MTk2ODV9.ly8_wfQs8yCRhr3806AjhfqIQWywfPMzWWc9eybvnOs"
// 获得所有分类
const allCategories = () => request<Category[]>('/categories', {}, "GET"
    , { Authorization })

// 获得售卖模式
const allSellMode = ()=>request<SellMode[]>('/sellMode/1',{},"GET",{Authorization})

// 根据售卖模式获取发货方式
const dispatchModeBySell = (sellModeId:number)=>request<DispatchMode[]>(`/dispatchMode/${sellModeId}`,{},"GET",{Authorization})

// 根据售卖模式id和发货方式id获取商品要求
const productRequireByDispatch = (sellModeId:number,dispatchModeId:number)=>request<ProductRequire[]>(`/productRequire/${sellModeId}/${dispatchModeId}`,{},"GET",{Authorization})

// 上传单张图片
const uploadImg = (data:Files)=>uploadFile<string>("/upload",data,{Authorization})

// 发布
const releaseGoods = (data:Product)=>request("/product",data,"POST",{Authorization})

export {
    allCategories,
    allSellMode,
    dispatchModeBySell,
    productRequireByDispatch,
    uploadImg,
    releaseGoods
}
