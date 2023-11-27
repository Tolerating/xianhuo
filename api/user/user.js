import request from '../../plugin/request.js'
// 获取用户登录信息
const userInfo = () => request("/info/person", , "GET");
// 通过用户id获取其他用户信息
const otherUserInfo = (id) => request(`/info/other?id=${id}`, , "GET");
export {
	userInfo,
	otherUserInfo
}
