<!-- 商品检索页 -->
<template>
	<view class="goods-filter-container">
		<view class="goods-realease-mode-tab">
			<view class="mode-tab-item">
				全部
			</view>
			<view class="mode-tab-item">
				校园
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.goods-filter-container{
	background-color: red;
}
.goods-realease-mode-tab{
	display: flex;
	justify-content:center;
	align-items: center;
	height: 50px;
	background-color: green;
	.mode-tab-item{
		flex: 1;
		text-align:center;
	}
	
}
</style>