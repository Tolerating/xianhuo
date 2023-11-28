// 用户信息表
export type User = {
	// 用户id
	id : number;
	//用户昵称
	name : string;
	//电话
	phone : string;
	//密码
	password : string;
	//学校id
	schoolId : number;
	//用户头像
	avatar : string;
	//邮箱地址
	email : string;
	//身份证
	identityCard : string;
	//学生学号
	stuNumber : number;
	//班级
	grade : string;
	//学院
	faculty : string;
	//专业
	major : string;
	//生日
	birthday : string;
	//信誉分
	score : number;
	//创建时间
	createdAt : string;
	//删除时间
	deletedAt : string;
}