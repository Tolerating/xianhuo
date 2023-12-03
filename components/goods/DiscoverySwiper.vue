<template>
	<view class="swiper-category-wrapper">
		<scroll-view class="swipper-categoryX" scroll-x="true" scroll-left="0">

			<view v-for="(item) in tabList" :key="item.id" :class="{selected:currentIndex==item.id}"
				class="scroll-view-item_H " @click="changeTab(item)">{{item.title}}</view>
		</scroll-view>
		<!-- 分类添加，以后再做 -->
		<!-- <view class="category-add">
			<uni-icons type="plusempty" size="25"></uni-icons>
		</view> -->
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import useCommonStore from "@/stores/common"
	import {DiscoveryType} from '@/types/common'
	// import { storeToRefs } from 'pinia';
	const store = useCommonStore()
	const {tabList,currentTab,currentScrollTop} = store
	const emits = defineEmits<{
		(e:"tabChange",arg1: DiscoveryType):void
	}>()
	const currentIndex = ref<number>(0);
	const changeTab = (val : DiscoveryType) : void => {
		currentIndex.value = val.id;
		console.log(`设置storage--${"discovery" +currentTab.id}`,currentTab.title,store.currentScrollTop);
		uni.setStorageSync("discovery" +currentTab.id,store.currentScrollTop)
		console.log("获取最新页面位置的缓存",uni.getStorageSync("discovery"+currentTab.id));
		emits("tabChange",val)
	}
</script>

<style lang="scss" scoped>
	.swiper-category-wrapper {
		$wrapper-height: 30px;
		display: flex;
		align-items: flex-end;
		position: relative;
		width: 100%;
		background-color: white;
		height: $wrapper-height;
		margin-top: 10px;
		margin-bottom: 10px;

		.swipper-categoryX {
			flex: 1;
			white-space: nowrap;

			.scroll-view-item_H {
				display: inline-block;
				background-color: #cdc4ff;
				height: $wrapper-height;
				padding: 0 10px 0 10px;
				border-radius: 15px;
				line-height: $wrapper-height;
				text-align: center;
				font-size: 14px;
				margin-right: 25px;

			}

			& .selected {
				background-color: $xianhuo-theme-color;
			}

		}

		.category-add {
			position: absolute;
			right: 0;
			height: 100%;
			display: flex;
			align-items: center;
			background-color: #d4cdb7;
			width: 20px;
			text-align: center;
		}
	}
</style>