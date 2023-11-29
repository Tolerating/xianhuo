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
			<view class="swiper-category-wrapper">
				<scroll-view class="swipper-categoryX"  scroll-x="true" scroll-left="120">
					<view id="demo0" class="scroll-view-item_H ">最新发布</view>
					<view id="demo1" class="scroll-view-item_H ">猜你喜欢</view>
					<view id="demo2" class="scroll-view-item_H ">以物换物</view>
					<view id="demo3" class="scroll-view-item_H ">物品出租</view>
					<view id="demo3" class="scroll-view-item_H ">物品出租</view>
					<view id="demo3" class="scroll-view-item_H ">物品出租</view>
					<view id="demo3" class="scroll-view-item_H ">物品出租</view>
				</scroll-view>
				<view class="category-add">
					<uni-icons type="plusempty" size="25"></uni-icons>
				</view>
			</view>
		</view>
		
		<view class="goods-wrapper">			
			<view v-for="key in goodsNum" :key="key" class="goods-item">
				{{key}}
			</view>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import {ref} from 'vue'
	import {onReachBottom} from '@dcloudio/uni-app'
	const searchValue = ref<string>("")
	const goodsNum = ref<number>(10)
	
	onReachBottom(()=>{
		console.log("到底了");
		goodsNum.value +=5
	})
	
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
	.swiper-category-wrapper{
		$wrapper-height:30px;
		display: flex;
		align-items: flex-end;
		position: relative;
		width: 100%;
		background-color: white;
		height: $wrapper-height;
		margin-top: 10px;
		margin-bottom: 10px;
		.swipper-categoryX{
			flex: 1;
			white-space: nowrap;
			.scroll-view-item_H {
				display: inline-block;
				background-color: #eae53c;
				height: $wrapper-height;
				padding: 0 10px 0 10px;
				border-radius: 15px;
				line-height: $wrapper-height;
				text-align: center;
				font-size: 14px;
				margin-right: 25px;
				
			}
			
		}
		.category-add{
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
	.goods-wrapper{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding:0px 5px 0px 5px;
		
		.goods-item{
			width: 200px;
			background-color: red;
			padding: 5px;
			height: 200px;
			margin-bottom: 10px;
		}
	}
}
::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	} 
.top-fixed{
	position: sticky;
	top: 0;
	background-color: white;
}




</style>