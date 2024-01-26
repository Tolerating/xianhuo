import { request } from '@/plugin/request'
import type { LoginUser } from '@/types/Users';



//登录
const login = (data: LoginUser) => request<string>("/login", data, "POST");

// 获取验证码
const getCheckCode = (email: string) => request<string>(`/mailCode?email=${email}`, {}, "GET")

// 注册API


// 修改密码

// const changePassword = (data)=>request('/user/modifyPassword/phone',data,"POST");
export {
	login,
	getCheckCode
}