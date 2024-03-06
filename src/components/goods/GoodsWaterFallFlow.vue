<template>
	<view ref="goodsWrapper">
		<view class="goods-wrapper">
			<!-- <scroll-view scroll-y="true"> -->
			<GoodCard v-for="item in productList" :key="item.detail" :product="item" class="goods-item"></GoodCard>
			<!-- </scroll-view> -->
		</view>
		<uv-empty v-if="productList.length == 0" mode="list"
			style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
		<uv-load-more v-if="showMore && productList.length != 0" loadmoreText="没有更多了" color="#606266" marginBottom="30"
			lineColor="#1CD29B" line />
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, watch } from 'vue';
	import GoodCard from "@/components/goods/GoodCard.vue"
	import useCommonStore from "@/stores/common"
	import type { DiscoveryType } from '@/types/common'
	import { storeToRefs } from 'pinia';
	import { reactive } from 'vue';
	import type { Product } from '@/types/Product';
	import { produtsBySellMode, productByLatest, productByCategory } from '@/api/home/goods'
	import useProductStore from '@/stores/product/index'
	import useUserStore from '@/stores/users';
	import { nextTick } from 'vue';
	const store = useCommonStore()
	const productStore = useProductStore()
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const { sellModeList, categoryList } = storeToRefs(productStore)
	const { reachBottom, currentTab, homeRefesh } = storeToRefs(store)
	const productList = reactive<Product[]>([])
	const goodsWrapper = ref<HTMLElement>()
	// 当前分页
	const currentPage = ref<number>(1)
	// 是否显示更多
	const showMore = ref<boolean>(false)
	const props = defineProps<{
		disCoveryType : DiscoveryType
	}>()
	watch(reachBottom, () => {
		if (props.disCoveryType.title == currentTab.value.title) {
			// console.log("到底啦", props.disCoveryType.title);
			if (!showMore.value) {
				typeRequest(true)
			}

		}
	})
	watch(homeRefesh, () => {
		if (props.disCoveryType.title == currentTab.value.title) {
			currentPage.value = 1
			productList.length = 0
			typeRequest(false)
		}
	})
	watch(() => currentTab.value.title, (newV) => {
		if (props.disCoveryType.title == currentTab.value.title) {
			if (productList.length == 0) {
				typeRequest(false)
			}
		}
	})

	const typeRequest = (next : boolean) => {
		if (next) {
			currentPage.value++
		}
		if (props.disCoveryType.type == 0) {
			// 最新发布
			pageLatest()
		} else if (props.disCoveryType.type == 1) {
			// 售卖模式
			pageSellMode()

		} else {
			//商品类别
			pageCategory()
		}
	}
	// 根据分类分页获取数据
	const pageCategory = () => {
		let category = categoryList.value.filter(item => item.name == props.disCoveryType.title)[0]
		productByCategory(category.id, currentPage.value, 10, userInfo.value.location).then(res => {
			if (res.data.records.length == 0) {
				showMore.value = true
			}
			productList.push(...res.data.records)
		})
	}

	// 分页获取最新的商品
	const pageLatest = () => {
		productByLatest(currentPage.value, 10, userInfo.value.location).then(res => {
			if (res.data.records.length == 0) {
				showMore.value = true
			}
			productList.push(...res.data.records)
		})
	}

	// 根据售卖模式分页获取数据
	const pageSellMode = () => {
		let mode = sellModeList.value.filter(item => item.name == props.disCoveryType.title)[0]
		produtsBySellMode(mode.id, currentPage.value, 10, userInfo.value.location).then(res => {
			console.log(res);
			// productList.length = 0
			if (res.data.records.length == 0) {
				showMore.value = true
			}
			productList.push(...res.data.records)
		})
	}

	onMounted(() => {
		console.log(props.disCoveryType, currentTab.value.id);
		if (currentTab.value.id == props.disCoveryType.id) {
			nextTick(() => {
				productList.length = 0
				typeRequest(false)
			})
		}
	})
</script>

<style lang="scss" scoped>
	.goods-wrapper {
		display: flex;
		flex-wrap: wrap;
		max-width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0px 5px 0px 5px;

		.goods-item {

			flex: 0 0 50%;
			// margin: 20px;
			// max-height: 300px;
			margin-bottom: 10px;
		}
	}
</style>