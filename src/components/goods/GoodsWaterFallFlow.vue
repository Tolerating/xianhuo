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
import { produtsBySellMode } from '@/api/home/goods'
import useProductStore from '@/stores/product/index'
import useUserStore from '@/stores/users';
import { onShow } from '@dcloudio/uni-app';
const store = useCommonStore()
const productStore = useProductStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { sellModeList } = storeToRefs(productStore)
const { reachBottom, currentTab } = storeToRefs(store)
const productList = reactive<Product[]>([])
const goodsWrapper = ref<HTMLElement>()
const currentPage = ref<number>(1)
// 测试数据，模拟商品数据
const goodsNum = ref<number>(5)
const props = defineProps<{
	disCoveryType: DiscoveryType
}>()
watch(reachBottom, () => {
	if (props.disCoveryType.title == currentTab.value.title) {
		console.log("到底啦", props.disCoveryType.title);
		goodsNum.value += 5

	}
})
watch(() => currentTab.value.title, (newV) => {
	if (props.disCoveryType.title == currentTab.value.title) {
		if (productList.length == 0) {
			if (props.disCoveryType.type == 0) {
			} else if (props.disCoveryType.type == 1) {
				// console.log("类别", 1);

				let mode = sellModeList.value.filter(item => item.name == props.disCoveryType.title)[0]
				produtsBySellMode(mode.id, currentPage.value, 10, userInfo.value.location).then(res => {
					console.log(res);

					productList.length = 0
					productList.push(...res.data.records)
				})
			}
		}

	}

})
onMounted(() => {
	console.log(props.disCoveryType);



	console.log("挂载好了", props.disCoveryType.title);
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