<!-- 商品检索页 -->
<template>
  <water-full-layout class="goods-filter-container">
    <view ref="goodsWrapper" class="goods-wrapper">
      <GoodCard v-for="key in goodsNum" :key="key" class="goods-item"></GoodCard>
    </view>
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="fileter-popup">
        <uni-section type="line" class="sell-item" title="区域选择">
          <uni-data-checkbox style="padding-left: 10px;" :localdata="[{ id: 1, name: '全部' }, { id: 2, name: '选择区域' }]"
            :map="{ text: 'name', value: 'id' }" v-model="areaSelectedId" mode="button" />
            <navigator v-show="areaSelectedId == 2" url="/pages/home/release/locationSelect" open-type="navigate"
              hover-class="navigator-hover">
              <uni-icons type="location-filled" :size="23" color="gray" />
              <text style="color: rgb(15, 105, 241);">{{ filterArea?.name?filterArea.name:'点击选择' }}</text>
            </navigator>
        </uni-section>
        <uni-section type="line" class="sell-item" title="售卖模式">
          <uni-data-checkbox style="padding-left: 10px;" :localdata="sellModeExtend" :map="{ text: 'name', value: 'id' }"
            v-model="filterPrams.sell" mode="button" />
        </uni-section>
        <uni-section type="line" class="sell-item" title="分类选择">
          <view class="goods-category-container">
            <view :class="{ 'category-selected': item.id == filterPrams.category }" class="category-item "
              v-for=" item  in  categoryList " @tap="filterPrams.category = item.id" :key="item.id">
              {{ item.name }}
            </view>
          </view>
        </uni-section>

        <view class="filter-footer">
          <button type="default" @tap="closeFilterPopup">
            取消
          </button>
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
import GoodCard from "@/components/goods/GoodCard.vue";
import { getCurrentInstance, ref } from "vue";
import { onReachBottom, onNavigationBarButtonTap, onNavigationBarSearchInputClicked, onHide, onLoad, onShow } from "@dcloudio/uni-app";
import { reactive } from "vue";
import useProductStore from '@/stores/product';
import type { AMAPLocation, ProductFilterPrams } from "@/types/common";
import { storeToRefs } from "pinia";
import { toRaw,onBeforeMount } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";
import type { SellMode } from "@/types/SellMode";
import { toRef } from "vue";
const productStore = useProductStore()
// 解构商品类别列表
const { categoryList, sellModeList } = storeToRefs(productStore)
const sellModeExtend = reactive<SellMode[]>([{id:0,name:"全部"},...toRaw(sellModeList.value)])
const filterArea = reactive<AMAPLocation>({} as AMAPLocation)
onShow(()=>{
  uni.$once("school-location",(data:AMAPLocation)=>{
    data.name = data.name.replace(/\\/g,"")
    Object.assign(filterArea,data)
  })
})
// 筛选弹出层的引用
const popup = ref()

// 存放筛选参数
const filterPrams = reactive<ProductFilterPrams>({
  key:"",
  category:0,
  sell:0
})
const areaSelectedId = ref<number>(1)
const goodsNum = ref<number>(8)
//获取页面实例
const ins = getCurrentInstance()
//@ts-ignore
let webView = ins.ctx.$scope.$getAppWebview();

// 打开筛选弹出层
const viewPopup = () => {
  popup.value.open()
}
onReachBottom(() => {
  console.log("到底了")
  goodsNum.value += 5
})
onNavigationBarButtonTap((e: any) => {
  if (e.text == "筛选") {
    popup.value.open()
  }
})
onNavigationBarSearchInputClicked(() => {
  uni.hideKeyboard()
  uni.navigateTo({
    url: "/pages/goods/search",
    animationDuration: 0
  })
})
onLoad((option: any) => {
  console.log("onload");
  
  // 接收页面传值
  const { key, category, sell } = option

  filterPrams.key = key
  filterPrams.category = Number(category)
  filterPrams.sell = Number(sell)

  webView.setTitleNViewSearchInputText(key)
})

// 点击取消按钮关闭弹出层
const closeFilterPopup = () => {
  popup.value.close()
  console.log(filterPrams);
  
}

// 点击完成获取符合筛选结果的商品
const getFilterProducts = () => {

}
onBeforeMount(()=>{
  console.log("挂载之前");
  
})
onMounted(()=>{
  console.log("挂载之后");
  
})
</script>

<style lang="scss" scoped>
.goods-filter-container {
  // background-color: red;
}



.goods-wrapper {
  display: flex;
  flex-wrap: wrap;


  .goods-item {
    flex: 0 0 50%;
    max-height: 300px;
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