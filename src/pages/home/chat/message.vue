<template>
	<WaterFullLayout :statusBar="true">
		<template #navigateBar>
			<view class="navigate-bar">
				<view class="navigate-bar-left">
					<text class="left-title">消息</text>
					<view class="xh-btn-group">
						<uni-icons type="trash-filled" color="gray" size="16" />
						清除未读
					</view>
				</view>
				<uni-icons type="gear-filled" color="gray" size="24" />
			</view>
		</template>
		<view class="longpress-menu-container" @tap="isShowMenu=false" v-show="isShowMenu">
			<view class="menu-content">
				<text>置顶</text>
				<text>移除</text>
			</view>
		</view>
		<view class="message-list-container">
			<view v-for="item in 20" :key="item" @tap="toChat" @longpress="isShowMenu=true" class="message-item">
				<view class="message-item-avatar">
					<image src="../../static/logo.png" mode="scaleToFill" />
				</view>
				<view class="message-item-contnet">
					<text class="content-user-name">用户名字</text>
					<text class="content-latest-message">最近的一条消息</text>
					<text class="content-latest-date">2023-12-28</text>
					<uni-badge :text="1" type="error" size="normal" class="content-badge" />
				</view>
			</view>
		</view>

	</WaterFullLayout>
</template>

<script lang="ts" setup>
import WaterFullLayout from '@/components/WaterFullLayout.vue'
import { ref } from 'vue';
const isShowMenu = ref<boolean>(false);
const toChat = () => {
	uni.navigateTo({
		url: "/pages/goods/search",
		animationDuration: 0
	})
}
</script>

<style lang="scss" scoped>
.navigate-bar {
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 $xianhuo-padding-LR;

	.navigate-bar-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.left-title {
			font-size: 24px;
			font-weight: bold;
			color: $xh-text-color-A;
		}

		.xh-btn-group {
			background-color: $xh-theme-color-50;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			border-radius: 10px;
			font-size: 16px;
			color: gray;
			padding: 2px 3px;
		}
	}


}
.message-list-container {
	display: flex;
	flex-direction: column;
	padding: 10px $xianhuo-padding-LR 50px;

	.message-item {
		$item-height: 80px;
		$avatar-side: 70px;
		display: flex;
		height: $item-height;
		// background-color: $uni-color-error;
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
				font-size: 20px;
				color: $xh-text-color-A;
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
	$menu-height:100px;
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
}
</style>