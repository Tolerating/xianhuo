<!-- 商品检索页 -->
<template>
  <water-full-layout class="goods-filter-container">
    <template #topFilter class="top-filter">
      <view class="goods-mode-tab">
        <text class="mode-tab-item">
          全部
        </text>
        <text class="mode-tab-item">
          校园
        </text>
      </view>
      <view class="goods-filter-one">
        <text>
          离我最近
        </text>
        <text>
          价格
        </text>
        <text>
          最新发布
        </text>
        <text>
          区域
        </text>
      </view>
    </template>
    <view ref="goodsWrapper" class="goods-wrapper">
      <GoodCard v-for="key in goodsNum" :key="key" class="goods-item"></GoodCard>
    </view>
  </water-full-layout>
</template>

<script lang="ts" setup>
import WaterFullLayout from "@/components/WaterFullLayout.vue";
import GoodCard from "@/components/goods/GoodCard.vue";
import {ref} from "vue";
import {onReachBottom} from "@dcloudio/uni-app";
const goodsNum = ref<number>(8)

onReachBottom(()=>{
  console.log("到底了")
  goodsNum.value +=5
})
</script>

<style lang="scss" scoped>
.goods-filter-container{
	background-color: red;
}
.top-filter{
  position: absolute;
  top: 44px;
}
.goods-mode-tab{
	display: flex;
	justify-content:center;
	align-items: center;
	height: 40px;
	background-color: green;

	.mode-tab-item{
		flex: 1;
		text-align:center;
	}
	
}
.goods-filter-one{
  display: flex;
  justify-content:space-around;
  align-items: center;
  height: 30px;
}
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