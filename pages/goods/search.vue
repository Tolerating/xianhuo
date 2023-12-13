<!-- 搜索输入框页面 -->
<template>
	<view class="search_history">
		<text class="search_history_title">历史搜索</text>
		<uni-icons type="trash-filled" @tap="deleteHistory" class="cuIcon-delete"></uni-icons>
		<view class="search_history_tags">
			<uni-tag v-for="(item,index) in historyList" @tap="navigateToShow(item)" :key="index" :text="item"
				size="small" :circle="true"></uni-tag>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onNavigationBarButtonTap, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputChanged } from '@dcloudio/uni-app'
	import { ref, getCurrentInstance, reactive } from 'vue';
	const historyList = reactive<string[]>(["苹果", "头戴式耳机", "耐克", "算法书", "Java从入门到精通", "吹风机", "游戏机", "水杯"])
	const deleteHistory = () => {
		historyList.splice(0, historyList.length)
	}
	const searchValue = ref<string>("")
	// #ifdef APP-PLUS
	const ins = getCurrentInstance()
	//@ts-ignore
	let webView = ins.ctx.$scope.$getAppWebview();
	onNavigationBarButtonTap((e) => {
		console.log(e);
		console.log(searchValue.value);
		if (searchValue.value) {
			historyList.push(searchValue.value)
			uni.navigateTo({
				url: "/pages/search/goodsShow"
			})
		}
	})
	onNavigationBarSearchInputChanged((e => {
		searchValue.value = e.text.trim()
		console.log(e.text);
	}))
	
	onNavigationBarSearchInputConfirmed((e) => {
		if (e.text) {
			navigateToFilter()
		}
	})
	//#endif
	
	const navigateToFilter=()=>{
		uni.navigateTo({
			url: `/pages/goods/goodsFilter?text=${searchValue.value}`,
			
		})
	}
	
	const navigateToShow = (val : string) : void => {
		webView.setTitleNViewSearchInputText(val)
		navigateToFilter()
		
	}
</script>

<style lang="scss" scoped>
	$zx-search-margin-top: 12px;

	.search_history {
		.search_history_title {
			display: inline-block;
			color: black;
			font-size: 16px;
			font-weight: 600;
			margin-left: 10px;
			margin-top: $zx-search-margin-top;
		}

		.cuIcon-delete {
			float: right;
			color: black;
			margin-top: $zx-search-margin-top;
			margin-right: 10px;
		}

		.search_history_tags {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			padding: 5px 10px;
			padding: 5px 10px;
			column-gap: 10px;

		}

		.search_history_tags text {
			margin-top: 5px;
			font-size: 12px !important;
		}

	}
</style>