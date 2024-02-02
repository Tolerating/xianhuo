import { request } from "@/plugin/request";
import type { User, UserPart } from "@/types/Users";

// 根据用户id获得用户部分信息，用于商品详情页展示
const userInfoById = (userId:number)=>request<User>(`/user/${userId}`,{},"GET")

// 根据authorization获取用户信息
const requestUserInfo = ()=>request<User>("/user",{},"GET")

// 用户首次登录完善个人信息
const improveInfo = (data:UserPart)=>request("/improveInfo",data,"POST")

// 获取用户已经发布的商品
const releasedProducts  = ()=>request("/product/released",{},"GET")

// 获取用户已发布商品的数量
const releasedCount = ()=>request("/product/count",{},"GET")
export {
    userInfoById,
    requestUserInfo,
    improveInfo,
    releasedProducts,
    releasedCount
}