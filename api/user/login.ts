import request from '../../plugin/request'
import { ResponseResult } from '../../types/Common';



//登录
const login = (data)=>request("/user/login",data,"POST");

// 注册API
/* data结构
{
	phone:"",
	password:"",
	nickname:"",
	code:""
}
*/
const register = (data)=>request('/user/register',data,"POST");

// 修改密码
/*data结构
{
	phone:"",
	password:"",
	code:""
}
*/
const changePassword = (data)=>request('/user/modifyPassword/phone',data,"POST");
export {login,register,changePassword}