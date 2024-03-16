<template>
	<WaterFullLayout :statusBar="true">
		<template #navigateBar>
			<view class="navigate-bar">
				<view class="navigate-bar-left">
					<text class="left-title">消息</text>
					<!-- <view class="xh-btn-group">
						<uni-icons type="trash-filled" color="gray" size="16" />
						清除未读
					</view> -->
				</view>
				<!-- <uni-icons type="gear-filled" color="gray" size="24" /> -->
			</view>
		</template>
		<view class="longpress-menu-container" @tap="isShowMenu = false" v-show="isShowMenu">
			<view class="menu-content">
				<!-- <text>置顶</text> -->
				<text @tap="deleteChatList">移除</text>
			</view>
		</view>
		<view class="message-list-container">
			<uv-empty v-if="chatlists.length == 0" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;" mode="message"></uv-empty>
			<view v-if="chatlists.length > 0" v-for="item in chatlists" :key="item.linkId" @tap="toChat(item)"
				@longpress="setCurrentSelectedList(item)" class="message-item">
				<view class="message-item-avatar">
					<image v-if="item.fromUser == String(userInfo.id)" :src="APP_BASE_URL + item.toUserPicture"
						mode="scaleToFill" />
					<image v-else :src="APP_BASE_URL + item.fromUserPicture" mode="scaleToFill" />
				</view>
				<view class="message-item-contnet">
					<text v-if="item.fromUser == String(userInfo.id)" class="content-user-name">{{ item.toUserName }}</text>
					<text v-else class="content-user-name">{{ item.fromUserName }}</text>
					<text class="content-latest-message">{{ item.content }}</text>
					<text class="content-latest-date">{{ item.sendTime }}</text>
					<uni-badge :text="item.unread" type="error" size="normal" class="content-badge" />
				</view>
			</view>
		</view>
	</WaterFullLayout>
</template>

<script lang="ts" setup>
import WaterFullLayout from '@/components/WaterFullLayout.vue'
import { onShow } from '@dcloudio/uni-app';
import { APP_BASE_URL } from '@/config/index'
import { chatLists, deleteList } from '@/api/chat/index'
import { ref } from 'vue';
import { reactive } from 'vue';
import type { ChatList } from '@/types/ChatList';
import useUserStore from '@/stores/users/index'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const currentSelectedChat = ref<ChatList>()
const isShowMenu = ref<boolean>(false);
const chatlists = reactive<ChatList[]>([])
const toChat = (item: ChatList) => {
	let toUser = "-1";
	let toUserName = ""
	let toUserPicture = APP_BASE_URL
	if (String(userInfo.value.id) == item.fromUser) {
		toUser = item.toUser
		toUserName = item.toUserName
		toUserPicture += item.toUserPicture
	} else {
		toUser = item.fromUser
		toUserName = item.fromUserName
		toUserPicture += item.toUserPicture
	}
	uni.navigateTo({
		url: `/pages/home/chat/chatView?toUser=${toUser}&toUserName=${toUserName}&toUserPicture=${toUserPicture}&linkId=${item.linkId}&unread=${item.unread}`,
		animationDuration: 0
	})
}
const setCurrentSelectedList = (item: ChatList) => {
	currentSelectedChat.value = item
	isShowMenu.value = true
}
const deleteChatList = async () => {
	let result = await deleteList(currentSelectedChat.value?.listId as string)
	uni.showToast({
		title: result.message
	})
	let data = await chatLists()
	chatlists.length = 0
	//@ts-ignore
	chatlists.push(...data.data)
}
onShow(() => {
	chatLists().then(res => {
		console.log(res.data);
		if (res.data != null) {
			chatlists.length = 0
			//@ts-ignore
			chatlists.push(...res.data)
		}
	})
	uni.removeTabBarBadge({
		index:2
	})
})
</script>

<style lang="scss" scoped>
.navigate-bar {
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.navigate-bar-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.left-title {
			font-size: $xh-font-size-2xl;
			font-weight: bold;
			color: $xh-text-color-highlight;
		}

		.xh-btn-group {
			background-color: rgba($color: $xh-color-info, $alpha: .2);
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			border-radius: 10px;
			font-size: $xh-font-size-lg;
			color: gray;
			padding: 2px 3px;
		}
	}


}

.message-list-container {
	display: flex;
	flex-direction: column;
	padding: 10px 0 50px;

	.message-item {
		$item-height: 80px;
		$avatar-side: 70px;
		display: flex;
		height: $item-height;
		margin: 10px 0;

		.message-item-avatar {
			align-self: center;
			height: $avatar-side;
			width: $avatar-side;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.message-item-contnet {
			flex: 1 1 calc(100% - $avatar-side);
			height: $item-height;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			padding-bottom: 10px;
			position: relative;
			border-bottom: 1px solid rgba($color: $xh-border-color, $alpha: .2);

			.content-user-name {
				font-size: $xh-font-size-xl;
				color: $xh-text-color-highlight;
			}

			.content-latest-message {
				font-size: $xh-font-size-lg;
				color: gray;
			}

			.content-latest-date {
				font-size: $xh-font-size-sm;
				color: gray;
			}

			.content-badge {
				position: absolute;
				right: 0;
				top: calc($item-height / 2);
				transform: translateY(-50%);
			}
		}
	}

}

.longpress-menu-container {
	$menu-height: 100px;
	position: absolute;
	inset: 0;
	background-color: $xh-bg-color-mask;
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;

	.menu-content {
		height: $menu-height;
		width: 70%;
		background-color: white;
		display: flex;
		padding: 0 20px;
		flex-direction: column;
		justify-content: space-around;
		font-size: $xh-font-size-lg;


	}
}</style>