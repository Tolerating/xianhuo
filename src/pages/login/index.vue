<template>
	<view class="login_page">
		<view class="login_page_container">
			<view class="login_page_container_top">
				<view class="login_title">
					<text>登录</text>
				</view>
				<view class="login_input">
					<input placeholder="邮箱" v-model.trim="email" type="email">
				</view>
				<view class="login_input">
					<input placeholder="密码" v-model.trim="password" type="password">
				</view>
				<view class="login_forget_pwd">
					<navigator style="display: inline-block;" url="/pages/login/forgetPwd" hover-class="navigator-hover">
						<text>忘记密码？</text>
					</navigator>
				</view>
				<button class="cu-btn margin-tb-sm lg login_button" :disabled="isLogin" @tap="loginXH">登录</button>
			</view>
			<view class="login_page_container_bottom">
				没有账户？
				<navigator style="display: inline-block;" url="/pages/login/register" hover-class="navigator-hover">
					<text>注册</text>
				</navigator>
				<!-- <navigator style="display: inline-block;" url="/pages/home/index" open-type="switchTab"
					hover-class="navigator-hover">
					<text>主页</text>
				</navigator> -->
			</view>

		</view>
		<!-- <view class="login_page_others">
			<text>其它登录方式</text>
			<image src="../../static/icon/weixin.png" mode=""></image>
		</view> -->
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user/login'
import useUserStore from '@/stores/users/index'
import validator from 'validator'
import { computed } from 'vue';
import { onBackPress } from '@dcloudio/uni-app';
import useProductStore from '@/stores/product/index';
import useCommonStore from '@/stores/common'
const commonStore = useCommonStore()
const {initSocket} = commonStore
const email = ref<string>("")
const password = ref<string>("")
const store = useUserStore()
const productStore = useProductStore()
const { updateAuthorization } = store
const loginXH = async () => {
	let result = await login({ email: email.value, password: password.value });
	let arr = result.data.split(",")
	updateAuthorization(arr[1] as string)
	// console.log("返回的token：",arr[1]);

	// console.log("userStore中的token",store.authorization);

	if (arr[0] == 'null') {
		uni.navigateTo({
			url: "/pages/login/setPersonalInfo?flag=0"
		})
	} else {
		uni.reLaunch({
			url: "/pages/home/index",
			success() {
				productStore.requestSellMode()
				productStore.requestCategory()
				productStore.requestAllDispatchMode()
				productStore.requestAllProductRequire()
				store.getUserInfo()
				initSocket(String(store.userInfo.id))
				store.initCounts()
			}
		})
	}
}
onBackPress(() => {
	return true
})
const isLogin = computed(() => {
	return !(validator.isEmail(email.value) && !validator.isEmpty(password.value))
})
</script>

<style lang='scss' scoped>
.login_page {
	background-image: linear-gradient(#fd8464, #ff639f);
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	.login_page_container {
		width: 300px;
		height: 400px;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;

		.login_page_container_top {
			position: relative;
			background-color: #FFFFFF;
			border-radius: 10px;
			width: 100%;
			height: 350px;
			z-index: 2;
			display: flex;
			flex-direction: column;
			align-items: center;

			.login_title {
				font-size: 28px;
				font-weight: bold;
				height: 50px;
				padding: 20px 0 0 20px;
				align-self: flex-start;
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
				background-image: linear-gradient(to right, #fe639e, #fd855d);
				width: 175px;
				color: white;
				font-size: 18px;
			}
		}

		.login_page_container_bottom {
			width: 275px;
			height: 50px;
			background-color: rgba(241, 221, 221, .8);
			border-radius: 10px;
			transform: translateY(-15px);
			z-index: 1;
			text-align: center;
			color: #3295CB;
			font-size: 14px;
			box-sizing: border-box;
			padding-top: 20px;

			text {
				font-size: 18px;
			}
		}

	}

	.login_page_others {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 100px;

		text {
			color: white;
			font-size: 14px;
			padding-bottom: 10px;
		}

		image {
			width: 25px;
			height: 25px;
		}
	}
}

.login_input {
	width: 245px;
	height: 40px;
	background-color: #DED4D4;
	margin-top: 20px;

	input {
		height: 40px;
		padding-left: 5px;
		font-size: 14px;
		background-color: $input-bgColor;

	}
}
</style>