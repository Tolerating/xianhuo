<template>
	<view class="good-card-wrapper" @tap="toGoodsDetail">
		<view style="margin: 0 5px;">
			<image src="../../static/yifu.jpg" class="good-image" mode=""></image>
		<text class="goods-title">
			<span>{{saleType}}</span>
			我是标题
		</text>
		<view class="goods-price">
			<text><span>￥</span>680</text>
		</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{saleType?:string}>(),{
	saleType:"售"
})
const toGoodsDetail = ()=>{
  uni.navigateTo({
    url:"/pages/goods/goodDetail"
  })
}
</script>

<style lang="scss" scoped>
$card-min-width:220px;
$card-padding-left:5px;
.good-card-wrapper{
	// margin: 0 10px;
	display: flex;
	flex-direction: column;
	background-color: white;
	overflow: hidden;
	.good-image{
		width: 100%;
		border-radius: 15px;
	overflow: hidden;
	}
	.goods-title{
		padding-left: $card-padding-left;
		color: black;
		font-size: 14px;
		span{
			padding: 2px;
			background-color: #00aaff;
			font-size: 14px;
			color: white;
		}
	}
	.goods-price{
		padding-left: $card-padding-left;
		margin-top: 2px;
		text{
			color: red;
			span{
				font-size: 13px;
			}
		}
	}
	image{
		max-height: 200px;
		max-width: $card-min-width;
	}
}
</style>