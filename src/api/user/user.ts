import { request } from "@/plugin/request";
import type { User } from "@/types/Users";

// 根据用户id获得用户部分信息，用于商品详情页展示
const userInfoById = (userId:number)=>request<User>(`/user/${userId}`,{},"GET")

// 根据authorization获取用户信息
const requestUserInfo = ()=>request<User>("/user",{},"GET")

export {
    userInfoById,
    requestUserInfo
}