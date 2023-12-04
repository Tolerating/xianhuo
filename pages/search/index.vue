<template>
	<view class="">
		
	</view>
</template>

<script lang="ts" setup>
	import {onNavigationBarButtonTap,onNavigationBarSearchInputConfirmed} from '@dcloudio/uni-app'
import { ref,getCurrentInstance } from 'vue';
	const ins = getCurrentInstance()
	// for(let k in ins.ctx.$page) {
	// 	console.log(k, ins.ctx.$page[k])
	// }
	// console.log(ins.ctx.$scope);
	// #ifdef APP-PLUS  
	var webView = ins.ctx.$scope.$getAppWebview();
	
	webView.setTitleNViewSearchInputText("123")
	//#endif
	onNavigationBarButtonTap(()=>{
		uni.showToast({
			title:"搜搜"
		})
	})
	onNavigationBarSearchInputConfirmed(()=>{
		uni.navigateTo({
			url:"/pages/search/goodsShow"
		})
	})
</script>

<style lang="scss" scoped>

</style>