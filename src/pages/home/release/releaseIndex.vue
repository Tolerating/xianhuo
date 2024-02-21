<!-- 发布商品、发布帖子页面 -->
<template>
	<view class="release-page-container">
		<!-- 状态栏 -->
		<view :style="{ height: statusBarHeight + 'px',backgroundColor:'white' }"></view>
		<!-- 发布选择 -->
		<view class="release-select-wrapper">
			<view class="select-item" @tap="goRelease(0)">
				<uni-icons
					type="camera-filled"
					color="black"
					size="35"
					class="item-left"
				/>
				<view class="item-title">
					<text>发闲置</text>
					<text>物品出租、物品出售</text>
				</view>
				<uni-icons
					type="right"
					color="black"
					size="25"
					class="item-right"
				/>
			</view>
			<view class="select-item" @tap="goRelease(1)">
				<uni-icons
					type="pyq"
					color="black"
					size="35"
					class="item-left"
				/>
				<view class="item-title">
					<text>发帖子</text>
					<text>晒好物、发需求、校园动态</text>
				</view>
				<uni-icons
					type="right"
					color="black"
					size="25"
					class="item-right"
				/>
			</view>
		</view>
		<!-- 关闭按钮，返回上一页 -->
		<view class="close-page">
			<uni-icons
				type="close"
				color="black"
				size="65"
				@tap="goBack"
			/>
		</view>
	</view>

</template>

<script lang="ts" setup>
import { ref } from "vue";
let StatusBarHeight = Number(uni.getSystemInfoSync().statusBarHeight);
const statusBarHeight = ref<number>(StatusBarHeight)
const goBack = ()=>{
	uni.navigateBack()
}
const goRelease = (path:number)=>{
	switch (path) {
		case 0:
			uni.navigateTo({
				url:"/pages/home/release/releaseGoods"
			})
			break;
	
		case 1:
			uni.navigateTo({
				url:"/pages/home/release/releaseRequire"
			})
			break;
	}
}
</script>

<style lang="scss" scoped>
.release-page-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	.release-select-wrapper{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding:0 30px 20px;
		row-gap: 15px;
        .select-item {
			height: 65px;
			background-color: $xh-color-primary;
			display: flex;
			align-items: center;
			border-radius: 10px;
            .item-left {
				padding:0 20px ;
            }
            .item-title {
				display: flex;
				flex-direction: column;
				flex: 1;
				text:first-child{
					font-size: $xh-font-size-xl;
					font-weight:bold;
				}
				text:last-child{
					font-size: $xh-font-size-base;
				}
			}
            .item-right {
				padding-right: 5px;
            }
        }
	}
	.close-page{
		background-color: white;
		display: flex;
		justify-content: center;
		padding-bottom: 5px;
	}
}
</style>