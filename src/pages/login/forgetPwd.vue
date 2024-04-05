<script lang="ts" setup>
import {
	computed,
	ref, watch
} from "vue";
import validator from 'validator'
import { useEmailCode } from '@/hooks/user/useEmailCode'
import {updatePassword} from '@/api/user/login'
import type { User } from "@/types/Users";
const email = ref<string>("")
const code = ref<string>("")
const countDown = ref<number>(60)
// false显示'发送验证码'，true显示'秒后重发'
const countDownFlag = ref<boolean>(false)
const emailCode = ref<string>("")
const pwd = ref<string>("")
const rePwd = ref<string>("")
const {requestEmailCode} = useEmailCode()
const showInputPwd = ref<Boolean>(false)
watch(code, (newValue, oldValue) => {
	if (newValue == emailCode.value) {
		showInputPwd.value = true;
	}
})
const isRegister = computed(() => {
	const result = validator.isEmail(email.value) && code.value != "" && (pwd.value != "" && rePwd.value != "" && pwd.value == rePwd.value);
	return !result;
})
const getCode = async () => {
	if (!countDownFlag.value) {
		emailCode.value = await requestEmailCode(email.value)
		countDown.value = 60
		countDownFlag.value = true
		setInterval(() => {
			if (countDown.value) {
				countDown.value--
			} else {
				countDownFlag.value = false
			}
		}, 1000)
	}
}
const updatePwd = async () => {
	const user = {} as User
	user.email = email.value
	user.password = rePwd.value
	const result = await updatePassword(user)
	uni.showToast({
		title:result.message,
		success(){
			uni.navigateTo({
				url:"/pages/login/index"
			})
		}
	})
}
</script>
<template>
	<view class="register_page">
		<view class="register_page_container">
			<view class="register_title">
				<text>忘记密码</text>
			</view>
			<view class="register_item">
				<text>账户</text>
				<view class="">
					<input placeholder="邮箱" v-model="email" type="email" name="input" />
				</view>
			</view>
			<view class="register_item">
				<text>验证码</text>
				<view class="message_group">
					<input :disabled="(showInputPwd as boolean)" placeholder="短信验证码"  v-model.trim="code" name="input" />
					<view style="flex: 1;" class=""></view>
					<button class="cu-btn sm message_button" @tap="getCode">{{countDownFlag?countDown + '秒后重发':'发送验证码'}}</button>
				</view>
			</view>
			<view v-show="showInputPwd" class="register_item">
				<text>新密码</text>
				<view class="">
					<input placeholder="新密码" v-model="pwd" password name="input" />
				</view>
			</view>
			<view v-show="showInputPwd" class="register_item">
				<text>确认密码</text>
				<view class="">
					<input placeholder="确认密码" password v-model="rePwd" name="input" />
				</view>
			</view>
			<button class="cu-btn margin-tb-sm lg login_button" :disabled="isRegister" @tap="updatePwd">修改密码</button>
		</view>
	</view>
</template>



<style lang="scss" scoped>
.register_page {
	background-image: $login-bgColor;
	position: fixed;
	top: -44px;
	bottom: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.register_topBar {
	position: absolute;
	top: 0;

	.topBar_back {
		width: 100%;
		font-size: 24px;
		color: white;
		padding: 10px 0 0 10px;
	}
}

.register_page_container {
	position: relative;
	background-color: #FFFFFF;
	border-radius: 10px;
	width: 300px;
	box-shadow: 5px 10px 10px 5px rgba(0, 0, 0, .2);
	z-index: 2;
	padding: 5px 25px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.register_title {
		font-size: 28px;
		font-weight: bold;
		height: 50px;
		padding: 20px 0 0 0;
		align-self: flex-start;
	}

	.register_item {
		width: 100%;
		margin-top: 15px;

		input {
			height: 40px;
			padding-left: 5px;
			margin-top: 5px;
			font-size: 14px;
			background-color: $input-bgColor;
		}
	}

	.login_forget_pwd {
		height: 50px;
		width: 245px;
		display: flex;
		justify-content: flex-end;
		color: #4496DC;
		font-size: 14px;
		padding-top: 20px;
	}

	.login_button {
		background-image: $login-btn-bgColor;
		width: 175px;
		margin-top: 25px;
		color: white;
		font-size: 18px;
	}
}

.message_group {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	input {
		flex: 3;
	}

	.message_button {
		background-image: $login-btn-bgColor;
		color: white;
		font-size: 15px;
		height: 40px;
		border-radius: 5px;
	}
}</style>