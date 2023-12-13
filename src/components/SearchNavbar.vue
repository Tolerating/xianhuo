<script setup lang="ts">
import { onMounted, ref } from "vue";
	//获取设备的的状态栏高度
	let StatusBarHeight = Number(uni.getSystemInfoSync().statusBarHeight);
	const statusBarHeight = ref<number>(StatusBarHeight)
	interface Props {
		fixed:boolean,
		statusBar:boolean,
		statusBarBgColor?:string,
		navBarHeight:number
	}
	const props = withDefaults(defineProps<Props>(),{
		fixed:true,
		statusBar:false,
		statusBarBgColor:"#fff",
		navBarHeight:45
	}) 
	onMounted(()=>{
		console.log(statusBarHeight+'px');
	})
	
</script>
<template>
	<view class="search_navBar_wrapper" v-bind:style="{height:(statusBarHeight+navBarHeight)+'px'}">
		<view class="search_navBar_container" v-bind:style="{position:fixed?'fixed':'inline'}">
			<view v-if="statusBar" v-bind:style="{backgroundColor:statusBarBgColor,height:statusBarHeight+'px'}"  class="status_bar"></view>
			<slot></slot>
			<!-- <view class="cu-bar search top_tabbar" v-bind:style="{backgroundColor:searchBarBgColor}">
				<view class="search-form round tabbar_input">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索充电宝、照相机...." confirm-type="search"></input>
				</view>
				<view class="action">
					<slot name="right"></slot>
				</view>
			</view> -->
		</view>
	</view>
</template>



<style lang="scss" scoped>
	$zx-home-top-tabbar-height:24px;
	// .top_tabbar{
	// 	min-height: $zx-home-top-tabbar-height;
	// 	.tabbar_input{
	// 		margin: 0 5px 0px 16px;
	// 	}
	// 	.cuIcon-scan{
	// 		color: #FFFFFF;
	// 		font-size: 24px;
	// 	}
	// }
	.search_navBar_wrapper{
		margin: 0;
		padding: 0;
		z-index: 1000;
		width: 100%;
	}
	.search_navBar_container{
		z-index: 1000;
		.status_bar{
			width: 750rpx;
			height: 20px;
		}
	}
</style>
