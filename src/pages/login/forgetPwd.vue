<script lang="ts" setup>
	import {
		computed,
		ref, watch
	} from "vue";
	
	const phone = ref <string> ("")
	const code = ref < string > ("")
	const pwd = ref<string>("")
	const rePwd = ref<string>("")
	const showInputPwd = ref<Boolean>(false)
	watch(code,(newValue, oldValue)=>{
		if (newValue == "1111") {
			showInputPwd.value = true;
		}
	})
	const isRegister = computed(()=>{
		const result = phone.value != "" && code.value != "" && (pwd.value != "" && rePwd.value != "" && pwd.value == rePwd.value);
		return !result;
	})
	const updatePwd = ()=>{
		
	}
</script>
<template>
	<view class="register_page">
		<!-- <SearchNavbar class="register_topBar" :navBarHeight="40" :fixed="true" :statusBar="true">
			<template>
				<view class="topBar_back">
					<navigator style="display: inline-block;" open-type="navigateBack" hover-class="navigator-hover">
						<text class="cuIcon-back"></text>
					</navigator>
				</view>
			</template>
		</SearchNavbar> -->
		<view class="register_page_container">
			<view class="register_title">
				<text>忘记密码</text>
			</view>
			<view class="register_item">
				<text>账户</text>
				<view class="">
					<input placeholder="手机号" v-model="phone" name="input" />
				</view>
			</view>
			<view class="register_item">
				<text>验证码</text>
				<view class="message_group">
					<input :disabled="showInputPwd" placeholder="短信验证码" v-model="code" name="input" />
					<view style="flex: 1;" class=""></view>
					<button class="cu-btn sm message_button">发送短信</button>
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
.register_page{
		background-image: $login-bgColor;
		position: fixed;
		top: -44px;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.register_topBar{
		position: absolute;
		top: 0;
		.topBar_back{
			width: 100%;
			font-size: 24px;
			color: white;
			padding: 10px 0 0 10px;
		}
	}
	.register_page_container{
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
		.register_title{
			font-size: 28px;
			font-weight: bold;
			height: 50px;
			padding: 20px 0 0 0;
			align-self: flex-start;
		}
		.register_item{
			width: 100%;
			margin-top: 15px;
			input{
				height: 40px;
				padding-left: 5px;
				margin-top: 5px;
				font-size: 14px;
				background-color: $input-bgColor;
			}
		}
		.login_forget_pwd{
			height: 50px;
			width: 245px;
			display: flex;
			justify-content: flex-end;
			color: #4496DC;
			font-size: 14px;
			padding-top: 20px;
		}
		.login_button{
			background-image: $login-btn-bgColor;
			width: 175px;
			margin-top: 25px;
			color: white;
			font-size: 18px;
		}
	}
	.message_group{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		input{
			flex:3;
		}
		.message_button{
			background-image: $login-btn-bgColor;
			color: white;
			font-size: 15px;
			height: 40px;
			border-radius: 5px;
		}
	}
</style>