<script lang="ts" setup>
	import useProductStore from '@/stores/product/index'
	import { storeToRefs } from 'pinia';
	import { APP_BASE_URL } from '@/config/index'
	import ProductPrice from '@/components/goods/ProductPrice.vue'
	import { onMounted } from 'vue';
	import { reactive } from 'vue';
	import { receiveProductList, productRefund } from '@/api/home/goods'
	import { onLoad } from '@dcloudio/uni-app';
	import { receivedProduct } from '@/api/home/goods'
	import type { OrderInfo } from '@/types/OrderInfo';
	const productStore = useProductStore()
	const { sellModeList } = storeToRefs(productStore)
	const favouriteList = reactive<OrderInfo[]>([])
	const sellModeMap = reactive<string[]>([])
	sellModeList.value.forEach(item => {
		sellModeMap[item.id] = item.name
	})
	const navigateToDetail = (product : OrderInfo) => {
		uni.navigateTo({
			url: `/pages/goods/goodDetail?uId=${product.sellId}&pId=${product.productId}`
		})
	}
	const returnP = (item : OrderInfo, index : number) => {
		uni.showModal({
			title: '提示',
			content: '确定退款？',
			success: function (res) {
				if (res.confirm) {
					productRefund(item.id as string).then(res => {
						uni.showToast({
							title: res.message
						})
						favouriteList.splice(index, 1)
					})
				}
			}
		});
	}
	const cancelStar = (product : OrderInfo, index : number) => {

		uni.showModal({
			title: '提示',
			content: '确定收货？',
			success: function (res) {
				if (res.confirm) {
					receivedProduct(product.id as string).then(res => {
						if (res.data == 1) {

							favouriteList.splice(index, 1)
						} else {
							uni.showToast({
								title: res.message
							})
						}

					})
				}
			}
		});
	}
	onMounted(async () => {
		let result = await receiveProductList()
		favouriteList.length = 0
		favouriteList.push(...result.data)
	})
	onLoad(() => {
		uni.setNavigationBarTitle({
			title: "待收货"
		})
	})
</script>

<template>
	<view class="favourite-list-container">
		<uni-notice-bar text="温馨提示: 为保护用户的利益,请在拿到商品后再点击确认收货, 若下单后不想要了或商家迟迟不发货,用户可点击退款,平台会将退款原路退回" />
		<uv-empty v-if="favouriteList.length == 0" mode="list"
			style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
		<view class="favourite-list">
			<view class="list-item" v-for="(item, index) in favouriteList" :key="item.buyId">
				<view class="item-info" style="position: relative;">
					<view class="item-info-left">
						<view style="padding-bottom: 100%;position: relative;">
							<image :src="APP_BASE_URL + item.productImages.split(',')[0]" mode="scaleToFill" />
						</view>
					</view>
					<view class="item-info-right" style="margin-top: 15px;" @tap="navigateToDetail(item)">
						<view style="display: flex;justify-content: space-between;">
							<view style="display: flex;">
								<uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
								<text style="font-weight: bold;">{{ item.productDetail.slice(0, 6) }}...</text>
							</view>

						</view>
						<view class="item-right-wrapper">
							<uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
							<text>{{ item.productAddress }}</text>
						</view>
						<view class="item-right-wrapper">
							<uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
							<text>创建时间：{{ item.createTime }}</text>
						</view>
						<view class="item-right-wrapper">
							<uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
							<text>支付时间：{{ item.payTime }}</text>
						</view>
						<ProductPrice style="display: flex;justify-content: flex-end;" :mode="1" originPrice="0"
							:currentPrice="item.total as string" timeUnit="周" />
					</view>
				</view>
				<uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
				<view class="item-operation">
					<uv-button type="success" size="small" @tap="cancelStar(item, index)" text="确认收货"></uv-button>
					<uv-button type="error" :plain="true" size="small" shape="circle" :iconSize="18" icon="trash"
						@tap="returnP(item,index)" text="退款"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.favourite-list-container {
		background-color: #ece1e1;
		box-sizing: border-box;
		padding-bottom: 15px;
		min-height: 100vh;

		.favourite-list {
			display: flex;
			flex-direction: column;
			padding: 0 5px;


			.list-item {
				$item-height: 150px;
				display: flex;
				flex-direction: column;
				background-color: white;
				border-radius: $xh-border-radius-base;
				height: 200px;
				margin-top: 15px;
				overflow: hidden;

				.item-info {
					display: flex;

					.item-info-left {
						flex: 0 0 $item-height;

						image {
							position: absolute;
							width: 100%;
							height: 100%;
						}
					}

					.item-info-right {
						display: flex;
						flex-direction: column;

						.item-right-wrapper {
							display: flex;
							align-items: center;

							text {
								font-size: 11px;
							}
						}
					}
				}

				.item-operation {
					flex: 0 1 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}
			}
		}
	}
</style>