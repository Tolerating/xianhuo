<script lang="ts" setup>
	import { computed, reactive } from 'vue';
	import { nextTick, ref, onMounted } from 'vue';
	import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
	import { useNow, useDateFormat } from '@vueuse/core'
	import { updateInChat } from '@/api/user/user'
	import useUserStore from '@/stores/users';
	import { storeToRefs } from 'pinia';
	import { clearUnRead, allMessages } from '@/api/chat/index';
	import type { ChatMessage } from '@/types/ChatMessage';
	import { APP_BASE_URL } from '@/config';
	import useCommonStore from '@/stores/common'
	import { uploadImg } from '@/api/home/goods';
	const userStore = useUserStore()
	const commonStore = useCommonStore()
	const { userInfo } = storeToRefs(userStore)
	const { socketOpen, inChat } = storeToRefs(commonStore)
	const toUser = reactive<{ toUserId : string, toUserName : string, toUserPicture : string }>({
		toUserId: "",
		toUserName: "",
		toUserPicture: ""
	})
	// 聊天关系id
	const linkId = ref<string>("")
	// 未读消息数量
	const unread = ref<number>(0)
	// 输入框容
	const inputValue = ref<string>("")
	// 上传的图片
	const sendImg = ref<string>("")
	const previewImg = reactive<string[]>([])
	const isFocus = ref<boolean>(false)
	const messageList = reactive<ChatMessage[]>([])
	const scrollIntoView = ref<string>("msg" + (messageList.length - 1))


	const initWebsocket = () => {
		commonStore.socket?.onMessage((res : any) => {
			// console.log("服务端消息", res.data);
			let receive = JSON.parse(res.data)
			if (receive.sendUser == toUser.toUserId) {
				messageList.push({
					scrollId: messageList.length,
					content: receive.content,
					toUser: String(userInfo.value.id),
					fromUser: toUser.toUserId,
					linkId: linkId.value,
					type: receive.messageType,
					sendTime: useDateFormat(useNow(), "YYYY-MM-DD HH:mm").value
				})
				if(receive.messageType == 1){
					previewImg.push(APP_BASE_URL + receive.content)
				}
				nextTick(() => {
					scrollIntoView.value = 'msg' + (messageList.length - 1)
				})
				scrollIntoView.value = ''
			}

		})
	}
	onLoad(option => {
		console.log("聊天页面加载");
		toUser.toUserId = option?.toUser
		toUser.toUserName = option?.toUserName
		toUser.toUserPicture = option?.toUserPicture
		linkId.value = option?.linkId
		unread.value = option?.unread
		uni.setNavigationBarTitle({
			title: option?.toUserName
		})
	})
	onUnload(() => {
		console.log("页面卸载");
		// 将聊天内容缓存到本地
		// if(messageList.length > 0){
		//     uni.setStorageSync(`chat${toUser.toUserId}`, messageList)
		// }
		inChat.value = false
		updateInChat(0)
	})
	const sendMessage = (type : number) => {
		const sendData : any = {
			linkId: linkId.value,
			toUser: toUser.toUserId,
			fromUser: userInfo.value.id,
			senderName: userInfo.value.name,
			senderAvatar: userInfo.value.avatar
		}
		if (type == 0) {
			// 文本
			sendData.content = inputValue.value
			sendData.type = 0
		} else {
			// 图片
			sendData.content = sendImg.value
			sendData.type = 1
		}

		commonStore.socket?.send({
			data: JSON.stringify(sendData)
		})
		messageList.push({
			scrollId: messageList.length,
			content: sendData.content,
			toUser: toUser.toUserId,
			fromUser: String(userInfo.value.id),
			linkId: linkId.value,
			type: sendData.type,
			sendTime: useDateFormat(useNow(), "YYYY-MM-DD HH:mm").value
		})
		inputValue.value = ""
		nextTick(() => {
			scrollIntoView.value = 'msg' + (messageList.length - 1)
		})
		scrollIntoView.value = ''

	}
	const preview = (item:ChatMessage)=>{
		uni.previewImage({
			urls:previewImg,
			current:APP_BASE_URL + item.content
		})
	}

	const chooseImg = () => {
		uni.chooseImage({
			count: 1,
			success(e : any) {
				uploadImg({ name: "file", file: e.tempFiles[0].file, uri: e.tempFilePaths[0] }).then(res => {
					sendImg.value = res.data
					previewImg.push(APP_BASE_URL + res.data)
					sendMessage(1)
				})
			}
		})
	}

	onShow(() => {
		initWebsocket()
		inChat.value = true
	})
	onMounted(async () => {
		// 读取缓存的聊天内容
		console.log(unread.value);
		// let chatHistory = uni.getStorageSync(`chat${toUser.toUserId}`)
		// // console.log("chatHistory",chatHistory=='');

		// if (chatHistory) {
		//     messageList.length = 0
		//     messageList.push(...uni.getStorageSync(`chat${toUser.toUserId}`))
		// }
		// if (unread.value > 0) {
		uni.showLoading({
			title: "获取记录中"
		})
		await clearUnRead(String(userInfo.value.id), linkId.value)
		// 获取最新的消息
		const result = await allMessages(linkId.value)
		messageList.push(...result.data)
		messageList.forEach(item=>{
			if(item.type==1){
				previewImg.push(APP_BASE_URL + item.content)
			}
		})
		uni.hideLoading()
		// }
		// if(chatHistory == ""){
		//     const result = await allMessages(linkId.value)
		//     console.log(result);

		//     messageList.push(...result.data)
		// }
		nextTick(() => {
			scrollIntoView.value = "modal"
		})
		scrollIntoView.value = ''
		updateInChat(1)

	})
</script>
<template>
	<view class="chat-view-container">
		<scroll-view scroll-y="true" style="height:calc(100vh - 44px - 55px);" :scroll-into-view="scrollIntoView"
			:enable-flex="true" class="chat-view-list">
			<template v-for="(item,index) in messageList" :key="item.content">

				<view v-if="item.fromUser != String(userInfo.id)" :id="'msg' + item.scrollId"
					class="chat-other-message">
					<view class="message-avatar">
						<image :src="toUser.toUserPicture" style="height: 100%;width: 100%;" mode="scaleToFill" />
					</view>
					<view class="other-message-content">
						<text v-if="item.type==0">{{ item.content }}</text>
						<image class="chat-img" v-else :src="APP_BASE_URL + item.content" @tap="preview(item)"></image>
					</view>
				</view>
				<view v-else class="chat-mine-message" :id="'msg' + item.scrollId">
					<view class="mine-message-content">
						<text v-if="item.type==0">{{ item.content }}</text>
						<image class="chat-img" v-else :src="APP_BASE_URL + item.content" @tap="preview(item)"></image>
					</view>
					<view class="message-avatar">
						<image :src="userInfo.avatar" style="height: 100%;width: 100%;" mode="scaleToFill" />
					</view>
				</view>
			</template>
			<view id="modal"></view>
		</scroll-view>
		<view class="chat-input-container" style="display: flex;flex-direction: column;">
			<view style="display: flex;width: 100%;">
				<uv-tags text="发送图片" @tap="chooseImg" custom-style="padding:0 10px"></uv-tags>

			</view>
			<view style="display: flex;width: 100%;align-items: center;">
				<!-- <uni-easyinput v-model="inputValue" :focus="isFocus" maxlength="-1" type="textarea" confrimType="send"
                    @confirm="" style="height:35px;" :styles="{ backgroundColor: 'rgba(143, 147, 156, 0.2);' }"
                    :inputBorder="false" class="chat-input" /> -->
				<uv-input class="chat-input" type="textarea" confrimType="send" v-model="inputValue"></uv-input>
				<button class="chat-send-btn" :disabled="!socketOpen" @tap.stop="sendMessage(0)">发送</button>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
	.message-content-common {
		min-height: 20px;
		max-width: 75vw;
		padding: 5px;
		font-size: $xh-font-size-lg;
		position: relative;
		border-radius: 5px;
	}

	.chat-view-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 10px;
		width: 100%;
		background-color: white;
		.chat-img{
			max-width: 150px;
			max-height: 150px;
		}
		.navigator-header {
			height: 44px;
			background-color: white;
			display: flex;
		}

		.chat-view-list {
			display: flex;
			flex-direction: column;
			padding: 20px 0 15px 0;
			box-sizing: border-box;
			// height: calc(100vh - 44px - 55px);

			.chat-mine-message {
				display: flex;
				margin-bottom: 10px;
				justify-content: flex-end;

				.mine-message-content {
					@extend .message-content-common;
					background-color: $xh-color-primary;
					margin-right: 6px;
				}

				.mine-message-content::after {
					content: " ";
					height: 0;
					width: 0;
					position: absolute;
					top: 40px;
					bottom: 0;
					right: -4px;
					transform: translateY(-25px);
					border-left: 5px solid $xh-color-primary;
					border-top: 5px solid transparent;
					border-bottom: 5px solid transparent;
				}


			}

			.message-avatar {
				$avatar-side: 40px;
				width: $avatar-side;
				height: $avatar-side;
			}

			.chat-other-message {
				display: flex;
				margin-bottom: 10px;


				.other-message-content {
					@extend .message-content-common;
					background-color: rgba($color: $xh-color-info, $alpha: .2);
					margin-left: 6px;
				}

				.other-message-content::before {
					content: " ";
					width: 0;
					height: 0;
					position: absolute;
					top: 40px;
					bottom: 0;
					transform: translateY(-20px);
					left: -4px;
					border-right: 5px solid rgba($color: $xh-color-info, $alpha: .2);
					border-bottom: 5px solid transparent;
					border-top: 5px solid transparent;
				}
			}

		}

		.chat-input-container {
			display: flex;
			align-items: center;
			padding: 10px 5px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: white;

			.chat-input-icon {
				width: 25px;
				height: 25px;
				padding: 5px;
			}

			.chat-input {
				background-color: rgba($color: $xh-color-info, $alpha: .2);
				border: none;
				border-radius: 15px;
				overflow: hidden;
			}

			.chat-send-btn {
				height: 30px;
				background-color: $xh-color-primary;
				line-height: 30px;
				font-size: $xh-font-size-base;
				// padding: 5px;

			}

			.emoji-list-container {
				display: flex;
				background-color: rgba($color: $xh-color-info, $alpha: .2);
				height: 35vh;
				flex-wrap: wrap;
				margin-top: 5px;
				padding-top: 5px;
				column-gap: 5px;

				text {
					font-size: $xh-font-size-2xl;
					padding: 5px;
				}
			}


		}
	}
</style>