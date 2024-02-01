import { request } from "@/plugin/request";
import type { User, UserPart } from "@/types/Users";

// 根据用户id获得用户部分信息，用于商品详情页展示
const userInfoById = (userId:number)=>request<User>(`/user/${userId}`,{},"GET")

// 根据authorization获取用户信息
const requestUserInfo = ()=>request<User>("/user",{},"GET")

// 用户首次登录完善个人信息
const improveInfo = (data:UserPart)=>request("/improveInfo",data,"POST")

export {
    userInfoById,
    requestUserInfo,
    improveInfo
}