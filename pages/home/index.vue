<template>
	<view class="home-index-wrapper">
		<view class="top-fixed">
			<view class="status_bar">
				
			</view>
			<view class="home-index-organization">
				<image src="../../static/tabbar/home.png" mode=""></image>
				<text>浙江万里学院</text>
			</view>
			<view class="search-wrapper">
				<view class="search-input">
					<uni-easyinput  v-model="searchValue" type="text" suffix-icon="search" placeholder=""  />
				</view>
				<view class="search-category">
					<uni-icons type="list" size="25">分类</uni-icons>
					<text>分类</text>
				</view>
			</view>
			<DiscoverySwiper @tabChange="getTabSelectedGoods"></DiscoverySwiper>
		</view>
		<template v-for="(item) in tabList" :key="item.id">
			<GoodsWaterFallFlow  :disCoveryType="item" v-show="currentTab.id==item.id"></GoodsWaterFallFlow>
		</template>
		<!-- <view class="goods-wrapper">
			<keep-alive>
				<GoodCard v-for="key in goodsNum" :key="key" class="goods-item"></GoodCard>
			</keep-alive>
		</view> -->
	</view>

</template>

<script lang="ts" setup>
	import {ref} from 'vue'
	import {onReachBottom} from '@dcloudio/uni-app'
	import { DiscoveryType } from '@/types/common'
	import DiscoverySwiper from '@/components/goods/DiscoverySwiper.vue'
	import GoodsWaterFallFlow from '@/components/goods/GoodsWaterFallFlow.vue'
	import useCommonStore from "@/stores/common"
	import { storeToRefs } from 'pinia'
	const searchValue = ref<string>("")
	const store = useCommonStore()
	const {reachBottom} = storeToRefs(store)
	const {tabList,currentTab} = store
	onReachBottom(()=>{
		store.updateReachBottom(!reachBottom.value)
	})
	
	const getTabSelectedGoods = (val:DiscoveryType)=>{
		uni.pageScrollTo({
			offsetTop:0,
			duration:0
		})
		store.updateCurrentTab(val)
	}
</script>

<style lang="scss" scoped>
$icon-size:25px;
.home-index-wrapper{
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content:flex-start;
	width: 100%;
	background-color: white;
	.status_bar{
		background-color: #d4c9a7;
		height:var(--status-bar-height);
	}
	.home-index-organization{
		padding: 5px 10px 0px 10px;
		$line-height:30px;
		display: flex;
		align-items: center;
		height: $line-height;
		background-color:white;
		font-size: 16px;
		image{
			width: $icon-size;
			height:$icon-size;
		}
		text{
			padding-left: 10px;
		}
	}
	.search-wrapper{
		display: flex;
		padding: 0px 5px 0 10px;
		height: 40px;
		align-items: center;
		background-color: white;
		.search-input{
			flex: 9;
		}
		.search-category{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-left: 10px;
			flex: 1;
			font-size: 13px;
		}
	}
	
}
.top-fixed{
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 10000;
}
</style>