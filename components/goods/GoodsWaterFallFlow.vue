<template>
	<view ref="goodsWrapper" class="goods-wrapper">
		<GoodCard v-for="key in goodsNum" :key="key" class="goods-item"></GoodCard>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted, onActivated, onDeactivated, watch } from 'vue';
	import GoodCard from "@/components/goods/GoodCard.vue"
	import useCommonStore from "@/stores/common"
	import { DiscoveryType } from '@/types/common'
	import { storeToRefs } from 'pinia';
	const store = useCommonStore()
	const { reachBottom,currentTab } = storeToRefs(store)
	
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

	onActivated(() => {
		console.log("被激活了", props.disCoveryType.title);
		
	})
	onDeactivated(() => {
		console.log("被卸载了", props.disCoveryType.title);
	})
	onMounted(() => {
		// console.log("挂载好了", props.disCoveryType.title);
	})
</script>

<style lang="scss" scoped>
	.goods-wrapper {
		display: grid;
		grid-template-columns: auto auto;
		grid-column-gap: 10px;
		max-width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0px 5px 0px 5px;

		.goods-item {
			// flex: 1;
			max-height: 300px;
			margin-bottom: 10px;
		}
	}
</style>