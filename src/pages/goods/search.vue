<!-- 搜索输入框页面 -->
<template>
	<view class="search_history">
		<text class="search_history_title">历史搜索</text>
		<uni-icons type="trash-filled" @tap="deleteHistory" class="cuIcon-delete"></uni-icons>
		<view class="search_history_tags">
			<uni-tag v-for="(item, index) in historyList" @tap="navigateToShow(item)" :key="index" :text="item" size="small"
				:circle="true"></uni-tag>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onNavigationBarButtonTap, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputChanged, onShow, onHide } from '@dcloudio/uni-app'
import { ref, getCurrentInstance, reactive } from 'vue';
const historyList = reactive<string[]>([])
const deleteHistory = () => {
	uni.removeStorageSync("history_search")
	historyList.splice(0, historyList.length)
}
const searchValue = ref<string>("")
// #ifdef APP-PLUS
const ins = getCurrentInstance()
//@ts-ignore
let webView = ins.ctx.$scope.$getAppWebview();
onNavigationBarButtonTap((e) => {
	navigateToFilter()
})
onNavigationBarSearchInputChanged((e => {
	searchValue.value = e.text.trim()
}))

onNavigationBarSearchInputConfirmed((e) => {
	if (e.text) {
		navigateToFilter()
	}
})
//#endif

const navigateToFilter = () => {
	if (searchValue.value) {
		if(historyList.indexOf(searchValue.value) != -1){
			historyList.push(searchValue.value)
		}
		uni.navigateTo({
			url: `/pages/goods/goodsFilter?key=${searchValue.value}&category=0&sell=0`,

		})
	}
}
// 点击历史记录tag的操作
const navigateToShow = (val: string): void => {
	webView.setTitleNViewSearchInputText(val)
	searchValue.value = val
	uni.navigateTo({
		url: `/pages/goods/goodsFilter?key=${searchValue.value}&category=0&sell=0`,

	})

}
onShow(() => {
	historyList.length = 0
	historyList.push(...uni.getStorageSync("history_search"))
})
onHide(() => {
	uni.setStorageSync("history_search", historyList)
})
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