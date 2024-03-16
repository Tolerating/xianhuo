<template>
	<view class="good-card-wrapper" @tap="toGoodsDetail">
		<view class="good-card-content">
			<image :src="APP_BASE_URL + product.images.split(',')[0]" class="good-image" mode=""></image>
			<view style="padding: 5px;">
				<text class="goods-title">
					{{ product.detail.slice(0, 6) }}...
				</text>
				<view style="display: flex;justify-content: space-between;">
					<uv-tags :text="sellModeMap[product.sellModeId]" type="success" style="max-width: 85px;"></uv-tags>
					<uv-tags :text="categoryName" style="max-width: 85px;"></uv-tags>

				</view>
				<text style="font-size: 14px;">{{ product.address }}</text>
				<ProductPrice :mode="product.sellModeId" :origin-price="String(product.originPrice)" :current-price="String(product.currentPrice)" :time-unit="product.timeUnit"></ProductPrice>
				<uv-text :customStyle="{marginTop:'5px',marginLeft:'5px'}" type="sueecss" :text="product.createTime"></uv-text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { APP_BASE_URL } from '@/config';
import type { Product } from '@/types/Product';
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import ProductPrice from '@/components/goods/ProductPrice.vue'
const props = defineProps<{ product: Product }>()
const productStore = useProductStore()
const {sellModeList} = storeToRefs(productStore)
const sellModeMap = reactive<string[]>([])
const categoryName = productStore.categoryNameById(props.product.categoryId) || ""

const toGoodsDetail = () => {
	uni.navigateTo({
		url: `/pages/goods/goodDetail?uId=${props.product.userId}&pId=${props.product.id}`
	})
}
onMounted(()=>{
	sellModeMap.length = 0
	sellModeList.value.forEach(item=>{
		sellModeMap[item.id] = item.name
	})
})
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