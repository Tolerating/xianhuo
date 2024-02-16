import { request } from '@/plugin/request'
import type { LoginUser, User, UserPart } from '@/types/Users';



//登录
const login = (data: LoginUser) => request<string>("/login", data, "POST");

// 获取验证码
const getCheckCode = (email: string) => request<string>(`/mailCode?email=${email}`, {}, "GET")

// 注册API
const registerXH = (data: User) => request<string>("/register", data, "POST")

// 修改密码
const updatePassword = (data: User) => request<string>('/updatePassword', data, "POST");

// 获取鉴权签名
const getSignature = (data: UserPart) => request("/uniId/signature", data, "POST")

// 注册uniId外部用户
const registerUniId = (data: { externalUid: String, nickname: string, avatar: string }, header: { uniIdNonce: string, uniIdTimestamp: string, uniIdSignature: string }) => request("https://fc-mp-cb2eb9b5-3cbb-47a7-aa08-383cdf5374d2.next.bspapp.com/uni-id-co/externalRegister", data, "POST", {
	//@ts-ignore
	"uni-id-nonce": header.uniIdNonce,
	"uni-id-timestamp": header.uniIdTimestamp,
	"uni-id-signature": header.uniIdSignature
})
export {
	login,
	getCheckCode,
	registerXH,
	updatePassword,
	getSignature,
	registerUniId
}