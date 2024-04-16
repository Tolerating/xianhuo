<template>
	<view class="good-card-wrapper" @tap="toGoodsDetail">
		<view class="good-card-content">
			<image src="../static/require.png" class="good-image" mode=""></image>
			<view style="padding: 5px;">
				<text class="goods-title">
					{{ info.detail.slice(0, 8) }}...
				</text>
                <uv-tags :text="categoryName" style="max-width: 85px;"></uv-tags>
				<text style="font-size: 14px;">{{ info.createTime }}</text>
				
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import type { RequireInfo } from '@/types/RequireInfo';
const props = defineProps<{ info: RequireInfo }>()
const productStore = useProductStore()
const categoryName = productStore.categoryNameById(props.info.categoryId) || ""

const toGoodsDetail = () => {
	uni.navigateTo({
		url: `/pages/goods/infoDetail?uId=${props.info.userId}&pId=${props.info.id}`
	})
}
</script>

<style lang="scss" scoped>
$card-min-width: 220px;
$card-padding-left: 5px;

.good-card-wrapper {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
	flex: 0 0 50%;
	
	.good-card-content {
		margin: 5px;
		// padding: 5px;
		background-color: white;
		border-radius: 15px;
		overflow: hidden;
	}

	.good-image {
		width: 100%;
	}

	.goods-title {
		padding-left: $card-padding-left;
		color: black;
		font-size: 14px;

		span {
			padding: 2px;
			background-color: #00aaff;
			font-size: 14px;
			color: white;
		}
	}

	.goods-price {
		padding-left: $card-padding-left;
		margin-top: 2px;

		text {
			color: red;	
		}
	}

	image {
		max-height: 200px;
		max-width: $card-min-width;
	}
}
</style>