<!-- 商品检索页 -->
<template>
	<water-full-layout class="goods-filter-container">
		<uv-empty v-show="infoList.length == 0" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
		<view ref="goodsWrapper" class="goods-wrapper">
			<RequireInfoCard v-for="item in infoList" :key="item.detail" :info="item" class="goods-item"></RequireInfoCard>
		</view>
		<uv-load-more v-if="showMore" loadmoreText="没有更多了" color="#606266" marginBottom="30" lineColor="#1CD29B" line />
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="fileter-popup">
				<uni-section type="line" class="sell-item" title="分类选择">
					<view class="goods-category-container">
						<view :class="{ 'category-selected': item.id == categorySelected }" class="category-item "
							v-for=" item  in  categoryListExtend " @tap="categorySelected = item.id" :key="item.id">
							{{ item.name }}
						</view>
					</view>
				</uni-section>
				<view class="filter-footer">
					<!-- @vue-ignore -->
					<button type="default" @tap="closeFilterPopup">
						取消
					</button>
					<!-- @vue-ignore -->
					<button type="primary" @tap="getFilterProducts">
						完成
					</button>
				</view>
			</view>
		</uni-popup>
	</water-full-layout>
</template>
  
<script lang="ts" setup>
import WaterFullLayout from "@/components/WaterFullLayout.vue";
import RequireInfoCard from "@/components/RequireInfoCard.vue";
import { getCurrentInstance, ref } from "vue";
import { onReachBottom, onNavigationBarButtonTap, onLoad } from "@dcloudio/uni-app";
import { pageRequireInfo } from '@/api/home/require'
import { reactive } from "vue";
import useProductStore from '@/stores/product';
import { storeToRefs } from "pinia";
import { toRaw } from "vue";
import { onMounted } from "vue";
import type { Category } from "@/types/Category";
import type { RequireInfo } from "@/types/RequireInfo";
const productStore = useProductStore()
// 解构商品类别列表
const { categoryList } = storeToRefs(productStore)
const categoryListExtend = reactive<Category[]>([{ id: 0, name: "全部分类" }, ...toRaw(categoryList.value)])
const categorySelected = ref<number>(0)
const infoList = reactive<RequireInfo[]>([])
// 控制没有更多数据组价的显示
const showMore = ref<boolean>(false)
// 筛选弹出层的引用
const popup = ref()
// 当前所在分页
const currentPage = ref<number>(1)
onLoad(()=>{
	uni.setNavigationBarTitle({
		title:"校园求购"
	})
})
onReachBottom(() => {
	console.log("到底了")
	if (!showMore.value) {
		currentPage.value++
		pageRequireInfo(categorySelected.value, currentPage.value, 10).then(res => {
			if (res.data.records.length == 0) {
				showMore.value = true
			} else {
				infoList.push(...res.data.records)
			}
		})

	}
})
// #ifdef APP-PLUS
onNavigationBarButtonTap((e: any) => {
	if (e.text == "筛选") {
		popup.value.open()
	}
})
// #endif

// 点击取消按钮关闭弹出层
const closeFilterPopup = () => {
	popup.value.close()

}

// 点击完成获取符合筛选结果的商品
const getFilterProducts = () => {
	showMore.value = false
	currentPage.value = 1
	popup.value.close()
	pageRequireInfo(categorySelected.value, currentPage.value, 10).then(res => {
		infoList.length = 0
		infoList.push(...res.data.records)
	})
}
onMounted(() => {
	console.log("挂载之后");
	pageRequireInfo(categorySelected.value, currentPage.value, 10).then(res => {
		infoList.length = 0
		infoList.push(...res.data.records)
	})
})
</script>
  
<style lang="scss" scoped>
.goods-filter-container {
	background-color: #dee5e3;
	min-height: 100vh;
}



.goods-wrapper {
	display: flex;
	flex-wrap: wrap;


	.goods-item {
		flex: 0 0 50%;
		// max-height: 300px;
		margin-bottom: 10px;

	}
}

.fileter-popup {
	padding: 10px $xianhuo-padding-LR 30px;

	.filter-footer {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
}

.goods-category-container {
	background-color: white;
	display: flex;
	flex-wrap: wrap;
	row-gap: 10px;
	padding: 5px 10px 0 10px;
	column-gap: 5px;

	.category-item {
		background-color: rgba($color: $xh-color-info, $alpha: .4);
		border-radius: 15px;
		padding: 5px;
		text-align: center;
		flex: 0 0 calc(85%/3)
	}

	.category-item.category-selected {
		background-color: rgba($color: $xh-color-primary, $alpha: .6);
		color: $xh-text-color-highlight;
	}
}
</style>