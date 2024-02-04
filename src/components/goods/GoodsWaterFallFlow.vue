<template>
	<view ref="goodsWrapper" class="goods-wrapper">
		<GoodCard v-for="item in productList" :key="item.detail" :product="item" class="goods-item"></GoodCard>
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
	const store = useCommonStore()
	const { reachBottom,currentTab} = storeToRefs(store)
	const productList = reactive<Product[]>([])
	const goodsWrapper = ref<HTMLElement>()
	// 测试数据，模拟商品数据
	const goodsNum = ref<number>(5)
	const props = defineProps<{
		disCoveryType : DiscoveryType
	}>()
	watch(reachBottom, () => {
		if(props.disCoveryType.title == currentTab.value.title){
			console.log("到底啦", props.disCoveryType.title);
			goodsNum.value += 5 
			
		}
	})
	onMounted(() => {
		// console.log("挂载好了", props.disCoveryType.title);
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
			max-height: 300px;
			margin-bottom: 10px;
		}
	}
</style>