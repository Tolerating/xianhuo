export type LoginUser = {
	//邮箱地址
	email: string;
	//密码
	password: string;
}

export interface UserPart{
	//用户昵称
	name: string;
	//学校名字
	school: String;
	//用户头像
	avatar: string;
	// 学校定位
	location: string;
}

// 用户信息表
export interface User extends LoginUser,UserPart {
	// 用户id
	id: number;
	//电话
	phone: string;
	//身份证
	identityCard: string;
	//学生学号
	stuNumber: number;
	//班级
	grade: string;
	//学院
	faculty: string;
	//专业
	major: string;
	//生日
	birthday: string;
	//信誉分
	score: number;
	//创建时间
	createdAt: string;
	//删除时间
	deletedAt: string;
}
