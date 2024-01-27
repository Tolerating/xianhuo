import { request } from '@/plugin/request'
import type { LoginUser, User } from '@/types/Users';



//登录
const login = (data: LoginUser) => request<string>("/login", data, "POST");

// 获取验证码
const getCheckCode = (email: string) => request<string>(`/mailCode?email=${email}`, {}, "GET")

// 注册API
const registerXH = (data:User)=>request<string>("/register",data,"POST")

// 修改密码
const updatePassword = (data:User)=>request<string>('/updatePassword',data,"POST");
export {
	login,
	getCheckCode,
	registerXH,
	updatePassword
}